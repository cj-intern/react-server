FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./src ./src
COPY ./public ./public

WORKDIR /app/src

CMD nohup npm start