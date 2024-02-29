require("dotenv").config();
const mongoose = require("mongoose");
const csv = require("csv-parser");
const fs = require("fs");
const College = require("../models/colleges");

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const results = [];

//method to read the CSV file.
fs.createReadStream("./colleges.csv")
  //Pipe the read stream through the csv-parser library to parse the CSV data into objects.
  .pipe(csv())
  //   Use the on('data') event to push each college name into the results array.
  .on("data", (data) => {
    results.push(data.name);
  })
  //   Use the on('end') event to insert the college names into the MongoDB database using Mongoose's insertMany() method.
  .on("end", () => {
    College.insertMany(results.map((name) => ({ name })))
      .then(() => {
        console.log("Colleges inserted successfully");
        mongoose.connection.close();
      })
      .catch((error) => {
        console.error(error);
      });
  });
