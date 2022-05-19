FROM node:16.15.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile
COPY ./src ./

EXPOSE 3000
CMD ["node","app.js"]