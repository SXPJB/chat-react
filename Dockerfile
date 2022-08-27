FROM node:latest

WORKDIR /app

COPY . .

RUN cd server && npm install && npm run build

EXPOSE 80
ENV PORT=80

CMD ["node", "server/index.js"]