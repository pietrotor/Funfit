import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  CreateCustomerInput,
  StatusEnum,
  usePublicCreateCustomerMutation
} from '@/graphql/graphql-types'
import { CUSTOMER_ID } from '@/lib/constants'

export function useCustomPublicCreateCurstomer() {
  const [createCustomerInput] = usePublicCreateCustomerMutation()

  const handleCreatePublicCustomer = (data: CreateCustomerInput, callback: () => void) => {
    createCustomerInput({
      variables: {
        createCustomerInput: {
          name: data.name,
          lastName: data.lastName,
          phone: data.phone,
          email: data.email
        }
      },
      onCompleted: result => {
        if (result.publicCreateCustomer?.status === StatusEnum.ERROR) {
          showSuccessToast(
            result.publicCreateCustomer.message ||
              'Error en el registro de datos',
            'error'
          )
        }
        if (result.publicCreateCustomer?.status === StatusEnum.OK) {
          localStorage.setItem(
            CUSTOMER_ID,
            JSON.stringify(result.publicCreateCustomer.data?.id)
          )
          callback()
        }
      }
    })
  }
  return {
    handleCreatePublicCustomer
  }
}
