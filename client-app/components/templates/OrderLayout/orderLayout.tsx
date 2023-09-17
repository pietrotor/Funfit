import React, { useState } from 'react'
import Stepper, { Step } from '@/components/molecules/Stepper/stepper'
import RegisterForm from '@/components/molecules/RegisterForm/registerForm'
import SendOrder from '@/components/molecules/SendOreder/sendOrder'
import PaymentMethod from '@/components/molecules/PaymentMethod/paymentMethod'
import SideCart from '@/components/molecules/SideCart/sideCart'

function OrderLayout () {
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
    <div className='flex items-center min-h-screen space-x-4 mx-6 md:px-7 justify-between'>
      <div className='lg:w-2/3 w-full flex flex-col'>
        <div className='h-24 bg-white shadow-lg border rounded-md'>
          <Stepper steps={currentStep} />
        </div>
        <div className='bg-white h-96 shadow-lg border rounded-md'>
          {currentStep[0].isActive === 'active' ? <RegisterForm goToStep={ goToStep } currentStepIndex={currentStepIndex} /> : currentStep[1].isActive === 'active' ? <SendOrder goToStep={ goToStep } currentStepIndex={currentStepIndex}/> : <PaymentMethod goToStep={ goToStep } currentStepIndex={currentStepIndex}/>}
        </div>

      </div>
     <div className='lg:flex flex-col md:w-1/3 hidden'>
     <div className='h-24 bg-white flex items-center justify-center border-b-2 shadow-md '>
        <h3 className='text-gray-500'>Tus compras</h3>
      </div>
      <div className='h-96  overflow-y-auto '>
          <SideCart />
      </div>
     </div>
    </div>
  )
}

export default OrderLayout
