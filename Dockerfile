FROM node:10.13.0 AS builder

WORKDIR /app
COPY package.json yarn.lock /app/
COPY frontend/package.json /app/frontend/
COPY backend/package.json /app/backend/

RUN yarn install

RUN yarn build

COPY ./ /app/