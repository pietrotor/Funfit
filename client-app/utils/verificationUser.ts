// import { CURRENT_USER } from '@/utils/querys'
import cookie from 'cookie'

import { GetServerSidePropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring'
import { CURRENT_USER } from './queries'
import apolloClientSSR from '@/graphql/apollo-ssr'
import { CurrentUserQuery, StatusEnum } from '@/graphql/graphql-types'

// import client from '@/graphql/apollo-client'

export const authUserHeader = async (ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>) => {
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
      authToken = cookiesParsed['sao-sess'].trim()
    } else {
      return {
        redirect: {
          permanent: false,
          destination: '/administration-panel/login'
        }
      }
    }

    // Get the user's session based on the request
    const result = await apolloClientSSR.query <CurrentUserQuery>({
      query: CURRENT_USER,
      fetchPolicy: 'network-only',
      context: {
        headers: {
          Authorization: authToken
        }
      }
    })

    console.log(result, 'result------------')
    const data = result.data
    if (data.currentUser?.status === StatusEnum.ERROR || !data.currentUser?.data) {
      return {
        redirect: {
          permanent: false,
          destination: '/administration-panel/login'
        }
      }
    }
    // If there is a user, return the current session
    return { props: { user: data.currentUser.data } }
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
