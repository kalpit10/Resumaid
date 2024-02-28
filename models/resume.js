const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: false,
  },
  skills: {
    type: String,
    required: false,
  },
  experience: {
    type: String,
    required: false,
  },
  education: {
    type: String,
    required: false,
  },
  projects: {
    type: String,
    required: false,
  },
  interests: {
    type: String,
    required: false,
  },
  certifications: {
    type: String,
    required: false,
  },
  objective: {
    type: String,
    required: false,
  },
  summary: {
    type: String,
    required: false,
  },
  technology: {
    type: String,
    required: false,
  },
  languages: {
    type: String,
    required: false,
  },
  links: {
    type: String,
    required: false,
  },
  contacts: {
    type: String,
    required: false,
  },
  positions: {
    type: String,
    required: false,
  },
  profiles: {
    type: String,
    required: false,
  },
});
const resumeData = mongoose.model("Resume", resumeSchema);

module.exports = resumeData;
