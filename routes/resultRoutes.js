const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

//this endpoint will send the latest json file to the score.js file in react and use that file's data
router.get("/result", (req, res) => {
  // Get the list of JSON files in the directory
  const dirPath = path.join(
    __dirname,
    "resume-parser-master",
    "resumeFiles",
    "compiled"
  );

  const files = fs
    .readdirSync(dirPath)
    .filter((file) => file.endsWith(".json"));

  // Sort the list of files by creation time in descending order
  files.sort((a, b) => {
    return (
      fs.statSync(path.join(dirPath, b)).ctimeMs -
      fs.statSync(path.join(dirPath, a)).ctimeMs
    );
  });

  // Get the latest file name
  const latestFile = files[0];

  // Read the JSON data from the latest file
  const jsonData = JSON.parse(
    fs.readFileSync(path.join(dirPath, latestFile), "utf-8")
  );

  // Send the JSON data as the response
  res.send(jsonData);
  console.log(jsonData);
});

module.exports = router;
