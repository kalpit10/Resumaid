// logger.js
require("dotenv").config();
const winston = require("winston");
require("winston-mongodb");

// 1. Define custom logging levels
const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4,
};

// 2. Define color codes for console output
const colors = {
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  debug: "blue",
};

winston.addColors(colors); // Enable colorization in Winston

// 3. Create main Winston logger instance
const logger = winston.createLogger({
  levels, // use custom levels
  level: "debug", // log everything from debug and up
  format: winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
    winston.format.printf(({ level, message, timestamp }) => {
      return `[${timestamp}] ${level.toUpperCase()}: ${message}`;
    })
  ),
  transports: [
    // Log only errors to error.log file
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),

    // Log everything to combined.log
    new winston.transports.File({ filename: "logs/combined.log" }),

    // Log to MongoDB (collection: logs)
    new winston.transports.MongoDB({
      level: "http", // store everything from http and up
      db: process.env.MONGODB_URI,
      collection: "logs",
    }),

    // Log to console with color and formatting
    new winston.transports.Console({
      level: "debug",
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        winston.format.printf(({ level, message, timestamp }) => {
          return `[${timestamp}] ${level}: ${message}`;
        })
      ),
    }),
  ],
});

// 4. Stream for Morgan to write request logs into Winston
const stream = {
  write: (message) => {
    logger.http(message.trim());
  },
};

module.exports = logger;
module.exports.stream = stream;
