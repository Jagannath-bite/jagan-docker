# 1️⃣ Base image
FROM node:18-alpine

# 2️⃣ Set working directory
WORKDIR /app

# 3️⃣ Copy package files first (for caching)
COPY package*.json ./

# 4️⃣ Install dependencies
RUN npm install

# 5️⃣ Copy application code
COPY . .

# 6️⃣ Expose backend port
EXPOSE 5000

# 7️⃣ Start backend
CMD ["node", "server.js"]
