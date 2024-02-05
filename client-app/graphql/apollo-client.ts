import {
  ApolloClient,
  ApolloLink,
  concat,
  HttpLink,
  InMemoryCache
} from '@apollo/client'
// import { USER_TOKEN_COOKIE } from '@/utils/storage'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
const httpLink = new HttpLink({ uri: process.env.NEXT_PUBLIC_BACKENDURL })
const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: cookies.get('sao-sess')
    }
  }))
  return forward(operation)
})
const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  link: concat(authMiddleware, httpLink)
})

export default client
