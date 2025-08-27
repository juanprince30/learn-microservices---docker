# api-gateway/Dockerfile
 FROM node:16-alpine
 WORKDIR /app
 COPY package*.json ./
 RUN npm install --only=production
 COPY . .
 USER node
 EXPOSE 4000
 CMD ["node", "src/index.js"]