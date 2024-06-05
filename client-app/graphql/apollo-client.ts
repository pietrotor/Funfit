import { ApolloClient, ApolloLink, concat, InMemoryCache } from '@apollo/client'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'
// import { USER_TOKEN_COOKIE } from '@/utils/storage'
import Cookies from 'universal-cookie'

const cookies = new Cookies()
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

const uploadLink = createUploadLink({ uri: process.env.NEXT_PUBLIC_BACKENDURL })
const client = new ApolloClient({
  cache: new InMemoryCache(),
  credentials: 'include',
  link: concat(uploadLink, authMiddleware)
})

export default client
