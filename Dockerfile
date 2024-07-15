FROM node:22-alpine

WORKDIR /app

COPY package* .
COPY ./src ./src
COPY ./public ./public

RUN npm install

WORKDIR /app/src

CMD nohup npm start