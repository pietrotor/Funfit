import { useState } from 'react'
import UseDebouncedValue from './UseDebouncedValue'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  useCreateDistributorMutation,
  useGetDistributorByIdQuery,
  useGetDistributorsPaginatedQuery,
  useUpdateDistributorMutation
} from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import { TDistributor } from '@/interfaces/TData'
export interface ICreateDistributorInput {
  branchId: string
  productId: string
  isVisibleOnMenu: boolean
  isVisibleOnWeb: boolean
  price: number
}

export const useCustomGetDistributorsPaginated = () => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()
  const [filter, setFilter] = useState<string>()
  const filterDebounced = UseDebouncedValue(filter, 800)
  const { data, loading, refetch } = useGetDistributorsPaginatedQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: filterDebounced,
        page: variables?.currentPage || 1,
        rows: variables?.rows || 5
      }
    },
    onCompleted: result => {
      setVariables({
        totalPages: result.getDistributorsPaginated?.totalPages || 1,
        rows: result.getDistributorsPaginated?.rows || 5,
        filter: filterDebounced,
        currentPage: result.getDistributorsPaginated?.currentPage || 1,
        totalRecords: result.getDistributorsPaginated?.totalRecords || 1
      })
    },
    onError: error => {
      showSuccessToast(
        error.message || 'Error al cargar los distribuidores',
        'error'
      )
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

export const useCustomCreateDistributor = () => {
  const [createDistributor] = useCreateDistributorMutation()

  const handleCreateDistributor = (data: TDistributor) => {
    createDistributor({
      variables: {
        createDistributorInput: {
          ...data
        }
      },
      onCompleted: result => {
        if (result.createDistributor?.status === StatusEnum.OK) {
          showSuccessToast('Distribuidor registrado correctamente', 'success')
        }
      },
      onError: error => {
        showSuccessToast(
          error.message || 'Error al registrar el distribuidor',
          'error'
        )
      }
    })
  }

  return { handleCreateDistributor }
}

export const useCustomGetDistributorById = (id: string) => {
  const { data, loading } = useGetDistributorByIdQuery({
    fetchPolicy: 'network-only',
    variables: {
      getDistributorByIdId: id
    }
  })

  return {
    data,
    loading
  }
}

export const useCustomUpdateDistributor = () => {
  const [updateDistributor] = useUpdateDistributorMutation()

  const handleUpdateDistributor = (data: TDistributor) => {
    updateDistributor({
      variables: {
        updateDistributorInput: {
          id: data.id,
          name: data.name,
          nit: data.nit,
          phone: data.phone,
          code: data.code,
          address: data.address,
          socialReason: data.socialReason,
          email: data.email,
          ownerInformation: {
            name: data.ownerInformation?.name,
            lastName: data.ownerInformation?.lastName,
            phone: data.ownerInformation?.phone,
            address: data.ownerInformation?.address
          }
        }
      },
      onCompleted: result => {
        if (result.updateDistributor?.status === StatusEnum.OK) {
          showSuccessToast('Distribuidor actualizado correctamente', 'success')
        }
      },
      onError: error => {
        showSuccessToast(
          error.message || 'Error al actualizar el distribuidor',
          'error'
        )
      }
    })
  }

  return { handleUpdateDistributor }
}
