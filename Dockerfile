# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:18-alpine

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
COPY package*.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

# Build the Next.js application
RUN npm run build

# Run the web service on container startup.
CMD ["npm", "start"]

# Expose the port the app runs on
EXPOSE 3000
