import {
  Badge,
  Card,
  CardBody,
  CardFooter,
  Chip,
  Image
} from '@nextui-org/react'
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
              className="relative h-80 w-full transition-all duration-300 ease-in-out hover:border-1 hover:border-secondary hover:shadow-lg"
              onPress={() => {
                product?.stock &&
                quantity < product?.stock &&
                quantity + 1 >= 1 &&
                handleSelected(product.id)
              }}
            >
              <CardBody className="relative h-full p-0">
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
                className="absolute left-1/2 top-52 z-10 -translate-x-1/2 -translate-y-1/4 transform bg-secondary/80 text-white"
                variant="solid"
              >
                Inv. {product.stock}
              </Chip>
              <CardFooter className="flex h-32 flex-col justify-around rounded-large">
                <p className="w-full text-left text-xl font-bold text-secondary">
                  {product.product?.name}
                </p>
                <p className="w-full overflow-hidden text-left text-tiny text-gray-500">
                  {product.product?.description}
                </p>
                <p className="w-full text-right text-xl font-bold text-secondary">
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
export default PointOfSaleCard
