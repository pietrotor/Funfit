# PROD
# stage 1: build
FROM node:16-alpine

WORKDIR /usr/app

# Instalación de dependencias
COPY package*.json ./
RUN npm install
RUN npm install ts-node tsconfig-paths
RUN npm i -D typescript

# Copiar archivos de la aplicación
COPY . .

# Generar código si es necesario
RUN npm run codegen

# Compilar la aplicación
RUN npm run build

# Eliminar dependencias de desarrollo
RUN npm prune --production

# Copiar el archivo schema.graphql
COPY ./src/graphql/schema.graphql ./build/graphql/schema.graphql

# Exponer el puerto
EXPOSE 4000

# Definir las variables de entorno para ts-node
ENV TS_NODE_COMPILER_OPTIONS '{"project": "tsconfig.json"}'

# Ejecutar la aplicación
CMD ["node", "-r", "tsconfig-paths/register", "-r", "ts-node/register/transpile-only", "build/index.js"]
