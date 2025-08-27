# frontend/Dockerfile
 FROM node:16-alpine AS builder
 WORKDIR /app
 COPY package*.json ./
 RUN npm install
 COPY . .
 RUN npm run build
 FROM nginx:alpine AS production
 COPY --from=builder /app/build /usr/share/nginx/html
 COPY nginx.conf /etc/nginx/conf.d/default.conf
 EXPOSE 3000

 # Étape développement
FROM node:16-alpine AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]