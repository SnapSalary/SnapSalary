FROM --platform=linux/amd64 node:alpine

WORKDIR /server

COPY ./package.json .

RUN chown -R 1000:1000 /server

USER 1000:1000

RUN npm install

CMD npm run start
