import { setBusiness } from './configurationSlice'
import { AppThunk } from '../..'
import { GetConfigurationQuery } from '@/graphql/graphql-types'
import client from '@/graphql/apollo-client'
import { GET_CONFIGURATION } from '@/utils/queries'

export const getBusinessData = (): AppThunk => {
  return async dispatch => {
    try {
      const { data } = await client.query<GetConfigurationQuery>({
        query: GET_CONFIGURATION,
        fetchPolicy: 'network-only'
      })
      if (!data.getConfiguration?.data) {
        return null
      }
      dispatch(setBusiness(data.getConfiguration.data))
    } catch (error) {
      console.log(error)
    }
  }
}
