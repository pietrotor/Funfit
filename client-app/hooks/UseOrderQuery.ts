import { useState } from 'react'
import UseDebouncedValue from './UseDebouncedValue'
import { TPointOfSaleData } from '../pages/administration-panel/point-of-sale'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  useAcceptOrderMutation,
  useGetOrdersPaginatedQuery,
  usePublicCreateOrderMutation
} from '@/graphql/graphql-types'
import { TOrder } from '@/interfaces/TData'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'

export const useCustomPublicCreateOrder = () => {
  const [createOrder] = usePublicCreateOrderMutation()

  const handleCreateOrder = (data: TOrder, callback: () => void) => {
    console.log(data)
    if (data) {
      createOrder({
        variables: {
          createOrderInput: {
            ...data
          }
        },
        onCompleted: result => {
          if (result.publicCreateOrder?.status === StatusEnum.OK) {
            showSuccessToast('Orden creada con éxito', 'success')
            callback()
          } else {
            showSuccessToast(
              result.publicCreateOrder?.message || 'Error al crear la orden',
              'error'
            )
          }
        },
        onError: error => {
          showSuccessToast(error.message, 'error')
        }
      })
    }
  }

  return { handleCreateOrder }
}

export const useCustomGetOrdersPaginated = (
  branchId: string,
  orderesAcepted: boolean
) => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()
  const [filter, setFilter] = useState<string>()
  const filtroDebounced = UseDebouncedValue(filter, 500)

  const { data, loading, refetch } = useGetOrdersPaginatedQuery({
    fetchPolicy: 'network-only',
    variables: {
      orderPaginationInput: {
        branchId,
        filter: filtroDebounced,
        page: variables?.currentPage || 1,
        rows: variables?.rows || 5,
        orderesAcepted
      }
    },
    onCompleted: () => {
      setVariables({
        totalPages: data?.getOrdersPaginated?.totalPages || 1,
        rows: data?.getOrdersPaginated?.rows || 5,
        filter: filtroDebounced,
        currentPage: data?.getOrdersPaginated?.currentPage || 1,
        totalRecords: data?.getOrdersPaginated?.totalRecords || 1
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

export const useCustomAcceptOrder = () => {
  const [acceptOrder] = useAcceptOrderMutation()

  const handleAcceptOrder = (orderId: string, order:TPointOfSaleData, callback: () => void) => {
    acceptOrder({
      variables: {
        orderId
      },
      onCompleted: result => {
        if (result.acceptOrder?.status === StatusEnum.OK) {
          showSuccessToast('Pedido aceptado', 'success')
        }
        callback()
      },
      onError: error => {
        showSuccessToast(error.message, 'error')
      }
    })
  }

  return { handleAcceptOrder }
}
