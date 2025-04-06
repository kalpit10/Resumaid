# RESUMAID - Resume Builder & ATS Scanner

## Overview
Resumaid is a secure and modern **MERN stack** web application that allows users to:

- Create professional resumes using customizable templates
- Upload their resumes in `.docx` format for **ATS (Applicant Tracking System)** analysis
- View personalized feedback and score
- Securely manage their profile with sensitive information encrypted in the database

It is built with a strong focus on **OWASP Top 10** security best practices, data privacy (PIPEDA-compliant), and secure deployment using Docker.

---

## Features

### User Authentication
- Register and login securely
- Enforced **strong password policy** (uppercase, symbols, digits, min length 16)
- Passwords are **hashed with bcrypt** using 12 salt rounds
- Accounts are protected with **MFA (Multi-Factor Authentication)** using Google Authenticator

### Resume Builder
- Fill in resume data via profile sections (skills, education, projects, etc.)
- Select templates for resume generation
- Stored data is **encrypted** using AES-256-CBC before saving to the database

### ATS Scanner
- Upload a `.docx` resume
- Parsed into JSON and scanned against key sections like skills, summary, education, etc.
- Resume data is also **encrypted** before saving
- Score and feedback shown on the frontend

### Profile Management
- View and update personal information (email, phone, address, etc.)
- Encrypted using **Node.js crypto module** with AES-256-CBC algorithm

### Logging & Monitoring
- Activity and errors are logged securely using **Winston and Morgan**
- Logs are stored in `logs/app.log` file for security audit and debugging

### Dockerized Architecture
- The entire application is containerized using Docker
- Separate containers for backend, frontend, and MongoDB
- Docker Compose used to manage multi-service setup

---

## Technologies Used

- **MongoDB** - Database
- **Express.js** - Backend API
- **React.js** - Frontend UI
- **Node.js** - JavaScript runtime
- **Docker & Docker Compose** - Containerized deployment
- **Winston + Morgan** - Logging and monitoring
- **bcryptjs** - Password hashing
- **speakeasy + qrcode** - MFA setup
- **AES-256-CBC (crypto module)** - Field-level encryption

---

## Security Highlights (Aligned with OWASP Top 10)

### A01: Broken Access Control
- Users can only update their own profiles
- Secure JWT validation middleware applied on sensitive routes

### A02: Cryptographic Failures
- AES-256-CBC used to encrypt PII (email, phone, address, MFA secret)
- Secrets are **never exposed** in frontend or logs
- All sensitive operations use environment variables

### A03: Injection
- MongoDB queries are sanitized to prevent NoSQL Injection
- User inputs are validated and sanitized with regex rules

### A04: Insecure Design
- MFA (OTP-based) support added for secure login
- Exponential lockout on failed login attempts to prevent brute-force

### A05: Security Misconfiguration
- .env used for secrets and not committed to GitHub
- Rate limiting applied on login route to prevent abuse

### A06: Vulnerable and Outdated Components
- Up-to-date dependencies used (Node.js 18)
- Known deprecated modules like `crypto-js` replaced with secure native `crypto`

### A07: Identification and Authentication Failures
- Secure JWT-based authentication
- MFA enforced for high-trust accounts
- Session expiration configured (30m default)

### A08: Software and Data Integrity Failures
- JWT tokens signed with secure secrets
- Backend and frontend containers are built from scratch with Docker

### A09: Security Logging and Monitoring Failures
- Winston and Morgan log all important activity
- Rate limit exceed attempts and failed logins are logged

### A10: Server-Side Request Forgery (SSRF)
- No external URL fetching from client input
- All internal operations run server-side with verified inputs

---

## Installation (For Development)

# 1. Clone the repository
$ git clone -b main https://github.com/kalpit10/Resumaid.git

# 2. Navigate to root directory
$ cd Resumaid

# 3. Install backend dependencies
$ npm install

# 4. Navigate to client and install frontend dependencies
$ cd client && npm install && cd ..

# 5. Create .env file in root (Do NOT share this file)
MONGODB_URI=your_mongodb_uri
ENCRYPTION_KEY=your_encryption_key
BCRYPT_SALT_ROUNDS=12
SECRET_KEY=your_jwt_secret

# 6. Start backend and frontend in dev mode
$ npm run dev


---

## Docker Deployment (Local)

# 1. Build and run using Docker Compose
$ docker-compose up --build

# 2. Access app on http://localhost:3000

> Screenshots: Include Docker Desktop status, running containers, and login flow

---

## Screenshot Suggestions (for Report)

| Feature                       | Screenshot To Take                                         |
|-----------------------------|-------------------------------------------------------------|
| Password hashing            | DevTools -> Register form -> Network tab (no plain pwd)    |
| MFA QR Code                 | Enable MFA page with QR Code visible                       |
| Encrypted data in DB        | MongoDB Compass view showing encrypted fields              |
| ATS Resume Upload           | Resume JSON preview (before encryption)                    |
| Docker Deployment           | Docker Desktop with running backend/frontend/mongo         |
| JWT Cookie & Token          | DevTools -> Application tab -> Cookies (token shown)       |
| Logging                     | Show logs/app.log file content with Winston logs           |

---

## Author

**Kalpit Swami**  
Cybersecurity Enthusiast | MERN Developer | OWASP-Compliant Builder  
GitHub: [kalpit10](https://github.com/kalpit10)

---

> **Disclaimer**: This project was built as part of a security-focused academic exercise. Secrets and keys are managed via environment variables and should not be exposed in production or shared repositories.

---

Ready to test, scan, and secure your resume the right way? Resumaid has your back!

