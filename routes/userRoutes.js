const express = require("express");
require("dotenv").config();
// const csv = require("csv-parser");
const User = require("../models/usermodel");
const speakeasy = require("speakeasy");
const QRCode = require("qrcode");
const jwt = require("jsonwebtoken");
const logger = require("../logger");
const authenticationMiddleware = require("../middlewares/authMiddleware");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");
const { encrypt, decrypt } = require("../utils/encryption");

// const College = require("../models/colleges");
// const fs = require("fs");

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  console.error("FATAL ERROR: SECRET_KEY is not defined!");
  process.exit(1); // Stop the server if the secret key is missing here.
}

// Setting dynamic salt rounds for bcrypt hashing
const SALT_ROUNDS = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12;

// Randomized Delay to prevent bots like Hydra
const randomizedDelay = async () => {
  const min = 500;
  const max = 3000;
  const delayTime = Math.floor(Math.random() * (max - min + 1) + min);
  return new Promise((resolve) => setTimeout(resolve, delayTime));
};

// Exponential Lockout Mechanism
const BASE_LOCKOUT_TIME = 2 * 60 * 1000;
const LOCKOUT_MULTIPLIER = 2;

const loginLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // Lockout of 2 minutes per IP
  max: 5, // Max 5 login attempts per IP
  message: "Too many login attempts from this IP. Try again later.",
  standardHeaders: true, // Sends `RateLimit-*` headers in response
  legacyHeaders: false, // Disable deprecated headers
  keyGenerator: (req) => `${req.ip}_${req.body.username}`, // Limits per username instead of IP
  handler: (req, res) => {
    logger.warn("Rate limit exceeded for login", {
      username: req.body.username,
      ip: req.ip,
    });

    res.status(429).json({
      error: "rate_limit",
      message: "Limit exceeded. Try again later.",
      retryAfter:
        Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000) || 120, // Adjust to 120 seconds
    });
  },
});

