const express = require("express");
require("dotenv").config();
// const csv = require("csv-parser");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken");
const logger = require("../logger");
const authenticationMiddleware = require("../middlewares/authMiddleware");
const bcrypt = require("bcryptjs");
const rateLimit = require("express-rate-limit");

// const College = require("../models/colleges");
// const fs = require("fs");

const router = express.Router();

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  console.error("FATAL ERROR: SECRET_KEY is not defined!");
  process.exit(1); // Stop the server if the secret key is missing here.
}

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // Lockout of 15 minutes per IP
  max: 5, // Max 3 login attempts per IP
  message: "Too many login attempts from this IP. Try again later.",
  standardHeaders: true, // Sends `RateLimit-*` headers in response
  legacyHeaders: false, // Disable deprecated headers
  handler: (req, res) => {
    logger.warn("Rate limit exceeded for login", { ip: req.ip });
    res
      .status(429)
      .json({ message: "Too many login attempts. Try again later." });
  },
});

router.post("/login", loginLimiter, async (req, res) => {
  try {
    const { username, password } = req.body;

    // Sanitizing username field
    const user = await User.findOne()
      .setOptions({ sanitizeFilter: true })
      .where("username")
      .equals(username);

    if (!user) {
      return res.status(400).json("Login failed: User does not exist");
    }

    // Check if the account is locked FIRST
    if (user.lockoutUntil && user.lockoutUntil > new Date()) {
      const timeLeft = Math.ceil((user.lockoutUntil - new Date()) / 60000);
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
        user.lockoutUntil = new Date(Date.now() + 2 * 60 * 1000); // Lock for 2 min
        await user.save();

        logger.warn("Account locked due to multiple failed logins", {
          username: user.username,
          ip: req.ip,
        });

        return res.status(403).json({
          message: `Too many failed attempts. Account locked for 2 minutes.`,
        });
      }

      await user.save();
      logger.warn(`Failed login attempt: Invalid credentials`, { username });
      return res.status(400).json("Login failed: Invalid Credentials");
    }

    // Reset failed attempts on successful login
    user.failedLoginAttempts = 0;
    user.lockoutUntil = null;
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username, role: "user" },
      process.env.SECRET_KEY,
      { expiresIn: "30m" }
    );

    res.cookie("token", token, {
      httpOnly: true, // Protects against XSS
      secure: process.env.NODE_ENV === "production", // Secure in production
      sameSite: "Strict", // Prevents CSRF
      maxAge: 30 * 60 * 1000, // 30 minutes expiration
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
      { regex: /.{8,}/, message: "a minimum length of 8 characters" },
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
    const saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS) || 10;
    const salt = await bcrypt.genSalt(saltRounds);
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
    const user = await User.findOneAndUpdate(
      { _id: req.user.userId }, // Now updates only the authenticated user's profile
      req.body,
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

module.exports = router;
