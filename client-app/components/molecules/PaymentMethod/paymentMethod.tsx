import React, { useState } from 'react'
import { Accordion, AccordionItem, Button, Image } from '@nextui-org/react'
import Link from 'next/link'

type Props = {
  goToStep: (e: number) => void
  currentStepIndex: number
}

function PaymentMethod({ goToStep, currentStepIndex }: Props) {
  const [selectedKeys, setSelectedKeys] = useState(false)

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
        <Link
          href="/gratitudePage"
          className="w-1/4 rounded-xl bg-primary py-2 text-white"
        >
          Finalizar
        </Link>
      </div>
    </div>
  )
}

export default PaymentMethod
