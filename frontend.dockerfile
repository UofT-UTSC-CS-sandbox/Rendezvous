# Use an official Node runtime as a parent image
FROM node:lts-alpine3.19

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY rendezvous_app/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project to the working directory
COPY rendezvous_app .

# Build production bundle
RUN npm run build

# Expose the port your app runs on
EXPOSE 3000

# Run the app
CMD ["npm", "start"]
