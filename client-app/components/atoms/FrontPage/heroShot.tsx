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
    </div>
  )
}

export default HeroShot
