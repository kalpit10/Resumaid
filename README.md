# RESUMAID - Resume Builder & ATS Scanner

## Overview

Resumaid is a secure and modern MERN stack web application that allows users to:

- Create professional resumes using customizable templates
- Upload their resumes in `.docx` format for ATS (Applicant Tracking System) analysis
- View personalized feedback and score
- Securely manage their profile with sensitive information encrypted in the database

This project is built with a strong focus on **OWASP Top 10** security best practices, **PIPEDA-compliant** data protection, and is **containerized with Docker** for secure deployment.

---

## ⚠️ About this Branch

This branch (`testing`) is used **only for testing new security features and experimental improvements** before merging into the main branch.

✅ For the **latest stable and production-ready code**, switch to the `main` branch:  
`https://github.com/kalpit10/Resumaid`

---

## Features

### ✅ User Authentication

- Enforced strong password policy (uppercase, symbols, digits, min length 16)
- Passwords hashed with **bcrypt** using 12 salt rounds
- Accounts secured with **Multi-Factor Authentication (MFA)** using Google Authenticator

### 🧾 Resume Builder

- Users input resume data through a structured profile form
- Supports various customizable resume templates
- **Data encrypted with AES-256-CBC** before storing in MongoDB

### 📄 ATS Resume Scanner

- Upload `.docx` resume
- Resume parsed and analyzed for ATS sections like skills, experience, etc.
- **Parsed resume data is encrypted** before being saved
- ATS score and feedback displayed in real-time

### 👤 Profile Management

- Personal details like email, phone, and address are encrypted using **Node.js crypto module (AES-256-CBC)**
- Secure route handling via middleware and JWT tokens

### 🛡️ Logging & Monitoring

- **Winston** logs app events and errors
- **Morgan** logs HTTP request details
- Logs stored in `/logs` folder (`error.log`, `combined.log`, `http-morgan.log`) for future SIEM analysis

### 🐳 Dockerized Architecture

- Complete Docker support for local deployment
- Services for backend, frontend, and MongoDB containerized using Docker Compose
- Secure environment configuration via `.env` file

---

## 🛡 Security Highlights (OWASP Top 10)

### A01: Broken Access Control

- Routes are secured using JWT authentication middleware
- Users can only access and update their own data

### A02: Cryptographic Failures

- AES-256-CBC used for encrypting PII fields (email, phone, address, MFA secret)
- All encryption/decryption operations use environment-defined secret keys

### A03: Injection

- MongoDB queries use input sanitization and strict regex validation
- Prevents NoSQL injection and other malicious input exploits

### A04: Insecure Design

- Generic error messages avoid exposing backend logic
- No sensitive information is printed in the frontend console
- JWT secrets, encryption keys, DB credentials are securely stored in `.env`

### A05: Security Misconfiguration

- `.env` excluded from version control
- Rate limiting applied to login endpoint
- Production and development environments clearly separated

### A06: Vulnerable & Outdated Components

- Latest stable Node.js (v18) and up-to-date dependencies used
- Deprecated modules like `crypto-js` replaced with native `crypto`

### A07: Identification and Authentication Failures

- JWT tokens use secure flags: `httpOnly`, `secure`, `sameSite=Strict`
- Short-lived sessions (30 minutes)
- MFA (OTP via TOTP) enabled
- Lockout after multiple failed login attempts

### A08: Software & Data Integrity Failures

- Backend and frontend built in isolated Docker containers
- JWT tokens are cryptographically signed
- Build integrity maintained through `Dockerfile` separation

### A09: Security Logging & Monitoring Failures

- Winston logs app-level events (login, errors, warnings)
- Morgan logs detailed HTTP request activity
- Failed logins and rate-limit violations recorded with IP and username for anomaly detection

### A10: Server-Side Request Forgery (SSRF)

- No external requests are accepted from client-side input
- All third-party integrations are controlled from the backend

---

## 🧪 Installation (for Local Testing)

## 1. Clone the testing branch

git clone -b testing https://github.com/kalpit10/Resumaid.git

## 2. Navigate to root directory

cd Resumaid

## 3. Install backend dependencies

npm install

## 4. Install frontend dependencies

cd client && npm install && cd ..

## 5. Create a .env file in the root directory

- Mention all the secret keys that are required
- For example: MONGODB_URI=your_mongodb_uri

## 6. Run development servers

npm run dev

# 👨‍💻 Author

Kalpit Swami

(Cybersecurity Enthusiast | MERN Developer | OWASP-Compliant Builder)
GitHub: kalpit10
LinkedIn: https://www.linkedin.com/in/kalpitswami

# Security Learners!

This project is designed with real-world OWASP Top 10 implementation examples. If you're learning web security or building secure applications, feel free to clone, explore, and test this project.

💬 Got questions? Connect on LinkedIn
🙌 If you use this project in your portfolio, schoolwork, or presentations — please don’t forget to credit me on LinkedIn!

Securely build. Securely ship. 🔐
