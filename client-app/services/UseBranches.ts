import { useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  useGetBranchesPaginatedQuery
} from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

const useCustomGetBranchesQuery = () => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()
  const [filter, setFilter] = useState<string>()
  const filtroDebounced = UseDebouncedValue(filter, 2000)

  const { data, loading, refetch } = useGetBranchesPaginatedQuery({
    variables: {
      paginationInput: {
        filter: filtroDebounced,
        page: variables?.currentPage || 1,
        rows: 5
      }
    },
    onCompleted: result => {
      setVariables({
        totalPages: result.getBranchesPaginated?.totalPages || 1,
        rows: result.getBranchesPaginated?.rows || 5,
        filter: filtroDebounced,
        currentPage: result.getBranchesPaginated?.currentPage || 1,
        totalRecords: result.getBranchesPaginated?.totalRecords || 1
      })
      if (result.getBranchesPaginated?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getBranchesPaginated?.message ||
            'Error al cargar los productos',
          'error'
        )
      }
    }
  })

  return {
    data,
    loading,
    refetch,
    variables,
    setVariables,
    setFilter
  }
}

export default useCustomGetBranchesQuery
