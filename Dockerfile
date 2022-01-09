FROM node:16.13-alpine3.15

WORKDIR /app

COPY package*.json /app

RUN npm install 

COPY . /app

EXPOSE 4000

CMD [ "npm", "start" ]

