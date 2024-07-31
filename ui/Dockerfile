FROM node:lts-alpine3.20

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

