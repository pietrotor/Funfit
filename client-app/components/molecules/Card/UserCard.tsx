import { Button, Card, CardFooter, useDisclosure } from '@nextui-org/react'
import { useRouter } from 'next/router'
import IconSelector from '@/components/atoms/IconSelector'
import ProductModal from '@/components/atoms/modals/ProductModal'
import Images from '@/components/atoms/Image/Image'

type TUserCardProps = {
  id: number
  name: string
  description: string
  price: number
  image: string
  images: string[]
}

export default function UserCard({
  id,
  name,
  description,
  price,
  image,
  images
}: TUserCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const router = useRouter()
  return (
    <div className="h-80 cursor-pointer" onClick={ () => router.push('/producto/' + name)}>
      <Card isFooterBlurred radius="lg" className="h-full border-none">
          <Images
            alt="Product image"
            className="h-full object-cover transition-all duration-500 hover:scale-105"
            removeWrapper
            src={image}
          />
        <CardFooter className="group absolute bottom-1  z-10 ml-1 grid min-h-[6rem] w-[calc(100%_-_8px)] grid-cols-3 gap-2 overflow-hidden rounded-large border-1 border-white/20 bg-gray-500/60 py-1 shadow-small before:rounded-xl">
          <div className="col-start-1 col-end-3 flex flex-col">
            <h4 className="text-white drop-shadow-2xl">{name}</h4>
            <p
              className={`min-h-[3rem] text-base text-white ${'group-hover:line-clamp-none'} line-clamp-2`}
            >
              {description}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <h4 className="py-1 text-white">{price} Bs</h4>
            <Button
              className="col-start-3 bg-primary/80 text-tiny text-white "
              variant="flat"
              color="default"
              radius="lg"
              fullWidth={true}
              size="sm"
              onClick={() => {
                onOpen()
              }}
            >
              <IconSelector
                name="cart"
                width="w-10"
                height="h-10"
                color="text-white"
              />
            </Button>
            <ProductModal
              isOpen={isOpen}
              onClose={onClose}
              onOpen={onOpen}
              title={name}
              description={description}
              price={price}
              images={images}
            />
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
