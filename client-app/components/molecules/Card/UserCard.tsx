import { Card, CardFooter, Button, useDisclosure } from '@nextui-org/react'
import IconSelector from '@/components/atoms/IconSelector'
import ProductModal from '@/components/atoms/modals/ProductModal'
import Images from '@/components/atoms/Image/Image'

type TUserCardProps = {
  name: string;
  description: string;
  price: number;
  image: string;
  images: string[];
};

export default function UserCard ({ name, description, price, image, images }: TUserCardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
  <div className='h-80 '>
    <Card isFooterBlurred radius="lg" className="border-none h-full">
  <Images
    alt="Product image"
    className="object-cover h-full hover:scale-105 transition-all duration-500"
    removeWrapper
    src={image}
  />
  <CardFooter className="grid grid-cols-3 min-h-[6rem]  gap-2 bg-gray-500/60 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10 group">
    <div className='flex flex-col col-start-1 col-end-3'>
      <h4 className='text-white drop-shadow-2xl'>{name}</h4>
      <p className={`text-base text-white min-h-[3rem] ${'group-hover:line-clamp-none'} line-clamp-2`}>
        {description}
      </p>
    </div>
    <div className='flex flex-col items-center'>
      <h4 className='text-white py-1'>
        {price} Bs
      </h4>
      <Button className="col-start-3 text-tiny text-white bg-primary/80 "
        variant="flat" color="default" radius="lg" fullWidth={true} size="sm"
        onClick={ () => { onOpen() } }>
        <IconSelector name="cart" width="w-10" height="h-10" color="text-white" />
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
