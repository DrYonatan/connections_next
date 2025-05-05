FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy app files
COPY . .

# Install dependencies
RUN npm install

# Build the Next.js app
RUN npm run build

# Expose the app port
EXPOSE 3000

# Start the Next.js server correctly
CMD ["npm", "run", "start"]
