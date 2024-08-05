import { Image } from '@nextui-org/react'
import React from 'react'
import { ProductTypeEnum } from '@/graphql/graphql-types'

type ProductLabelProps = {
  name: string
  image?: string | null
  code: string
  type?: ProductTypeEnum
}

export const ProductLabel = ({
  code,
  name,
  type,
  image
}: ProductLabelProps) => {
  return (
    <div className="flex gap-2">
      <Image
        alt="image"
        width={80}
        src={
          image === 'null' || !image
            ? 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'
            : image
        }
      />
      <div className="flex flex-col justify-center align-baseline">
        <p className="text-left text-base font-semibold">{name}</p>
        <p className="text-left font-normal text-gray-500">
          Código: <span className="font-bold">{code}</span>
        </p>
        {type && (
          <p className="text-left font-normal text-gray-500">
            Tipo de producto:{' '}
            <span className="font-bold">
              {type === ProductTypeEnum.COMBO ? 'Combo' : 'Simple'}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}
