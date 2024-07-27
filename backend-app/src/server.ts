import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
  ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { applyMiddleware } from 'graphql-middleware'
import http from 'http'

import 'graphql-import-node'
import typeDefs from './graphql/schema.graphql'
import resolvers from './graphql/resolvers'
import cors from 'cors'
import { GraphQLError } from 'graphql'
import { currentUser } from './graphql/middlewares/currentuser.middleware'
import dotenv from 'dotenv'
dotenv.config()
const { graphqlUploadExpress } = require('graphql-upload-ts')

export async function startServer() {
  try {
    // Required logic for integrating with Express
    const app = express()
    // middleware
    app.set('trust proxy', true)
    if (process.env.NODE_ENV === 'PRODUCTION') {
      app.use(
        cors({
          origin: ['https://funfitbo.shop'],
          credentials: true,
          allowedHeaders: [
            'Content-Type',
            'Authorization',
            'Content-Length',
            'X-Requested-With',
            'Accept',
            'Origin',
            'Host',
            'Connection',
            'Accept-Encoding',
            'Accept-Language'
          ]
        })
      )
      app.use(cors())
    } else {
      app.use(cors())
    }

    app.use(graphqlUploadExpress({ maxFileSize: 4000000, maxFiles: 10 }))
    app.use(currentUser)

    const httpServer = http.createServer(app)
    const schema = makeExecutableSchema({ typeDefs, resolvers })
    // const schemaWithMiddleware = applyMiddleware(schema, process.env.NODE_ENV === 'production' ? middleware : {})
    const schemaWithMiddleware = applyMiddleware(schema, {})
    // Same ApolloServer initialization as before, plus the drain plugin.
    const server = new ApolloServer({
      schema: schemaWithMiddleware,
      context: ({ req, res }) => {
        return { req, res }
      },
      formatError: err => {
        console.log('err', err)
        if (err.extensions && err.extensions.code === 'BAD_USER_INPUT') {
          return {
            message: 'error en parametros de entrada',
            field: err.message.split('$')[1].split('"')[0]
          }
        }
        console.log(err.extensions)
        return new GraphQLError('Error Interno')
      },
      introspection: process.env.NODE_ENV !== 'production',
      plugins: [
        process.env.NODE_ENV === 'PRODUCTION'
          ? ApolloServerPluginLandingPageDisabled()
          : ApolloServerPluginLandingPageGraphQLPlayground(),
        ApolloServerPluginDrainHttpServer({ httpServer })
      ]
    })
    // More required logic for integrating with Express
    await server.start()
    server.applyMiddleware({
      app,
      // By default, apollo-server hosts its GraphQL endpoint at the
      // server root. However, *other* Apollo Server packages host it at
      // /graphql. Optionally provide this to match apollo-server.
      path: '/graphql-api'
    })
    httpServer.listen({ port: process.env.PORT || 4000 }, () =>
      console.log(
        `🚀 FunFit Server ready at http://localhost:${
          process.env.PORT || 4000
        }${server.graphqlPath}`
      )
    )
  } catch (error) {
    console.log(error)
  }
}

export default startServer
