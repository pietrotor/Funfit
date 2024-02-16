import { useState } from 'react'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import {
  CreateAddressInput,
  CreateCustomerInput,
  StatusEnum,
  usePublicCreateAddressMutation,
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
        if (result.publicCreateCustomer?.status === StatusEnum.OK) {
          localStorage.setItem(
            CUSTOMER_ID,
            JSON.stringify(result.publicCreateCustomer.data?.id)
          )
          callback()
        }
      },
      onError: () => {
        showSuccessToast('Error en el registro de datos', 'error')
      }
    })
  }
  return {
    handleCreatePublicCustomer
  }
}

export function useCustomPublicCreateAddress() {
  const [createAddressInput] = usePublicCreateAddressMutation()
  const [addressId, setAddressId] = useState<string>('')

  const handleCreatePublicAddress = (data: CreateAddressInput, callback: () => void) => {
    createAddressInput({
      variables: {
        createAddressInput: {
          customerId: data.customerId,
          latitude: data.latitude,
          longitude: data.longitude,
          detail: data.detail
        }
      },
      onCompleted: result => {
        if (result.publicCreateAddress?.status === StatusEnum.OK) {
          showSuccessToast('Dirección registrada correctamente', 'success')
          setAddressId(result.publicCreateAddress.data?.id)
          callback()
        }
      },
      onError: () => {
        showSuccessToast('Error en el registro de datos', 'error')
      }
    })
  }
  return {
    handleCreatePublicAddress,
    addressId
  }
}
