import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image
} from '@nextui-org/react'
import { SkeletonCard } from './SkeletonCard'
import { DistributorSaleProduct } from '@/graphql/graphql-types'

export type TPointOfSaleCardProps = {
  product: DistributorSaleProduct
  quantity: number
  isLoading?: boolean
  handleSelected: (id: string) => void
}

function DistributorSaleProductCard({
  product,
  quantity,
  isLoading = false,
  handleSelected
}: TPointOfSaleCardProps) {
  return (
    <>
      {!isLoading ? (
        <Badge content={quantity} color="secondary" size="lg" variant="shadow">
          <div className="h-full w-full">
            <Card
              shadow="sm"
              isPressable
              className="relative h-80 w-full border-1 border-transparent transition-all duration-700 ease-in-out hover:border-secondary hover:shadow-lg "
              onPress={() => {
                product.stock &&
                  quantity < product.stock &&
                  quantity + 1 >= 1 &&
                  handleSelected(product.productId)
              }}
            >
              <CardBody className="h-full p-0">
                <Image
                  alt="Product image"
                  removeWrapper
                  src={
                    product.product?.image ||
                    'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
                  }
                  className="h-full w-full object-cover"
                />
              </CardBody>
              <Chip
                className={`absolute left-1/2 top-52 z-10 -translate-x-1/2 -translate-y-1/4 transform  ${
                  product.stock === 0 ? 'bg-gray-300' : 'bg-primary/90'
                } text-white`}
                variant="solid"
                size="sm"
              >
                {product.stock === 0 ? 'Sin Stock' : `Inv. ${product.stock}`}
              </Chip>
              <CardFooter className="flex h-32 flex-col justify-around rounded-large">
                <p className="w-full text-left text-sm font-bold text-secondary md:text-xl">
                  {product.product?.name}
                </p>
                <p className="w-full overflow-hidden text-left text-[8px] text-gray-500 md:text-xs">
                  {product.product?.description}
                </p>
                <p className="w-full text-right text-sm font-bold text-secondary md:text-xl">
                  Bs. {product.price}
                </p>
              </CardFooter>
            </Card>
          </div>
        </Badge>
      ) : (
        <SkeletonCard />
      )}
    </>
  )
}
export default DistributorSaleProductCard
