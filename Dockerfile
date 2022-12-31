FROM node:18.8.0-alpine3.15
ENV APP_DIR=/home/node/app/
WORKDIR ${APP_DIR}
COPY . ${APP_DIR}
ENV PORT=3005
RUN apk update && apk add git openssh &&\
npm install -g npm@latest &&\
npm -g install bower &&\
npm install &&\
bower install --allow-root=true
EXPOSE ${PORT}
CMD npm run start