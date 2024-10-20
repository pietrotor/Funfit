// import {
//   Badge,
//   Card,
//   CardBody,
//   CardFooter,
//   Chip,
//   Image
// } from '@nextui-org/react'
// import { SkeletonCard } from './SkeletonCard'
// import { DistributorSaleProduct } from '@/graphql/graphql-types'

// export type TPointOfSaleCardProps = {
//   product: DistributorSaleProduct
//   quantity: number
//   isLoading?: boolean
//   handleSelected: (id: string) => void
// }

// function DistributorSaleProductCard({
//   product,
//   quantity,
//   isLoading = false,
//   handleSelected
// }: TPointOfSaleCardProps) {
//   return (
//     <>
//       {!isLoading ? (
//         <Badge content={quantity} color="secondary" size="lg" variant="shadow">
//           <div className="h-full w-full">
//             <Card
//               shadow="sm"
//               isPressable
//               className="relative h-80 w-full border-1 border-transparent transition-all duration-700 ease-in-out hover:border-secondary hover:shadow-lg "
//               onPress={() => {
//                 product.stock &&
//                   quantity < product.stock &&
//                   quantity + 1 >= 1 &&
//                   handleSelected(product.productId)
//               }}
//             >
//               <CardBody className="h-full p-0">
//                 <Image
//                   alt="Product image"
//                   removeWrapper
//                   src={
//                     product.product?.image ||
//                     'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
//                   }
//                   className="h-full w-full object-cover"
//                 />
//               </CardBody>
//               <Chip
//                 className={`absolute left-1/2 top-52 z-10 -translate-x-1/2 -translate-y-1/4 transform  ${
//                   product.stock === 0 ? 'bg-gray-300' : 'bg-primary/90'
//                 } text-white`}
//                 variant="solid"
//                 size="sm"
//               >
//                 {product.stock === 0 ? 'Sin Stock' : `Inv. ${product.stock}`}
//               </Chip>
//               <CardFooter className="flex h-32 flex-col justify-around rounded-large">
//                 <p className="w-full text-left text-sm font-bold text-secondary md:text-xl">
//                   {product.product?.name}
//                 </p>
//                 <p className="w-full overflow-hidden text-left text-[8px] text-gray-500 md:text-xs">
//                   {product.product?.description}
//                 </p>
//                 <p className="w-full text-right text-sm font-bold text-secondary md:text-xl">
//                   Bs. {product.price}
//                 </p>
//               </CardFooter>
//             </Card>
//           </div>
//         </Badge>
//       ) : (
//         <SkeletonCard />
//       )}
//     </>
//   )
// }
// export default DistributorSaleProductCard

import { Badge, Button, Image } from '@nextui-org/react'
import React, { SetStateAction } from 'react'
import Counter from '../Counter'
import { TPointOfSaleData } from '../../../pages/administration-panel/point-of-sale'
import { TProductBranchData } from '@/interfaces/TData'
import { ProductTypeEnum } from '@/graphql/graphql-types'
import { DEFAULT_IMAGE } from '@/lib/constants'
import IconSelector from '@/components/atoms/IconSelector'
import { useProductHandler } from '@/hooks/useProductsHandler'

export type TPointOfSaleCardProps = {
  product: TProductBranchData
  quantity: number
  isLoading?: boolean
  handleSelected: (id: string) => void
  selectedProducts: TPointOfSaleData
  setSelectedProducts: React.Dispatch<SetStateAction<TPointOfSaleData>>
}

function DistributorSaleProductCard({
  product,
  quantity,
  isLoading = false,
  handleSelected,
  selectedProducts,
  setSelectedProducts
}: TPointOfSaleCardProps) {
  const { decrement, increment } = useProductHandler({
    item: product,
    selectedProducts,
    setSelectedProducts
  })
  const handleClick = () => {
    if (quantity) return
    ;((product?.stock && quantity < product?.stock && quantity + 1 >= 1) ||
      product.product?.type === ProductTypeEnum.COMBO) &&
      handleSelected(product.id)
  }
  return (
    <Badge
      content={quantity}
      color="secondary"
      size="lg"
      variant="shadow"
      className="hidden"
    >
      <div
        className=" flex w-full flex-col justify-between rounded-lg bg-white p-2 shadow transition-all duration-300 hover:cursor-pointer hover:shadow-xl"
        onClick={handleClick}
      >
        <div className="flex flex-col gap-2 lg:flex-row">
          <div className="m-auto w-full lg:m-0 lg:w-[100px]">
            <Image
              alt="Product image"
              removeWrapper
              src={product.product?.image || DEFAULT_IMAGE}
              className="m-auto aspect-square w-full rounded border-b object-cover object-center"
            />
          </div>
          <div className="flex-1 ">
            <h4 className="text-secondary">{product.product?.name}</h4>
            <p className="text-clamp-2  mt-1 text-xs text-gray-400 ">
              {product.product?.description}
            </p>
            <p className="pt-3 text-sm font-semibold text-gray-400">
              {product?.stock} Disponible
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-1 pt-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h5 className="text-xl font-bold text-primary">
              {product?.price?.toFixed(2)?.toLocaleString()}{' '}
              <span className="text-sm ">Bs.</span>
            </h5>
          </div>
          {quantity ? (
            <Counter
              productId={product.productId}
              quantity={quantity || 0}
              stock={product?.stock}
              decrement={() => {
                quantity && quantity > 1 && decrement(product.productId)
              }}
              increment={() => {
                quantity < (product?.stock || 0) && increment(product.productId)
              }}
            />
          ) : (
            <Button
              variant="solid"
              color="primary"
              size="sm"
              onClick={handleClick}
              isDisabled={!product.stock}
            >
              <IconSelector name="Plus" width="w-3" />
              <span className="font-bold">Agregar</span>
            </Button>
          )}
        </div>
      </div>
    </Badge>
  )
}
export default DistributorSaleProductCard
