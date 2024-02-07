import { useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { StatusEnum, useGetCashTurnMovementsQuery } from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

const useCustomGetCashTurnMovementQuery = (turnId:string) => {
  const [variables, setVariables] = useState <PaginationInterfaceState>()
  const [filter, setFilter] = useState <string>()
  const filtroDebounced = UseDebouncedValue(filter, 2000)

  const { data, loading, refetch } = useGetCashTurnMovementsQuery({
    fetchPolicy: 'network-only',
    variables: {
      turnId,
      paginationInput: {
        filter: filtroDebounced,
        page: variables?.currentPage || 1,
        rows: variables?.rows || 5
      }
    },
    onCompleted: (result) => {
      setVariables({
        totalPages: result.getCashTurnMovements?.totalPages || 1,
        rows: result.getCashTurnMovements?.rows || 5,
        filter: filtroDebounced,
        currentPage: result.getCashTurnMovements?.currentPage || 1,
        totalRecords: result.getCashTurnMovements?.totalRecords || 1
      })
      if (result.getCashTurnMovements?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getCashTurnMovements?.message || 'Error al cargar los productos',
          'error'
        )
      }
    },
    onError: (error) => {
      setTimeout(() => {
        refetch()
      }, 15000)
      console.log(error)
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

export default useCustomGetCashTurnMovementQuery
