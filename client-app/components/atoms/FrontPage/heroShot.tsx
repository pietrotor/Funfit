import React from 'react'
import Images from '../Image/Image'

const HeroShot = () => {
  return (
    <div className="relative h-[50vh] overflow-hidden">
      <Images
        src="/common/portada-funfit.png"
        alt="Banner de la empresa"
        className="h-full w-full object-cover "
      />
      <div className="absolute left-0 top-0 h-96 w-full bg-primary/20"></div>
    </div>
  )
}

export default HeroShot
