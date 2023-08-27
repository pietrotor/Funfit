import React from 'react'

const Portada = () => {
  return (
    <div className='h-96 relative overflow-hidden '>
      <img src='/devImages/banner.jpg' alt='Banner de la empresa' className='w-full h-96 object-cover'/>
      <div className='absolute bg-primary/20 top-0 left-0 h-96 w-full' >
      </div>
    </div>
  )
}

export default Portada
