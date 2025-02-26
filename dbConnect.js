require("dotenv").config();
const mongoose = require("mongoose");

if (!process.env.MONGODB_URI) {
  console.error("Error: MONGODB_URI environment variable is not defined.");
  process.exit(1); // Exit the application if the URI is missing
}

mongoose.connect(process.env.MONGODB_URI);

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("Mongo Db connection successful");
});

connection.on("error", (error) => {
  console.error(error);
});
