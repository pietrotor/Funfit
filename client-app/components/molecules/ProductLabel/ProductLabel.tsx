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
    <div className="flex min-w-0 gap-2">
      <Image
        alt={name}
        width={56}
        className="h-14 w-14 min-w-14 shrink-0 rounded-md object-cover"
        src={
          image === 'null' || !image ? 'https://static.vecteezy.com/system/resources/thumbnails/004/141/669/small/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg' : image
        }
      />
      <div className="flex min-w-0 flex-col justify-center align-baseline">
        <p className="line-clamp-2 text-left text-sm font-semibold md:text-base">
          {name}
        </p>
        <p className="truncate text-left text-sm font-normal text-gray-500">
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
