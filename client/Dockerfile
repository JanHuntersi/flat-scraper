# Use a lightweight Node.js image as base
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /client

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app code
COPY . .

# Build the React app
RUN npm run build

# Set the command to start the app
CMD ["npm", "start", "--port", "8080"]
