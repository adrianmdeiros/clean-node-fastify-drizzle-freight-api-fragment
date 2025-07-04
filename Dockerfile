FROM node:latest

WORKDIR /app

COPY package.json .

RUN npm install
RUN npx drizzle-kit migrate
RUN npx drizzle-kit generate

ENV PORT=3000
ENV DB_FILE_NAME=file:./src/app/infra/orm/drizzle/db/tests.db

COPY . .

CMD [ "npm", "run", "test" ]