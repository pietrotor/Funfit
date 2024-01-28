import React from 'react'
import Images from '../Image/Image'

const HeroShot = () => {
  return (
    <div className="relative h-[50vh] overflow-hidden">
      <Images
        src="https://scontent-lim1-1.xx.fbcdn.net/v/t39.30808-6/392938848_306867312054254_4763354276949693316_n.png?_nc_cat=101&ccb=1-7&_nc_sid=783fdb&_nc_ohc=FeB87QzeiDMAX9JoqfV&_nc_ht=scontent-lim1-1.xx&oh=00_AfC5_Nyv55CuLAyHP84tXZwNeFy7yBOMd9JAFTlMYvdeDg&oe=65BB438D"
        alt="Banner de la empresa"
        className="h-full w-full object-cover "
      />
      <div className="absolute left-0 top-0 h-96 w-full bg-primary/20"></div>
    </div>
  )
}

export default HeroShot
