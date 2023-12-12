import { useEffect, useState } from 'react'
import { GetUsersQueryVariables, useGetUsersQuery } from '@/graphql/graphql-types'

const useUserQuery = (initialVariables: GetUsersQueryVariables) => {
  const [variables, setVariables] = useState<GetUsersQueryVariables>(initialVariables)
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<any>(null)
  const [totalPages, setTotalPages] = useState<number>(1)

  const { fetchMore, loading: fetchMoreLoading } = useGetUsersQuery({
    variables,
    fetchPolicy: 'network-only',
    onCompleted: (result) => {
      setData(result.getUsers)
      setTotalPages(result.getUsers?.totalPages || 1)
      setLoading(false)
    }
  })

  const fetchData = async (newVariables?: GetUsersQueryVariables) => {
    setLoading(true)
    setVariables(newVariables || initialVariables)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    if (!loading) {
      fetchMore({
        variables,
        updateQuery: (prev, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prev
          return fetchMoreResult
        }
      })
    }
  }, [variables, loading])

  return { loading, data, fetchData, totalPages, fetchMoreLoading }
}

export default useUserQuery
