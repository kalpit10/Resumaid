# RESUMAID

This is a MERN Stack web application that allows users to create their own resumes and also check their resume scores by uploading a .docx file.

# Features

User registration and login system.
Resume builder that allows users to create their own resumes.
Resume score checker that parses the uploaded .docx file in JSON format and scores it accordingly.
User profile management that allows users to view and edit their own information.
Integration with a MongoDB database to store user information, resumes, and resume scores.
Responsive design for use on desktop, tablet, and mobile devices.

# Technologies

MongoDB, Express.js, React.js, Node.js (MERN Stack)
JSON parsing library
Docker for containerization
Winston for logging and monitoring
Bootstrap 5

# Installation

1. Clone the repository
2. If you want to clone the production (main) branch, use the command on the terminal: git clone https://github.com/kalpit10/Resumaid.git
3. For reviewing the testing branch, you can use the command on the terminal: git clone -b testing https://github.com/kalpit10/Resumaid.git
4. Install node modules for the project inside the parent directory using the command: *npm i*
5. Install node modules inside the client directory using the command: *npm i*
6. Create a .env file inside the parent directory and paste your own MONGODB string.
7. Inside parent directory, run the command: *npm run dev*
8. Wait for the server and client to start.
9. If the above command doesn't work, go inside client and run the command: *npm start*
10. Open a new terminal and go back to the parent directory where the server code resides and run the command: *node server.js*

# Usage

1. Register or log in to create an account.
2. Create a new resume by filling out the form in the profile section.
3. Upload a .docx file to check your resume score.
4. View your resume scores and profile information.

# Contributors

Name- Kalpit Swami
