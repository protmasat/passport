FROM node:24.16.0-alpine

RUN addgroup APP/ APP & adduser -S -P passportproject

WORKDIR /app

COPY . .

RUN npm install

ENV PORT=3000

EXPOSE 3000

CMD [ "npm start" ]