import { Badge, Card, CardBody, Chip, Image } from '@nextui-org/react'
import { SkeletonCard } from './SkeletonCard'
import { TProductBranchData } from '@/interfaces/TData'

export type TPointOfSaleCardProps = {
  product: TProductBranchData
  quantity: number
  isLoading?: boolean
  handleSelected: (id: string) => void
}

function PointOfSaleCard({
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
              key={product.id}
              shadow="sm"
              isPressable
              className="relative h-60 w-full border-1 border-transparent transition-all duration-700 ease-in-out hover:border-secondary hover:shadow-lg "
              onPress={() => {
                product?.stock &&
                  quantity < product?.stock &&
                  quantity + 1 >= 1 &&
                  handleSelected(product.id)
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
                  className="h-full w-full rounded-b-none border-b object-cover"
                />
              </CardBody>
              <Chip
                className={`absolute left-1/2 top-36 z-10 -translate-x-1/2 -translate-y-1/4 transform  ${
                  product.stock === 0 ? 'bg-gray-300' : 'bg-primary'
                } text-white`}
                variant="solid"
                size="sm"
              >
                {product.stock === 0 ? 'Sin Stock' : `Inv. ${product.stock}`}
              </Chip>
              <div className="flex h-36 w-full flex-col justify-around rounded-large p-1">
                <p className="w-full text-left text-sm font-bold text-secondary md:text-lg xl:text-xl">
                  {product.product?.name}
                </p>
                <p className="w-full text-right text-sm font-bold text-primary md:text-lg xl:text-xl">
                  Bs. {product.price}
                </p>
              </div>
            </Card>
          </div>
        </Badge>
      ) : (
        <SkeletonCard />
      )}
    </>
  )
}
export default PointOfSaleCard
