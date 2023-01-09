FROM node:16-alpine

WORKDIR /app

RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

COPY  package*.json ./
RUN npm ci
COPY . ./

RUN npm run build
