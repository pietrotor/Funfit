import { Button, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { SkeletonCard } from './SkeletonCard'
import ProductModal from '@/components/atoms/modals/ProductModal'
import Images from '@/components/atoms/Image/Image'

type TUserCardProps = {
  id: string
  name: string
  description: string
  price: number
  image?: string
  images?: string[]
  isLoading?: boolean
}

export default function UserCard({
  id,
  name,
  description,
  price,
  image,
  images,
  isLoading = false
}: TUserCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  return (
    <div className="group overflow-hidden rounded-xl ring-1 ring-gray-200 transition-all duration-500 hover:shadow-lg">
      {!isLoading ? (
        <div className="flex h-full flex-col">
          <Images
            alt="Product image"
            className="h-96 object-cover"
            removeWrapper
            src={image as string}
          />
          <div className="w-full bg-gray-100 px-6 py-3 transition-all duration-400">
            <div className="flex w-full items-center justify-between gap-4">
              <div
                onClick={() => router.push('/producto/' + id)}
                className="col-start-1 col-end-3 flex cursor-pointer flex-col"
              >
                <h3 className="font-bold drop-shadow-2xl">{name}</h3>
                <p
                  className={`h-[50px] text-base ${'group-hover:line-clamp-none'} line-clamp-2`}
                >
                  {description}
                </p>
              </div>
              <h3 className="whitespace-nowrap py-1 text-secondary">
                {price} Bs
              </h3>
            </div>
            <Button
              className="col-start-3 ml-auto mr-0 mt-3 flex h-fit w-fit bg-primary py-2 text-tiny text-white"
              variant="flat"
              color="default"
              radius="lg"
              fullWidth={true}
              size="lg"
              onClick={() => {
                onOpen()
              }}
            >
              <p className="text-lg font-bold uppercase">Agregar al carrito</p>
            </Button>
          </div>
          <ProductModal
            isOpen={isOpen}
            onClose={onClose}
            onOpen={onOpen}
            id={id}
            title={name}
            description={description}
            price={price}
            images={images as string[]}
          />
        </div>
      ) : (
        <SkeletonCard />
      )}
    </div>
  )
}
