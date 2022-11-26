FROM strapi/base:14

WORKDIR /srv/app

COPY ./package*.json ./

RUN npm install

COPY . .

ENV NODE_ENV production

RUN npm build
RUN npm run build --clean

EXPOSE 1337

CMD ["yarn", "start"]
