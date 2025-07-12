# Use official Node.js LTS image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app source
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Use nodemon for dev; change to "node server.js" for production
CMD ["node", "app.js"]
