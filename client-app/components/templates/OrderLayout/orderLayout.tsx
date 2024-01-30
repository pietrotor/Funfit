import React, { useState } from 'react'
import Stepper, { Step } from '@/components/molecules/Stepper/stepper'
import RegisterForm from '@/components/molecules/RegisterForm/registerForm'
import SendOrder from '@/components/molecules/SendOreder/sendOrder'
import PaymentMethod from '@/components/molecules/PaymentMethod/paymentMethod'
import SideCart from '@/components/molecules/SideCart/sideCart'

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

  return (
    <div className="mx-6 flex min-h-screen items-center justify-between space-x-4 md:px-7">
      <div className="flex w-full flex-col shadow-2xl lg:w-2/3">
        <div className="h-24 rounded-md bg-white shadow-lg">
          <Stepper steps={currentStep} />
        </div>
        <div className="rounded-md border bg-white shadow-lg">
          {currentStep[0].isActive === 'active' ? (
            <RegisterForm
              goToStep={goToStep}
              currentStepIndex={currentStepIndex}
            />
          ) : currentStep[1].isActive === 'active' ? (
            <SendOrder
              goToStep={goToStep}
              currentStepIndex={currentStepIndex}
            />
          ) : (
            <PaymentMethod
              goToStep={goToStep}
              currentStepIndex={currentStepIndex}
            />
          )}
        </div>
      </div>
      <div className="hidden flex-col justify-start shadow-2xl md:w-1/3 lg:flex">
        <div className="flex h-24 items-center justify-center border-b-2 bg-white shadow-md ">
          <h3 className="text-gray-500">Tus compras</h3>
        </div>
        <div className=" overflow-y-auto  max-h-96">
          <SideCart />
        </div>
      </div>
    </div>
  )
}

export default OrderLayout
