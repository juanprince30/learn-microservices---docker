 # user-service/Dockerfile
 FROM node:16-alpine
 WORKDIR /app
 COPY package*.json ./
 RUN npm install --only=production
 COPY . .
 USER node
 EXPOSE 3000
 CMD ["node", "src/index.js"]