const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    skills: String,
    experience: String,
    education: String,
    projects: String,
    interests: String,
    certification: String,
    objective: String,
    summary: String,
    technology: String,
    languages: String,
    links: String,
    contacts: String,
    positions: String,
    profiles: String,
    awards: String,
    honors: String,
    additional: String,
    courses: String,
  },
  { timestamps: true }
);

const resumeData = mongoose.model("Resume", resumeSchema);

module.exports = resumeData;
