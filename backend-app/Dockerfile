# PROD
# stage 1: build
FROM node:16-alpine

WORKDIR /usr/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run codegen

RUN npm run build
RUN npm prune --production

COPY  ./src/graphql/schema.graphql ./build/graphql/schema.graphql

EXPOSE 4000

CMD ["npm", "start"]
