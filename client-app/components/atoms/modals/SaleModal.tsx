import { useState } from 'react'
import { Button } from '@nextui-org/react'
import { MyModal } from './MyModal'
import SalePaymentMethod from '@/components/molecules/SalePaymentMethod'
import CashPaymentMethod from '@/components/molecules/CashPaymentMethod'

interface SaleModalProps {
  isOpen: boolean
  onClose: () => void
  total: number
}

function SaleModal({ isOpen, onClose, total }: SaleModalProps) {
  const [currentStep, setCurrentStep] = useState<number>(1)
  const [cash, setCash] = useState<number>(0)
  const [change, setChange] = useState<number>(0)
  return (
    <MyModal
      isOpen={isOpen}
      onClose={onClose}
      hideCloseButton={false}
      size="2xl"
    >
      <section className="flex flex-col">
        <h1 className="p-4 text-center text-2xl font-bold text-gray-500">
          Recibo de venta
        </h1>
        <hr className="border-1" />
        <div className="flex items-center justify-center space-x-3">
          <h2 className="text-xl font-bold text-gray-500">Total a pagar:</h2>
          <h3 className="text-3xl font-semibold text-gray-500">Bs. {total}</h3>
        </div>
        {currentStep === 1 ? (
          <SalePaymentMethod
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        ) : currentStep === 2 ? (
          <CashPaymentMethod
            total={total}
            cash={cash}
            setCash={setCash}
            change={change}
            setChange={setChange}
          />
        ) : (
          <div>Step 3</div>
        )}
        <div className="flex justify-end space-x-4 p-4">
          <Button
            className="h-full bg-secondary text-lg font-bold text-white"
            type="submit"
          >
            Generar recibo
          </Button>
          <Button
            variant="flat"
            color="danger"
            className="h-full text-lg font-bold"
          >
            Cancelar
          </Button>
        </div>
      </section>
    </MyModal>
  )
}

export default SaleModal
