import { GetServerSidePropsContext, PreviewData } from 'next'
import cookie from 'cookie'

import { ParsedUrlQuery } from 'querystring'
import { CURRENT_USER } from './queries'
import apolloClientSSR from '@/graphql/apollo-ssr' // Ajusta según tu configuración
import { CurrentUserQuery, StatusEnum } from '@/graphql/graphql-types' // Ajusta según tu configuración

export const userVerificated = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery, PreviewData>
) => {
  try {
    if (ctx.req.headers.cookie) {
      const cookiesParsed = cookie.parse(ctx.req.headers.cookie)
      let authToken
      if (cookiesParsed['sao-sess']) {
        authToken = cookiesParsed['sao-sess'].trim()
      } else {
        return {
          props: {}
        }
      }
      const result = await apolloClientSSR.query<CurrentUserQuery>({
        query: CURRENT_USER,
        fetchPolicy: 'network-only',
        context: {
          headers: {
            authorization: authToken
          }
        }
      })
      const data = result.data
      if (
        data.currentUser?.status === StatusEnum.OK ||
        data.currentUser?.data
      ) {
        return {
          redirect: {
            permanent: false,
            destination: '/administration-panel/users'
          }
        }
      }
      return {
        props: {}
      }
    } else {
      return {
        props: {}
      }
    }
  } catch (error) {
    console.log(error)
    return {
      props: {}
    }
  }
}
