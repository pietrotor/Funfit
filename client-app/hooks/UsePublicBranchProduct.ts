import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { StatusEnum, useGetPublicProductsQuery } from '@/graphql/graphql-types'

export const UseCustomeGetBranchProductQuery = (id: string) => {
  const { data, loading } = useGetPublicProductsQuery({
    fetchPolicy: 'network-only',
    variables: {
      branchId: id,
      paginationInput: {}
    },
    onCompleted: result => {
      if (result.getPublicProducts?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getPublicProducts?.message ||
            'Error al cargar datos de la sucursal',
          'error'
        )
      }
    }
  })

  return {
    data,
    loading
  }
}
