FROM node:16-alpine

WORKDIR /frontend

COPY package.json yarn.lock ./
RUN yarn install

CMD ["yarn", "dev"]
