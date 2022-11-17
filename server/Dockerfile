FROM node:alpine

WORKDIR /var/www/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000
