import { useState } from 'react'
import UseDebouncedValue from './UseDebouncedValue'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import {
  StatusEnum,
  useCreatePriceListMutation,
  useDeletePriceListMutation,
  useGetPriceListsPaginatedQuery,
  useUpdatePriceListMutation
} from '@/graphql/graphql-types'
import { TPriceList } from '@/interfaces/TData'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

export const useCustomGetPriceListPaginatedQuery = () => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()
  const [filter, setFilter] = useState<string>()
  const filtroDebounced = UseDebouncedValue(filter, 500)

  const { data, loading, refetch } = useGetPriceListsPaginatedQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: filtroDebounced,
        page: variables?.currentPage || 1,
        rows: variables?.rows || 5
      }
    },
    onCompleted: () => {
      setVariables({
        totalPages: data?.getPriceListsPaginated?.totalPages || 1,
        rows: data?.getPriceListsPaginated?.rows || 5,
        filter: filtroDebounced,
        currentPage: data?.getPriceListsPaginated?.currentPage || 1,
        totalRecords: data?.getPriceListsPaginated?.totalRecords || 1
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

export const useCustomCreatePriceList = () => {
  const [createPriceList, { loading }] = useCreatePriceListMutation()

  const handleCreatePriceList = (name: string, description: string) => {
    createPriceList({
      variables: {
        createPriceListInput: {
          name,
          description
        }
      },
      onCompleted: result => {
        if (result.createPriceList?.status === StatusEnum.OK) {
          showSuccessToast('Lista de precios agregada exitosamente', 'success')
        }
      },
      onError: error => {
        showSuccessToast(
          error.message || 'Error al registrar la lista de precios',
          'error'
        )
      }
    })
  }

  return { handleCreatePriceList, loading }
}

export const useCustomUpdatePriceList = () => {
  const [updatePriceList, { loading }] = useUpdatePriceListMutation()

  const handleUpdatePriceList = (data: TPriceList, callback: () => void) => {
    updatePriceList({
      variables: {
        updatePriceListInput: {
          id: data.id,
          name: data.name,
          description: data.description
        }
      },
      onCompleted: result => {
        if (result.updatePriceList?.status === StatusEnum.OK) {
          showSuccessToast(
            'Lista de precios actualizada exitosamente',
            'success'
          )
          callback()
        } else {
          showSuccessToast('Error al actualizar la lista de precios', 'error')
        }
      },
      onError: error => {
        console.log(error)
        showSuccessToast(
          error.message || 'Error al actualizar la lista de precios',
          'error'
        )
      }
    })
  }

  return { handleUpdatePriceList, loading }
}

export const useCustomDeletePriceList = () => {
  const [deletePriceList, { loading }] = useDeletePriceListMutation()

  const handleDeletePriceList = (id: string, callback: () => void) => {
    deletePriceList({
      variables: {
        deletePriceListId: {
          id
        }
      },
      onCompleted: result => {
        if (result.deletePriceList?.status === StatusEnum.OK) {
          showSuccessToast('Lista de precios eliminada exitosamente', 'success')
          callback()
        }
      },
      onError: error => {
        showSuccessToast(
          error.message || 'Error al eliminar la lista de precios',
          'error'
        )
      }
    })
  }

  return { handleDeletePriceList, loading }
}
