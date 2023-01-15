# The first FROM is now a stage called build-stage
FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV PORT=3001

RUN npm ci

CMD npm start