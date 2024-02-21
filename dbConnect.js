require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI);
const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo Db connection successfull");
});

connection.on("error", (error) => {
  console.error(error);
});
