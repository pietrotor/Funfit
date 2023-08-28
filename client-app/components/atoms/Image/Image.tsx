import React from 'react'
import { Image } from '@nextui-org/react'

type TSizes = 'sm' | 'md' | 'lg' | 'none' | 'full'

type TImageProps = {
    src: string,
    alt: string,
    removeWrapper?: boolean,
    className?: React.ComponentProps<'div'>['className'],
    radius?: TSizes;
}

const Images : React.FC<TImageProps> = ({
  src,
  alt,
  removeWrapper = true,
  className = '',
  radius = 'none'
}) => {
  return (
    <Image
    alt={`${alt}`}
    className={`${className}`}
    removeWrapper= {removeWrapper}
    src={`${src}`}
    radius={`${radius}`}
  />
  )
}

export default Images
