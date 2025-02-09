require("dotenv").config();
const winston = require("winston");
require("winston-mongodb");

const logger = winston.createLogger({
  level: "info", // Logs everything from 'info' level and above
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    // Logs stored in a file
    new winston.transports.File({ filename: "logs/app.log" }),

    // Logs stored in MongoDB
    new winston.transports.MongoDB({
      db: process.env.MONGODB_URI, // MongoDB connection string
      collection: "logs", // Name of the collection in MongoDB
      options: { useUnifiedTopology: true },
    }),

    // Display logs in console (for debugging)
    new winston.transports.Console(),
  ],
});

module.exports = logger;
