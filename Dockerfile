FROM node:18.8.0-alpine3.15
ENV APP_DIR=/home/node/app/
WORKDIR ${APP_DIR}
COPY . ${APP_DIR}
ENV PORT=3005
RUN npm install
EXPOSE ${PORT}
CMD npm run start