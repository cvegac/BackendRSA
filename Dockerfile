FROM node:16.10.0 as base

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

FROM base as production

ENV NODE_PATH=./build

CMD ["npm", "start"]

