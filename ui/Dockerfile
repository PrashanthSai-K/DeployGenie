FROM node:lts-alpine3.20 AS Build

WORKDIR /app
COPY package.json package.json
RUN npm install
COPY . .
RUN npm start
EXPOSE 3000

