import React from 'react'
import Images from '../Image/Image'

const HeroShot = () => {
  return (
    <div className='h-96 relative overflow-hidden'>
      <Images src='https://thumbs.dreamstime.com/z/productos-de-la-panader%C3%ADa-31282431.jpg?w=768' alt='Banner de la empresa' className='w-full h-96 object-cover '/>
      <div className='absolute bg-primary/20 top-0 left-0 h-96 w-full' >
      </div>
    </div>
  )
}

export default HeroShot
