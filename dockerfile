FROM node:20-alpine3.20
WORKDIR /app
COPY . . 
RUN npm install
ENTRYPOINT [ "react", "server.js" ]
EXPOSE 3000