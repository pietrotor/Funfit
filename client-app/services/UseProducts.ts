import { useState } from 'react'

import { useGetProductsQuery } from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

export const UseProducts = () => {
  const [filter, setFilter] = useState <string>('')
  const [variables, setVariables] = useState <PaginationInterfaceState>({})
  const filterProductDebounced = UseDebouncedValue(filter, 2000)
  const { loading, data, refetch } = useGetProductsQuery({
    variables: {
      paginationInput: {
        page: variables?.currentPage,
        rows: variables?.rows,
        filter: variables?.filter
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getProducts?.totalPages || 1,
        rows: data.getProducts?.rows || 5,
        filter: filterProductDebounced,
        currentPage: data.getProducts?.currentPage || 1,
        totalRecords: data.getProducts?.totalRecords || 1
      })
    }
  })

  return {
    loading,
    data,
    refetch
  }
}
