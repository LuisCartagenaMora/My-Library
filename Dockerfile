#This works, just uncomment and erase the other ones.
# FROM node:18-slim

# WORKDIR /app.js

# COPY package.json ./

# RUN npm i

# COPY . .

# EXPOSE 3000

# CMD [ "node", "app.js" ]
# Use an official Node.js runtime as a parent image
FROM node:18-slim

# RUN apt-get update && apt-get install -y netcat && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy essential files
COPY . .

# Ensure the wait-for-it.sh script is executable
# RUN chmod +x wait-for-it.sh

# Expose the application port
EXPOSE 3000

# Use a shell to execute wait-for-it.sh before starting the app
CMD [ "node", "app.js" ]
# CMD ["sh", "-c", "until nc -z library_db 5434; do echo 'Waiting for database...'; sleep 1; done; node ./app.js"]

# CMD ["sh", "-c", "./wait-for-it.sh library_db:5434 -- node ./app.js"]