// Enable MFA for a user (generates secret and QR code)
router.post("/enable-mfa", async (req, res) => {
  try {
    const { username } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Generate MFA secret
    const secret = speakeasy.generateSecret({
      name: `Resumaid (${username})`, // App name for Google Authenticator
    });

    // Store secret in DB
    user.mfaSecret = encrypt(secret.base32); // Encrypt the secret before storing
    user.mfaEnabled = true;
    await user.save();

    // Generate QR code from otpauth URL
    QRCode.toDataURL(secret.otpauth_url, (err, qrCodeDataURL) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Failed to generate QR code" });
      }

      res.json({
        qrCode: qrCodeDataURL, // Image to display in frontend
      });
    });
  } catch (error) {
    console.error("MFA Setup Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/verify-mfa", async (req, res) => {
  try {
    const { username, token } = req.body;

    const user = await User.findOne({ username });
    if (!user || !user.mfaSecret) {
      return res.status(404).json({ message: "User or MFA not found" });
    }

    const decryptedSecret = decrypt(user.mfaSecret); //decrypt the secret before verifying
    const isVerified = speakeasy.totp.verify({
      secret: decryptedSecret,
      encoding: "base32",
      token,
      window: 1, // 30 sec window on either side
    });

    if (!isVerified) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    return res.json({ message: "MFA verified successfully" });
  } catch (error) {
    console.error("MFA verification error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password, otp } = req.body;

    // Sanitizing username field
    const user = await User.findOne()
      .setOptions({ sanitizeFilter: true })
      .where("username")
      .equals(username);

    if (!user) {
      logger.warn(`Login failed. Invalid credentials - ${username}`, {
        ip: req.ip,
      });
      await randomizedDelay();
      return res.status(400).json("Login failed. Invalid Credentials");
    }

    // Check if the account is locked due to failed attempts
    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      const timeLeft = Math.ceil((user.lockoutUntil - new Date()) / 60000);
      logger.warn(`Blocked login attempt for locked user: ${username}`, {
        ip: req.ip,
      });
      return res.status(403).json({
        message: `Too many failed attempts. Try again in ${timeLeft} minutes.`,
      });
    }

    // Compare entered password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.failedLoginAttempts += 1;

      // Lock out user after 3 failed attempts
      if (user.failedLoginAttempts >= 3) {
        const lockoutTime =
          BASE_LOCKOUT_TIME *
          Math.pow(LOCKOUT_MULTIPLIER, user.failedLoginAttempts - 3); // Exponential Lockout time increase after certain attempts
        user.lockoutUntil = new Date(Date.now() + lockoutTime);
        await user.save();
        logger.warn(
          `Account locked after ${user.failedLoginAttempts} failed attempts`,
          { username, ip: req.ip }
        );
        return res
          .status(403)
          .json("Invalid credentials or account temporarily locked.");
      }

      await user.save();
      logger.warn(`Failed login attempt for ${username}`, { ip: req.ip });
      // Introduce delay
      await randomizedDelay();
      return res.status(400).json("Login failed. Invalid Credentials");
    }

    // If MFA is enabled, require OTP
    if (user.mfaEnabled) {
      if (!otp) {
        return res.status(400).json({ message: "OTP is required for MFA" });
      }
      const decryptedSecret = decrypt(user.mfaSecret); //decrypt the secret before verifying

      const isValidOTP = speakeasy.totp.verify({
        secret: decryptedSecret,
        encoding: "base32",
        token: otp,
        window: 1, // Allows +/- 30 sec time drift
      });

      if (!isValidOTP) {
        return res.status(400).json({ message: "Invalid OTP" });
      }
    }

    // Reset failed attempts on successful login
    user.failedLoginAttempts = 0;
    user.lockoutUntil = null;
    await user.save();

    // Upgrade old password hashes if weaker than current settings
    if (bcrypt.getRounds(user.password) < SALT_ROUNDS) {
      logger.info(`Rehashing password for user: ${username}`);
      user.password = await bcrypt.hash(password, SALT_ROUNDS);
      await user.save();
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: "user" },
      process.env.SECRET_KEY, //Mixing it with JWT Token to fail signature on websites like jwt.io
      { expiresIn: "30m" }
    );

    res.cookie("token", token, {
      httpOnly: true, // Protects against XSS
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict", // Prevents CSRF
      maxAge: 120 * 60 * 1000, // 2 hours expiration
    });

    logger.info(`User logged in successfully`, { username });
    return res.json({ message: "Login successful", username: user.username });
  } catch (error) {
    logger.error(`Login API Error`, { error });
    return res.status(500).json("An error occurred");
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Secure Username Validation (Prevents NoSQL Injection)
    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({
        message:
          "Username must be 4-20 characters and contain only letters, numbers, or underscores.",
      });
    }

    // Prevent NoSQL Injection by Sanitizing Input
    const existingUser = await User.findOne()
      .setOptions({ sanitizeFilter: true })
      .where("username")
      .equals(username);

    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Dynamic Password Validation
    const passwordRules = [
      { regex: /(?=.*[A-Z])/, message: "at least one uppercase letter" },
      { regex: /(?=.*\d)/, message: "at least one number" },
      {
        regex: /(?=.*[!@#$%^&*()_\-+=<>?])/,
        message: "at least one special character",
      },
      { regex: /.{16,}/, message: "a minimum length of 16 characters" },
    ];

    const failedRules = passwordRules
      .filter((rule) => !rule.regex.test(password))
      .map((rule) => rule.message);

    if (failedRules.length) {
      return res.status(400).json({
        message: `Password must contain: ${failedRules.join(", ")}.`,
      });
    }

    // Secure Password Hashing with Salt Rounds from .env
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save User with Hashed Password
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
// What is the role of authMiddleware here?
// Ensures only logged-in users can access /update
// Uses req.user.userId from JWT instead of trusting frontend input
// Rejects expired or invalid tokens
// Users cannot update another user’s profile
router.post("/update", authenticationMiddleware, async (req, res) => {
  try {
    const body = { ...req.body };

    // Encrypt sensitive fields only if they exist
    if (body.email) body.email = encrypt(body.email);
    if (body.mobileNumber) body.mobileNumber = encrypt(body.mobileNumber);
    if (body.address) body.address = encrypt(body.address);
    // if(body.mfaSecret) body.mfaSecret = encrypt(body.mfaSecret);

    const user = await User.findOneAndUpdate(
      { _id: req.user.userId }, // Now updates only the authenticated user's profile
      body,
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.get("/profile", authenticationMiddleware, async (req, res) => {
  try {
    // we use lean function to get a plain javascript object(POJOs) instead of mongoose document
    // this is useful for performance reasons and to avoid Mongoose's overhead
    const user = await User.findById(req.user.userId).lean();

    if (!user) return res.status(404).json({ message: "User not found" });

    const decryptedUser = {
      ...user,
      email:
        typeof user.email === "string" && user.email.includes(":")
          ? decrypt(user.email)
          : user.email || "",

      mobileNumber:
        typeof user.mobileNumber === "string" && user.mobileNumber.includes(":")
          ? decrypt(user.mobileNumber)
          : user.mobileNumber || "",

      address:
        typeof user.address === "string" && user.address.includes(":")
          ? decrypt(user.address)
          : user.address || "",
    };

    res.json(decryptedUser);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
