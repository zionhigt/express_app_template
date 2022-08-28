FROM node:18.8.0-alpine3.15
WORKDIR /app
COPY . /app/
RUN npm install
RUN --network=host
EXPOSE 3000
CMD npm run start