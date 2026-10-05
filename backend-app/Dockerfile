# PROD
# stage 1: build
FROM node:16-alpine

WORKDIR /usr/app

RUN npm install -g pnpm@8.15.4

# Instalación de dependencias
COPY package.json pnpm-lock.yaml .npmrc ./
RUN pnpm install --frozen-lockfile
RUN pnpm add ts-node tsconfig-paths
RUN pnpm add -D typescript

# Copiar archivos de la aplicación
COPY . .

# Generar código si es necesario
RUN pnpm codegen

# Compilar la aplicación
RUN pnpm build

# Eliminar dependencias de desarrollo
RUN pnpm prune --prod

# Copiar el archivo schema.graphql
COPY ./src/graphql/schema.graphql ./build/graphql/schema.graphql

# Exponer el puerto
EXPOSE 4000

# Definir las variables de entorno para ts-node
ENV TS_NODE_COMPILER_OPTIONS '{"project": "tsconfig.json"}'

# Ejecutar la aplicación
CMD ["node", "-r", "tsconfig-paths/register", "-r", "ts-node/register/transpile-only", "build/index.js"]
