const crypto = require("crypto"); //built-in node.js crypto module

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY; //  (32 characters) for AES

// Set the IV (Initialization Vector) length to 16 bytes for AES-CBC
const IV_LENGTH = 16;

// Function for encryption
function encrypt(text) {
  // Step 1 : Create a random IV (Initialization Vector)
  const iv = crypto.randomBytes(IV_LENGTH);

  // Step 2: Create a cipher using AES-256-CBC, key, and IV
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  // Step 3: Encrypt the text (utf8 input to hex output)
  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Step 4: Return IV + encrypted text (IV is needed for decryption)
  return iv.toString("hex") + ":" + encrypted;
}

// Function for decryption
function decrypt(text) {
  // Step 1: Split the stored encrypted string into IV and encrypted text
  const [ivHex, encryptedText] = text.split(":");

  // Step 2: Convert the IV from hex string back to a buffer
  const iv = Buffer.from(ivHex, "hex");

  // Step 3: Create a decipher using the same AES algorithm, key, and IV
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  // Step 4: Decrypt the encrypted text back to utf8
  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}

module.exports = { encrypt, decrypt };
