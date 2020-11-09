FROM node:alpine

WORKDIR /forecast-app

COPY package.json /forecast-app

RUN yarn install

COPY . /forecast-app

CMD ["npm", "start"]