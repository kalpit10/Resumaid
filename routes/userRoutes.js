const express = require("express");
// const csv = require("csv-parser");
const User = require("../models/usermodel");
const logger = require("../logger");
// const College = require("../models/colleges");
// const fs = require("fs");
const router = express.Router();



router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // A03: NoSQL Injection - No sanitization of input
    const user = await User.findOne({ username });

    // A07: No Brute-Force Protection - No rate limiting or account lockout
    if (!user) {
      return res.status(400).json("Login failed: User does not exist");
    }

    // A02: Cryptographic Failures - Password stored in plaintext
    if (user.password === password) { // ❌ Plaintext comparison (no hashing)
      logger.info(`User logged in successfully`, { username });

      res.send(user); // Exposes full user data (potential PII leak)
    } else {
      logger.warn(`Failed login attempt: Incorrect password`, { username });

      res.status(400).json("Login failed: Incorrect password");
    }
  } catch (error) {
    logger.error(`Login API Error`, { error });
    res.status(500).json("An error occurred");
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

// Update user profile
router.post("/update", async (req, res) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body._id },
      req.body,
      { new: true } // Ensures the updated document is returned
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.send(user); // Send the updated user data back to the frontend
  } catch (error) {
    res.status(400).json(error);
  }
});

module.exports = router;
