import { ApolloClient, InMemoryCache } from '@apollo/client'

const apolloClientSSR = new ApolloClient({
  uri: process.env.BACKENDSERVICEURL,
  cache: new InMemoryCache(),
  credentials: 'include'
})

export default apolloClientSSR
