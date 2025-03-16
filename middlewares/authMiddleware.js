const jwt = require("jsonwebtoken");
const logger = require("../logger");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // Safely check if cookies exist before accessing `token`
  const token = req.cookies?.token;

  if (!token) {
    logger.warn("Unauthorized access attempt detected", { ip: req.ip });
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  try {
    // Use SECRET_KEY from .env
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (Date.now() >= decoded.exp * 1000) {
      logger.warn("Expired token used for authentication", {
        userId: decoded.userId,
        ip: req.ip,
      });
      return res
        .status(403)
        .json({ message: "Session expired. Please Login again!" });
    }

    req.user = decoded;

    next();
  } catch (error) {
    logger.error("Invalid token detected", { ip: req.ip });
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;
