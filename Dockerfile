# Use Node.js 18 as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy all backend files to the container
COPY . .

# Expose the port for the backend
EXPOSE 5000

# Start the backend
CMD ["npm", "start"]
