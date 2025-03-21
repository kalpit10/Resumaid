const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    mfaEnabled: { type: Boolean, default: false },
    mfaSecret: { type: String, default: "" }, // Stores the TOTP secret key
    firstname: { type: String, default: "" },
    lastname: { type: String, default: "" },
    email: { type: String, default: "" },
    failedLoginAttempts: { type: Number, default: 0 },
    lockoutUntil: { type: Date, default: null },
    mobileNumber: { type: String, default: "" },
    portfolio: { type: String, default: "" },
    objective: { type: String, default: "" },
    address: { type: String, default: "" },
    education: { type: Array, default: [] },
    skills: { type: Array, default: [] },
    experience: { type: Array, default: [] },
    projects: { type: Array, default: [] },
    certificates: { type: Array, default: [] },
    courses: { type: Array, default: [] },
    cocurricular: { type: Array, default: [] },
    interests: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

const usermodel = mongoose.model("users", userSchema);

module.exports = usermodel;
