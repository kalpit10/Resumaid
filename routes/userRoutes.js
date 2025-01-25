const express = require("express");
const csv = require("csv-parser");
const User = require("../models/usermodel");
const College = require("../models/colleges");
const fs = require("fs");
const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json("Login failed: User does not exist");
    }

    // Match username and password (intentional plaintext comparison for now)
    if (user.password === password) {
      res.send(user); // Login successful
      console.log("Login successful:", user);
    } else {
      res.status(400).json("Login failed: Incorrect password");
    }
  } catch (error) {
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
