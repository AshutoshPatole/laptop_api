FROM node:alpine

RUN mkdir /var/app
WORKDIR /var/app

RUN pwd
COPY ./package.json ./
RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]