const express = require("express");
// const csv = require("csv-parser");
const User = require("../models/usermodel");
const logger = require("../logger");
// const College = require("../models/colleges");
// const fs = require("fs");
const router = express.Router();

const failedLoginAttempts = {}; // Track failed login attempts
const MAX_FAILED_ATTEMPTS = 5; // Set a threshold for brute-force detection
const LOCK_TIME = 2 * 60 * 1000; // 2 minutes lockout period

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const ip = req.ip;
    const key = `${username}-${ip}`;

    const now = Date.now();

    // Initialize failed login tracking for user-IP if not present
    if (!failedLoginAttempts[key]) {
      failedLoginAttempts[key] = { count: 0, lastAttempt: Date.now() };
    }

    // Check if the user is currently locked out
    if (
      failedLoginAttempts[key].count >= MAX_FAILED_ATTEMPTS &&
      now - failedLoginAttempts[key].lastAttempt < LOCK_TIME
    ) {
      logger.error(`ACCOUNT LOCKED: Too many failed login attempts`, {
        username,
        ip,
      });
      return res.status(429).json("Too many failed attempts. Try again later.");
    }

    // Check if user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      failedLoginAttempts[key].count += 1;
      failedLoginAttempts[key].lastAttempt = now;
      logger.warn(`Failed login attempt: User not found`, { username, ip });

      return res.status(400).json("Login failed: User does not exist");
    }

    // Match username and password (intentional plaintext comparison for now)
    if (user.password === password) {
      logger.info(`User logged in successfully`, { username, ip });
      // Reset failed attempts after successful login
      failedLoginAttempts[key] = { count: 0, lastAttempt: Date.now() };

      // Reset failed attempts after successful login
      delete failedLoginAttempts[key];

      res.send(user); // Login successful
      console.log("Login successful:", user);
    } else {
      failedLoginAttempts[key].count += 1;
      failedLoginAttempts[key].lastAttempt = now;

      logger.warn(`Failed login attempt: Incorrect password`, {
        username,
        ip,
        attempt: failedLoginAttempts[key].count,
      });

      // Alert if too many failed login attempts
      if (failedLoginAttempts[key].count >= MAX_FAILED_ATTEMPTS) {
        logger.error(`ALERT: Possible brute-force attack detected`, {
          username,
          ip,
          attempts: failedLoginAttempts[key].count,
        });
      }
      res.status(400).json("Login failed: Incorrect password");
    }
  } catch (error) {
    logger.error(`Login API Error`, { error });
    res.status(500).json("An error occurred");
    console.error(error);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character",
      });
    }

    // Create and save the new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/update", async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.body._id }, req.body);
    const user = await User.findOne({ _id: req.body._id });
    res.send(user);
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
