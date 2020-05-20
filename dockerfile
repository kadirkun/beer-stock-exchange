FROM node:14

COPY ./* app/

ENV MONGO_URL="mongodb+srv://beerSE:oKvHy7ttuyo8uusL@cluster0-p753s.mongodb.net/test?retryWrites=true&w=majority"

EXPOSE 8080

WORKDIR app

CMD npm run client-install
CMD npm run build
CMD npm start