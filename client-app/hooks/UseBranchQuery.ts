import { useEffect, useState } from 'react'
import UseDebouncedValue from './UseDebouncedValue'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  useCreateBranchProductMutation,
  useGetBranchProductsPaginatedQuery,
  useUpdateBranchProductMutation
} from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
export interface CreateBranchProductInput {
  branchId: string
  productId: string
  isVisibleOnMenu: boolean
  isVisibleOnWeb: boolean
  price: number
}

export type BranchProductData = {
  id: string
  price: number
  isVisibleOnMenu: boolean
  isVisibleOnWeb: boolean
}

export const useCreateBranchProductQuery = () => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()

  const [createBranchProduct, { loading }] = useCreateBranchProductMutation()

  const handleCreateBranchProduct = (
    data: CreateBranchProductInput,
    onSucces?: () => void
  ) => {
    createBranchProduct({
      variables: {
        createBranchProductInput: {
          branchId: data.branchId,
          productId: data.productId,
          isVisibleOnMenu: data.isVisibleOnMenu,
          isVisibleOnWeb: data.isVisibleOnWeb,
          price: data.price
        }
      },
      onCompleted: result => {
        if (result.createBranchProduct?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.createBranchProduct.message || 'Something went wrong',
            'error'
          )
        }
        if (result.createBranchProduct?.status === StatusEnum.OK) {
          showSuccessToast('Producto creado correctamente', 'success')
          onSucces?.()
        }
      }
    })
  }

  return {
    handleCreateBranchProduct,
    loading,
    variables,
    setVariables
  }
}

export const useGetBranchProductQuery = (branchId: string) => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()
  const [filter, setFilter] = useState<string>()
  const filterDebounced = UseDebouncedValue(filter, 800)
  const { data, loading, refetch } = useGetBranchProductsPaginatedQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: filterDebounced,
        page: variables?.currentPage || 1,
        rows: variables?.rows || 5
      },
      branchId
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

  useEffect(() => {
    refetch()
  }, [refetch, branchId])

  return {
    data,
    loading,
    refetch,
    variables,
    setVariables,
    setFilter
  }
}

export const useGetBranchProductPOSQuery = (branchId: string) => {
  const [filter, setFilter] = useState<string>()
  const filterDebounced = UseDebouncedValue(filter, 800)
  const { data, loading, refetch } = useGetBranchProductsPaginatedQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: filterDebounced
      },
      branchId
    },
    onCompleted: result => {
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
    setFilter,
    refetch
  }
}

export const useUpdateBranchProductQuery = () => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()
  const [updateBranchProduct] = useUpdateBranchProductMutation()
  const handleUpdateBranchProduct = (
    data: BranchProductData,
    field: string
  ) => {
    updateBranchProduct({
      variables: {
        updateBranchProductInput: {
          id: data.id,
          isVisibleOnMenu:
            field === 'menu' ? !data.isVisibleOnMenu : data.isVisibleOnMenu,
          isVisibleOnWeb:
            field === 'web' ? !data.isVisibleOnWeb : data.isVisibleOnWeb,
          price: data.price
        }
      },
      onCompleted: result => {
        if (result.updateBranchProduct?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.updateBranchProduct.message ||
              'No se pudo actualizar el producto',
            'error'
          )
        }
        if (result.updateBranchProduct?.status === StatusEnum.OK) {
          showSuccessToast('Producto actualizado correctamente', 'success')
        }
      }
    })
  }
  return {
    handleUpdateBranchProduct,
    variables,
    setVariables
  }
}
