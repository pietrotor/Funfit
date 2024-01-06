import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import { StatusEnum, useGetBranchByIdQuery } from '@/graphql/graphql-types'

export const UseGetBranchByIdQuery = (id: string) => {
  const { data } = useGetBranchByIdQuery({
    fetchPolicy: 'network-only',
    variables: {
      getBranchByIdId: id
    },
    onCompleted: result => {
      if (result.getBranchById?.status === StatusEnum.ERROR) {
        showSuccessToast(
          result.getBranchById?.message ||
            'Error al cargar datos de la sucursal',
          'error'
        )
      }
    }
  })

  return {
    data
  }
}
