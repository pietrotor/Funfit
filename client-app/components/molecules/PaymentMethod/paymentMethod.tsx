import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { Accordion, AccordionItem, Button, Image } from '@nextui-org/react'
import { useAppSelector } from '@/store/index'
import { TUserInfo } from '@/components/templates/OrderLayout/orderLayout'
export type activeDirection = {
  location: {
    lat: number
    lng: number
  }
  address: string
}
type Props = {
  goToStep: (e: number) => void
  currentStepIndex: number
  userInfo: TUserInfo
  activeDirection: activeDirection
  send: any
}

function PaymentMethod({ goToStep, currentStepIndex, userInfo, activeDirection, send }: Props) {
  const [selectedKeys, setSelectedKeys] = useState(false)
  const cartItems = useAppSelector(state => state.cartReducer.cartItems)
  const subTotal = useAppSelector(state => state.cartReducer.cartSubTotal)
  const router = useRouter()

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

  const handleNotification = () => {
    const message = `El pedido consta de:\n${cartItems
      .map(
        item =>
          ` ${item.quantity} unidades de ${item.productName} a ${
            item.price
          } Bs. con un total de ${item.price * item.quantity}`
      )
      .join('\n')}\n\nSubtotal: ${subTotal} Bs.\n\nInformación de contacto:\n* Cliente: ${userInfo.name} ${userInfo.lastName}\n* Teléfono: ${userInfo.phone}\n* Correo: ${userInfo.email}\n ${send.current.type !== 'Entrega a domicilio' ? `\nTipo de entrega:\n ${send.current.type}\n Ubicación:\n ${send.current.address} \n\n*Por favor, confirmar la dirección y el pedido. Gracias!` : `\nUbicación: \n https://maps.google.com/?q=${activeDirection.location.lat},${activeDirection.location.lng} \n Detalles: \n ${send.current.address} \n*Por favor, confirmar la dirección y el pedido. Gracias!`}`

    const whatsappLink = `https://api.whatsapp.com/send?phone=76475010&text=${encodeURIComponent(
      message
    )}`
    window.open(whatsappLink, '_blank')
    router.push('/gratitudePage')
  }

  return (
    <div className="flex h-full w-full flex-col justify-between space-y-5 p-5 text-center">
      <div className="overflow-y-auto px-8">
        <h2 className="text-gray-500 md:pb-6">Datos de contacto</h2>
        <Accordion
          selectedKeys={selectedKeys ? ['1'] : ['2']}
          onSelectionChange={() => setSelectedKeys(!selectedKeys)}
        >
          <AccordionItem
            key="1"
            aria-label="Recoger de la sucursal"
            title="Pago mediante código QR"
          >
            <div className="flex w-full flex-col items-center justify-center">
              <Image
                id="qr"
                alt="QR"
                src="https://blog.tcea.org/wp-content/uploads/2022/05/qrcode_tcea.org-1.png"
                className="w-1/5 "
                removeWrapper
              />
              <Button
                onClick={() =>
                  download(
                    'qr.png',
                    (document.getElementById('qr') as HTMLImageElement)?.src
                  )
                }
              >
                Descargar QR
              </Button>
            </div>
          </AccordionItem>
          <AccordionItem
            key="2"
            aria-label="Paga al recibir tu pedido"
            title="Paga al recibir tu pedido"
          >
            Te estaremos contactando a través de Whatsapp para confirmar la
            dirección. Luego, enviaremos tu pedido con uno de nuestros deliverys
            y, cuando llegue, podrás pagar en ese momento.
          </AccordionItem>
        </Accordion>
      </div>
      <div className="flex items-center justify-between px-8 ">
        <Button
          onClick={() => goToStep(currentStepIndex - 1)}
          color="primary"
          className="w-1/4"
        >
          Atrás
        </Button>
        <div className="flex w-1/6 justify-between">
          <Button color="primary" onClick={handleNotification} className='w-full'>
          Finalizar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default PaymentMethod
