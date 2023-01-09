FROM node:18-alpine

WORKDIR /app

RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

COPY  package*.json ./
RUN npm ci
COPY . ./

RUN npx hardhat compile
RUN npm run build
