import React from 'react'
import { Accordion, AccordionItem, Button, Image } from '@nextui-org/react'
export type activeDirection = {
  location: {
    lat: number
    lng: number
  }
  address: string
}
type PaymentMethodProps = {
  paymentMethod: boolean
  setPaymentMethod: (paymentMethod: boolean) => void
  isDelivery: boolean
}

function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
  isDelivery
}: PaymentMethodProps) {
  const download = (filename: string, content: any) => {
    try {
      fetch(content)
        .then(response => response.blob())
        .then(blob => {
          const url = window.URL.createObjectURL(blob)
          const a = document.createElement('a')
          a.style.display = 'none'
          a.href = url
          a.download = filename

          document.body.appendChild(a)
          a.click()

          window.URL.revokeObjectURL(url)
          document.body.removeChild(a)
        })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-5 p-2 text-center md:p-5">
      <div className="overflow-y-auto md:px-8">
        <h2 className="text-gray-500 md:pb-6">Datos de contacto</h2>
        <Accordion
          selectedKeys={paymentMethod ? ['qr'] : ['cash']}
          onSelectionChange={() => setPaymentMethod(!paymentMethod)}
        >
          <AccordionItem
            key="qr"
            aria-label="Recoger de la sucursal"
            title="Pago mediante código QR"
          >
            <div className="flex w-full flex-col items-center justify-center">
              <Image
                id="qr"
                alt="QR"
                src="/common/qr-funfit.jpg"
                className="w-[150px] md:w-[400px]"
                removeWrapper
              />
              <Button
                onClick={() =>
                  download(
                    'qr.png',
                    (document.getElementById('qr') as HTMLImageElement)?.src
                  )
                }
                size="sm"
                variant="faded"
              >
                Descargar QR
              </Button>
              <p>
                Una vez realizado tu pago por Qr, es necesario que nos envíes el
                comprobante a nuestro WhatsApp
              </p>
            </div>
          </AccordionItem>
          <AccordionItem
            key="cash"
            aria-label="Paga al recibir tu pedido"
            title="Paga al recibir tu pedido"
          >
            Paga en efectivo{' '}
            {isDelivery
              ? 'cuando tu pedido te sea entregado.'
              : 'cuando vengas a recoger tu pedido.'}{' '}
            Te estaremos contactando a través de Whatsapp para confirmar la
            dirección. Luego, enviaremos tu pedido con uno de nuestros deliverys
            y, cuando llegue, podrás pagar en ese momento.
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  )
}

export default PaymentMethod
