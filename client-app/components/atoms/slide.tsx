import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import { Image } from '@nextui-org/react'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type TProps = {
  images: string[]
  infiniteLoop?:boolean
  showArrows?:boolean
  showStatus?:boolean
  showThumbs?:boolean 
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
}

const Slide: React.FC<TProps> = ({
  images,
  infiniteLoop = true,
  showArrows = false,
  showStatus = false,
  showThumbs = false,
  radius = 'lg'
}) => {
  return (
    <Carousel
      autoPlay
      interval={3000}
      infiniteLoop={infiniteLoop}
      showThumbs={showThumbs}
      showStatus={showStatus}
      showArrows={showArrows}
      className="rounded-lg"
    >
      {images.map((image, index) => (
        <div key={index} className="h-64 rounded-lg">
          <Image
            radius={radius}
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
