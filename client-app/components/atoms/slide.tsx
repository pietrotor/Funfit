import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Image } from '@nextui-org/react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type TProps = {
  images: string[]
}

const Slide: React.FC<TProps> = ({ images }) => {
  return (
    <Carousel
      autoPlay
      interval={3000}
      infiniteLoop={true}
      showThumbs={false}
      showStatus={false}
      showArrows={false}
      className="rounded-lg"
    >
      {images.map((image, index) => (
        <div key={index} className="h-64 rounded-lg">
          <Image
            src={image}
            alt="image"
            removeWrapper
            className="h-full object-cover "
          />
        </div>
      ))}
    </Carousel>
  )
}

export default Slide
