FROM node:lts-alpine3.20 

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

EXPOSE 4500

RUN npm start

