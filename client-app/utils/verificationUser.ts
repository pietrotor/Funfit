// import { CURRENT_USER } from '@/utils/querys'
import cookie from 'cookie'
import { CURRENT_USER } from './queries'
import apolloClientSSR from '@/graphql/apollo-ssr'
// import client from '@/graphql/apollo-client'

export const authUserHeader = async (ctx: any) => {
  try {
    if (!ctx.req.headers.cookie) {
      return {
        redirect: {
          permanent: false,
          destination: '/administration-panel/login'
        }
      }
    }
    const cookiesParsed = cookie.parse(ctx.req.headers.cookie)
    let authToken
    if (cookiesParsed['sao-sess']) {
      authToken = cookiesParsed['sao-sess']
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/administration-panel/login'
        }
      }
    }
    console.log(authToken, 'cookiesParsed')

    // Get the user's session based on the request
    const result = await apolloClientSSR.query({
      query: CURRENT_USER,
      context: {
        headers: {
          Authorization: authToken
        }
      }
    })
    console.log(result, 'result------------')
    const data = result.data
    if (data.currentUser.status === 'error') {
      return {
        redirect: {
          permanent: false,
          destination: '/administration-panel/login'
        }
      }
    }
    // If there is a user, return the current session
    return { props: { user: data.currentUser.user } }
  } catch (error) {
    console.log(error)
    return {
      redirect: {
        permanent: false,
        destination: '/administration-panel/login'
      }
    }
  }
}
