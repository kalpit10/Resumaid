const express = require("express");
const multer = require("multer");
const ResumeParser = require("../resume-parser-master/src");
const router = express.Router();
const resumeData = require("../models/resume");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //null(no errors), "destination"
    cb(null, "../resume-parser-master/resumeFiles/");
  },

  filename: (req, file, cb) => {
    console.log(file);
    //we extend and grab the name of the file
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

//single means single file, for multiple files we say upload.arrays
//upload.single("Input tag name to be passed in which you are uploading the file")
router.post("/upload", upload.single("File"), (req, res) => {
  ResumeParser.parseResumeFile(
    `../resume-parser-master/resumeFiles/${req.file.filename}`,
    `../resume-parser-master/resumeFiles/compiled`
  )
    .then((file) => {
      console.log("Yay! " + file);
      //we used readFileSync method because  we cannot require() a json file directly in node.
      const resumeJson = fs.readFileSync(
        `../resume-parser-master/resumeFiles/compiled/${req.file.filename}.json`
      );
      //parsing here is necessary because otherwise the content is shown in buffer type, console.log() to check it.
      const resume = JSON.parse(resumeJson);
      const resumeFile = new resumeData({
        name: resume.name || "",
        email: resume.email || "",
        skills: resume.skills || "",
        experience: resume.experience || "",
        education: resume.education || "",
        projects: resume.projects || "",
        interests: resume.interests || "",
        certifications: resume.certifications || "",
        objective: resume.objective || "",
        summary: resume.summary || "",
        technology: resume.technology || "",
        languages: resume.languages || "",
        links: resume.links || "",
        contacts: resume.contacts || "",
        positions: resume.positions || "",
        profiles: resume.profiles || "",
      });

      return resumeFile.save();
    })
    .then((savedResume) => {
      console.log("Resume saved to database:", savedResume);
      res.json({
        success: true,
        message: "File Uploaded and Parsed Successfully",
      });
    })
    .catch((error) => {
      console.log("parseResume failed");
      console.error(error);
      res.json({ success: false, message: "Error parsing uploaded file" });
    });
});

module.exports = router;
