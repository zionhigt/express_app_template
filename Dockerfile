FROM node:18.8.0-alpine3.15
WORKDIR /app
COPY . /app/
ENV PORT=3005
RUN npm install
EXPOSE ${PORT}
CMD npm run start