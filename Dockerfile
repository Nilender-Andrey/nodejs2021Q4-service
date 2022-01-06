# server.listen(PORT, '0.0.0.0')
#FROM node:12.20.0-alpine3.9
FROM node:16.13-alpine


# создай директорию (папку)
RUN mkdir -p /app/

# перейди в дерикторию 
WORKDIR /app/

# первый слой копируем 
COPY package*.json /app/

# устанавливаем зависимости --production
RUN npm install 

# все что осталось
COPY . /app/

# зададим порт
EXPOSE 4000

# команда выполняемая при запуске контейнера
CMD [ "npm", "start" ]

