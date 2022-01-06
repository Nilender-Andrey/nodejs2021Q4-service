# server.listen(PORT, '0.0.0.0')

FROM node:16.13-alpine3.15

# перейди в дерикторию 
WORKDIR /app

# первый слой копируем 
COPY package*.json /app

# устанавливаем зависимости --production
RUN npm install 

# все что осталось
COPY . /app

# зададим порт
EXPOSE 4000

#VOLUME [ "/app/log" ]

# команда выполняемая при запуске контейнера
CMD [ "npm", "start" ]

