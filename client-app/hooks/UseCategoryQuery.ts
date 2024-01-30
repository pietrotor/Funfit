import { useEffect, useState } from 'react'
import UseDebouncedValue from './UseDebouncedValue'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  StatusEnum,
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useGetCategoryByIdQuery
} from '@/graphql/graphql-types'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'

export interface TCategories {
  id: string
  name: string
}

export const UseCustomCreateCategoryMutation = () => {
  const [createCategory, { loading }] = useCreateCategoryMutation()

  const handleCreateCategory = (name: string) => {
    createCategory({
      variables: {
        createCategoryInput: {
          name
        }
      },
      onCompleted: result => {
        if (result.createCategory?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.createCategory.message || 'Something went wrong',
            'error'
          )
        }
        if (result.createCategory?.status === StatusEnum.OK) {
          showSuccessToast('Category created correctly', 'success')
        }
      }
    })
  }

  return {
    handleCreateCategory,
    loading
  }
}

export const UseCustomGetCategories = () => {
  const [variables, setVariables] = useState<PaginationInterfaceState>()
  const [filter, setFilter] = useState<string>()
  const filterDebounced = UseDebouncedValue(filter, 2000)
  const { data, loading, refetch } = useGetCategoriesQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: filterDebounced,
        page: variables?.currentPage || 1,
        rows: variables?.rows || 5
      }
    },
    onCompleted: result => {
      if (result.getCategories?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getCategories.message || 'Error al cargar las categorias',
          'error'
        )
      }
    }
  })

  useEffect(() => {
    refetch()
  }, [refetch])

  return {
    data,
    loading,
    refetch,
    variables,
    setVariables,
    setFilter
  }
}

export const UseCustomeGetCategoriesById = (categoryId: string) => {
  const { data, loading } = useGetCategoryByIdQuery({
    fetchPolicy: 'network-only',
    variables: {
      getCategoryByIdId: categoryId
    }
  })

  return {
    data,
    loading
  }
}

export const UseCustomeUpdateCategory = () => {
  const [updateCategory, { loading }] = useCreateCategoryMutation()

  const handleUpdateCategory = (data: TCategories) => {
    updateCategory({
      variables: {
        createCategoryInput: {
          name: data.name
        }
      },
      onCompleted: result => {
        if (result.createCategory?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.createCategory.message || 'Error al actualizar categoría',
            'error'
          )
        }
        if (result.createCategory?.status === StatusEnum.OK) {
          showSuccessToast('Categoría actualizada correctamente', 'success')
        }
      }
    })
  }
  return {
    handleUpdateCategory,
    loading
  }
}

export const UseCustomeDeleteCategory = () => {
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleDeleteC = (categoryId: string) => {
    deleteCategory({
      variables: {
        deleteCategoryId: categoryId
      },
      onCompleted: result => {
        if (result.deleteCategory?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.deleteCategory.message || 'Error al eliminar categoría',
            'error'
          )
        }
        if (result.deleteCategory?.status === StatusEnum.OK) {
          showSuccessToast('Categoría eliminada correctamente', 'success')
        }
      }
    })
  }
  return {
    handleDeleteC
  }
}
