// morganLogger.js
require("dotenv").config();
const winston = require("winston");
require("winston-mongodb");

// Separate logger for Morgan's HTTP request logging
const morganLogger = winston.createLogger({
  level: "http",
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.json()
  ),
  transports: [
    // Save HTTP logs to a separate file
    new winston.transports.File({ filename: "logs/http-morgan.log" }),

    // Log HTTP requests to a separate MongoDB collection
    new winston.transports.MongoDB({
      level: "http",
      db: process.env.MONGODB_URI,
      collection: "morgan_logs", // Separate collection for request logs
      options: { useUnifiedTopology: true },
    }),
  ],
});

// Morgan uses this stream to write logs to the logger
const morganStream = {
  write: (message) => {
    console.log("MorganStream received:", message); // TEMPORARY
    morganLogger.http(message.trim());
  },
};

module.exports = { morganStream };
