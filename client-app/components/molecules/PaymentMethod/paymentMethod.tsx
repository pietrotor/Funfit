import React, { useState } from 'react'
import { Button, Accordion, AccordionItem, Image } from '@nextui-org/react'

type Props = {
  goToStep: (e: number) => void;
  currentStepIndex: number;
};

function PaymentMethod ({ goToStep, currentStepIndex }: Props) {
  const [selectedKeys, setSelectedKeys] = useState(false)

  const download = (filename: string, content: any) => {
    try {
      fetch(content)
        .then((response) => response.blob())
        .then((blob) => {
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
    <div className='h-full w-full p-5 flex flex-col justify-between text-center space-y-5'>
      <div className='px-8 overflow-y-auto'>
        <h2 className='text-gray-500 md:pb-6'>Datos de contacto</h2>
        <Accordion
          selectedKeys={selectedKeys ? ['1'] : ['2']}
          onSelectionChange={() => setSelectedKeys(!selectedKeys)}
        >
          <AccordionItem
            key='1'
            aria-label='Recoger de la sucursal'
            title='Pago mediante código QR'
          >
            <div className='w-full flex flex-col justify-center items-center'>
              <Image
                id='qr'
                alt='QR'
                src='https://blog.tcea.org/wp-content/uploads/2022/05/qrcode_tcea.org-1.png'
                className='w-1/5 '
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
            key='2'
            aria-label='Paga al recibir tu pedido'
            title='Paga al recibir tu pedido'
          >
            Te estaremos contactando a través de Whatsapp para confirmar la dirección. Luego, enviaremos tu pedido con uno de nuestros deliverys y, cuando llegue, podrás pagar en ese momento.
          </AccordionItem>
        </Accordion>
      </div>
      <div className='flex justify-between px-8 items-center '>
        <Button
          onClick={() => goToStep(currentStepIndex - 1)}
          color='primary'
          className='w-1/4'
        >
          Atrás
        </Button>
          <a href='/gratitudePage' className='w-1/4 bg-primary py-2 rounded-xl text-white'>
            Finalizar
          </a>
      </div>
    </div>
  )
}

export default PaymentMethod
