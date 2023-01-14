# The first FROM is now a stage called build-stage
FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

CMD npm run dev
