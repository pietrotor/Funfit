import React from 'react'
import Images from '../Image/Image'

const HeroShot = () => {
  return (
    <div className="relative h-96 overflow-hidden">
      <Images
        src="https://thumbs.dreamstime.com/z/productos-de-la-panader%C3%ADa-31282431.jpg?w=768"
        alt="Banner de la empresa"
        className="h-96 w-full object-cover "
      />
      <div className="absolute left-0 top-0 h-96 w-full bg-primary/20"></div>
    </div>
  )
}

export default HeroShot
