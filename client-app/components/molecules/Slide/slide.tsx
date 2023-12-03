import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import Images from '@/components/atoms/Image/Image'

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
      showStatus={true}
      statusFormatter={(current: number, total: number) =>
        `${current} de ${total}`
      }
      showArrows={true}
      className="rounded-lg"
    >
      {images.map((image, index) => (
        <div key={index} className="h-64 rounded-lg">
          <Images
            src={image}
            alt="image"
            radius="md"
            className="h-full object-cover "
          />
        </div>
      ))}
    </Carousel>
  )
}

export default Slide
