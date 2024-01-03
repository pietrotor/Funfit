import { useState } from 'react'
import UseDebouncedValue from './UseDebouncedValue'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  useCreateBranchProductMutation,
  useGetBranchProductsPaginatedQuery
} from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
export interface CreateBranchProductInput {
  branchId: string
  productId: string
  isVisibleOnMenu: boolean
  isVisibleOnWeb: boolean
  price: number
}

export const useCreateBranchProductQuery = () => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()

  const [createBranchProduct] = useCreateBranchProductMutation({
    onCompleted: result => {
      if (result.createBranchProduct?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.createBranchProduct.message || 'Something went wrong',
          'error'
        )
      }
    }
  })

  const handleCreateBranchProduct = (data: CreateBranchProductInput) => {
    createBranchProduct({
      variables: {
        createBranchProductInput: {
          branchId: data.branchId,
          productId: data.productId,
          isVisibleOnMenu: data.isVisibleOnMenu,
          isVisibleOnWeb: data.isVisibleOnWeb,
          price: data.price
        }
      }
    })
  }

  return {
    handleCreateBranchProduct,
    variables,
    setVariables
  }
}

export const useGetBranchProductQuery = (branchId: string) => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()
  const [filter, setFilter] = useState<string>()
  const filterDebounced = UseDebouncedValue(filter, 2000)

  const { data, loading, refetch } = useGetBranchProductsPaginatedQuery({
    fetchPolicy: 'network-only',
    variables: {
      branchId,
      paginationInput: {
        filter: filterDebounced,
        page: variables?.currentPage || 1,
        rows: 5
      }
    },
    onCompleted: result => {
      setVariables({
        totalPages: result.getBranchProductsPaginated?.totalPages || 1,
        rows: result.getBranchProductsPaginated?.rows || 5,
        filter: filterDebounced,
        currentPage: result.getBranchProductsPaginated?.currentPage || 1,
        totalRecords: result.getBranchProductsPaginated?.totalRecords || 1
      })
      if (result.getBranchProductsPaginated?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getBranchProductsPaginated?.message ||
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
