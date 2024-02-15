import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@nextui-org/react'
import { useForm } from 'react-hook-form'
import Stepper, { Step } from '@/components/molecules/Stepper/stepper'
import RegisterForm from '@/components/molecules/RegisterForm/registerForm'
import SendOrder from '@/components/molecules/SendOreder/sendOrder'
import PaymentMethod from '@/components/molecules/PaymentMethod/paymentMethod'
import SideCart from '@/components/molecules/SideCart/sideCart'
import { useCustomPublicCreateCurstomer } from '@/hooks/UseCustomerQuery'
import { CUSTOMER_ID } from '@/lib/constants'
import { useGetPublicCustomerByIdLazyQuery } from '@/graphql/graphql-types'
import { TCustomer } from '@/interfaces/TData'

export type TUserInfo = {
  name: string
  lastName: string
  email: string
  phone: string
}

function OrderLayout() {
  const steps: Step[] = [
    {
      label: 'Datos de contacto',
      isActive: 'active'
    },
    {
      label: 'Envío',
      isActive: 'inactive'
    },
    {
      label: 'Método de pago',
      isActive: 'inactive'
    }
  ]

  const [currentStep, setCurrentStep] = useState<Step[]>(steps)
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0)
  const [userInfo, setUserInfo] = useState<TUserInfo>({} as TUserInfo)
  const { control, handleSubmit, watch, setValue } = useForm()
  const { handleCreatePublicCustomer } = useCustomPublicCreateCurstomer()
  const [activeDirection, setActiveDirection] = useState({
    location: {
      lat: -17.414,
      lng: -66.1653
    },
    address: ''
  })
  // console.log(activeDirection)
  const send = useRef({
    type: '',
    address: ''
  })
  const customerId = localStorage.getItem(CUSTOMER_ID)?.replace(/^"|"$/g, '')
  console.log(customerId)
  const [getCustomer, { data }] = useGetPublicCustomerByIdLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      getPublicCustomerByIdId: customerId
    },
    onCompleted: data => {
      setValue('name', data?.getPublicCustomerById?.data?.name)
      setValue('lastName', data?.getPublicCustomerById?.data?.lastName)
      setValue('email', data?.getPublicCustomerById?.data?.email)
      setValue('phone', data?.getPublicCustomerById?.data?.phone)
    },
    onError: error => {
      console.log(error)
    }
  })

  useEffect(() => {
    if (customerId) {
      getCustomer()
    }
  }, [])

  const goToStep = (stepIndex: number) => {
    const updatedSteps = [...currentStep]

    updatedSteps.forEach((step, index) => {
      if (index === stepIndex) {
        step.isActive = 'active'
      } else if (index < stepIndex) {
        step.isActive = 'completed'
      } else {
        step.isActive = 'inactive'
      }
    })

    setCurrentStep(updatedSteps)
    setCurrentStepIndex(stepIndex)
  }

  const handleCustomerCreated = () => {
    goToStep(currentStepIndex + 1)
  }

  const onSubmit = () => {
    if (currentStepIndex === 0) {
      setUserInfo({
        name: watch('name'),
        lastName: watch('lastName'),
        email: watch('email'),
        phone: watch('phone')
      })
      handleCreatePublicCustomer(userInfo, handleCustomerCreated)
    }
  }
  return (
    <div className="mx-6 flex min-h-screen items-center justify-between space-x-4 md:px-7">
      <form
        className="flex w-full flex-col  shadow-2xl lg:w-2/3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-24 rounded-md bg-white shadow-lg">
          <Stepper steps={currentStep} />
        </div>
        <div className="h-72 rounded-md border bg-white shadow-lg">
          {currentStep[0].isActive === 'active' ? (
            <RegisterForm control={control} />
          ) : currentStep[1].isActive === 'active' ? (
            <SendOrder
              activeDirection={activeDirection.location}
              changeDirection={value => setActiveDirection(value)}
              send={send}
              customer={data?.getPublicCustomerById?.data as TCustomer}
            />
          ) : (
            <PaymentMethod
              userInfo={userInfo}
              activeDirection={activeDirection}
              send={send}
            />
          )}
        </div>
        <div className="flex items-center justify-around  bg-white py-7">
          <Button
            onClick={() => goToStep(currentStepIndex - 1)}
            color="primary"
            className="w-1/4"
          >
            Atrás
          </Button>
          <Button color="primary" className="w-1/4" type="submit">
            Siguiente
          </Button>
        </div>
      </form>
      <div className="hidden flex-col justify-start shadow-2xl md:w-1/3 lg:flex">
        <div className="flex h-24 items-center justify-center border-b-2 bg-white shadow-md ">
          <h3 className="text-gray-500">Tus compras</h3>
        </div>
        <div className=" max-h-96  overflow-y-auto scrollbar-hide">
          <SideCart />
        </div>
      </div>
    </div>
  )
}

export default OrderLayout
