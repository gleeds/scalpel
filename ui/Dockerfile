FROM node:16.15.0

WORKDIR /usr/src/app

COPY package.json yarn.lock ./
RUN yarn install --pure-lockfile --network-timeout 36000
COPY ./ ./

EXPOSE 3000
CMD ["yarn","start"]