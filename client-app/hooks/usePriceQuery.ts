import { useState } from 'react'
import { useRouter } from 'next/router'
import UseDebouncedValue from './UseDebouncedValue'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import { useGetPricesPaginatedQuery } from '@/graphql/graphql-types'

const useCustomGetPricePaginatedQuery = () => {
  const router = useRouter()
  const { priceListId } = router.query
  const [variables, setVariables] = useState<PaginationInterfaceState>()
  const [filter, setFilter] = useState<string>()
  const filtroDebounced = UseDebouncedValue(filter, 500)

  const { data, loading, refetch } = useGetPricesPaginatedQuery({
    fetchPolicy: 'network-only',
    variables: {
      pricePaginationInput: {
        filter: filtroDebounced,
        page: variables?.currentPage || 1,
        rows: variables?.rows || 5,
        priceListId
      }
    },
    onCompleted: () => {
      setVariables({
        totalPages: data?.getPricesPaginated?.totalPages || 1,
        rows: data?.getPricesPaginated?.rows || 5,
        filter: filtroDebounced,
        currentPage: data?.getPricesPaginated?.currentPage || 1,
        totalRecords: data?.getPricesPaginated?.totalRecords || 1
      })
    },
    onError(error) {
      console.log('🚀 ~ onError ~ error:', error)
    }
  })

  return {
    data,
    loading,
    setVariables,
    setFilter,
    variables,
    refetch
  }
}

export { useCustomGetPricePaginatedQuery }
