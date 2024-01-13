import { Button } from '@nextui-org/react'
import React from 'react'

type CashPaymentMethodProps = {
  total: number
  cash: number
  change: number
  setCash: (cash: number) => void
  setChange: (change: number) => void
}

function CashPaymentMethod({
  total,
  cash,
  change,
  setCash,
  setChange
}: CashPaymentMethodProps) {
  const handleCash = (cash: number) => {
    if (cash >= total) {
      setChange(cash - total)
    } else {
      setCash(cash)
    }
    console.log('Cash', cash)
  }

  return (
    <section className="p-4">
      <div className="flex justify-between">
        <p className="text-lg">{cash >= total ? 'Cambio' : 'Por pagar'}</p>
        <p className="text-lg text-primary">
          Bs. {cash >= total ? change : cash - total}
        </p>
      </div>
      <div>
        <div className="flex justify-between">
          <p className="text-lg">Efectivo</p>
          <input
            name="cash"
            className="transition-border ms-2 w-full border-b-2 outline-none delay-100 duration-500 focus:border-secondary"
            onChange={e => handleCash(parseFloat(e.target.value))}
          />
        </div>
        <div>
          <p className="text-lg">Opciones rápidas</p>
          <div className="flex justify-between">
            <Button className="w-1/2 rounded-md bg-secondary text-white">
              Bs. 100
            </Button>
            <Button className="w-1/2 rounded-md bg-secondary text-white">
              Bs. 200
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CashPaymentMethod
