FROM node:18.9.1-alpine

WORKDIR /app

RUN npm config set fetch-retry-mintimeout 20000
RUN npm config set fetch-retry-maxtimeout 120000

COPY  package*.json ./
RUN npm ci
COPY . ./

RUN npx prisma generate

RUN npm run build
