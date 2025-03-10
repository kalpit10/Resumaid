const express = require("express");
// const csv = require("csv-parser");
const User = require("../models/usermodel");
const jwt = require("jsonwebtoken"); 
const logger = require("../logger");
// const College = require("../models/colleges");
// const fs = require("fs");
const router = express.Router();


// 🔴 Weak Secret Key (Hardcoded instead of using .env)
const SECRET_KEY = "12345";


router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // NoSQL Injection Risk - No input sanitization
    const user = await User.findOne({ username });

    // No Brute-Force Protection
    if (!user) {
      return res.status(400).json("Login failed: User does not exist");
    }

    // A02: Password stored in plaintext (No Hashing)
    if (user.password === password) { // Insecure password check
      logger.info(`User logged in successfully`, { username });

      // Generate JWT without Expiry (Session Hijacking)
      const token = jwt.sign({ userId: user._id, username: user.username, role: "user" }, SECRET_KEY);

      // Expose Token and Full User Data
      res.json({ message: "Login successful", token, user });
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
