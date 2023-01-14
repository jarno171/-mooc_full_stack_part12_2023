# The first FROM is now a stage called build-stage
FROM node:16

WORKDIR /usr/src/app

COPY . .

ENV PORT=5000

ENV WATCHPACK_POLLING=true

RUN npm ci

CMD npm run dev
