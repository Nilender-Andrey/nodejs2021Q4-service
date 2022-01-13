FROM node:16.13-alpine3.15

WORKDIR /app

COPY package*.json /app

RUN npm install && npm cache clean --force

COPY . /app

EXPOSE 4000

#CMD [ "npm", "run", "start:docker" ]
CMD [ "npm", "start" ]

