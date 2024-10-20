import React, { useState } from 'react'
import { Image } from '@nextui-org/react'
import { onImagePreviewError } from '@/helpers/image.helper'

type TSizes = 'sm' | 'md' | 'lg' | 'none' | 'full'

type TImageProps = {
  src: string
  alt: string
  removeWrapper?: boolean
  className?: React.ComponentProps<'div'>['className']
  radius?: TSizes
  loading?: 'eager' | 'lazy'
}

const Images: React.FC<TImageProps> = ({
  src,
  alt,
  removeWrapper = true,
  className = '',
  radius = 'none',
  loading
}) => {
  const [imgSrc, setImgSrc] = useState(src)
  return (
    <Image
      alt={`${alt}`}
      className={`${className}`}
      removeWrapper={removeWrapper}
      src={`${imgSrc}`}
      radius={`${radius}`}
      {...(!removeWrapper && { loading })}
      onErrorCapture={e => setImgSrc(onImagePreviewError(e as any))}
    />
  )
}

export default Images
