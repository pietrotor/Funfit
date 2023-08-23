import React from 'react'
import Image from 'next/image'

const Portada = () => {
  return (
    <div className='h-96 relative overflow-hidden '>
      <Image
        src="/devImages/banner.jpg"
        alt="Banner de la empresa"
        width={1920}
        height={600}
        style={{ objectFit: 'cover', height: '100%' }}
      />
      <div className='absolute bg-primary/20 top-0 left-0 h-96 w-full' >
      </div>
    </div>
  )
}

export default Portada
