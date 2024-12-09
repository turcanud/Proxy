FROM node:16

WORKDIR /app

COPY package*.json .

RUN npm install

COPY server.js .
COPY database ./database

EXPOSE 3000

CMD ["node", "server.js"]
