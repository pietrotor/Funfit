import React from 'react'
import Images from '../Image/Image'

const HeroShot = () => {
  return (
    <div className="relative h-[50vh] overflow-hidden">
      <Images
        src="/common/portada-funfit.png"
        alt="Banner de la empresa"
        className="hidden h-full w-full object-cover md:block"
      />
      <Images
        src="/common/portada-mobile.jpg"
        alt="Banner de la empresa"
        className="block h-full w-full object-cover md:hidden"
      />
    </div>
  )
}

export default HeroShot
