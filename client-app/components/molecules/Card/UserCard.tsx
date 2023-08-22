import { Card, CardFooter, Image, Button } from '@nextui-org/react'
import IconSelector from '@/components/molecules/IconSelector'

type TUserCardProps = {
  name: string;
  description: string;
  price: number;
  image: string;
};

export default function UserCard ({ name, description, price, image }: TUserCardProps) {
  return (
  <div className='h-80 '>
    <Card
      isFooterBlurred
      radius="lg"
      className="border-none h-full"
    >
      <Image
        alt="Woman listing to music"
        className="object-cover w-full h-full hover:scale-105 transition-all duration-500"
        width={'auto'}
        height={'auto'}
        src={image}
      />
      <CardFooter className="grid grid-cols-3 gap-2 bg-gray-500/60 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
        <div className='flex flex-col col-start-1 col-end-3'>
          <h4 className='text-white drop-shadow-2xl'>{name}</h4>
          <p className="text-base text-white">{description}</p>
        </div>
        <Button className="col-start-3 text-tiny text-white bg-gray-700/60 " variant="flat" color="default" radius="lg" size="sm">
          <IconSelector name="cart" width="w-10" height="h-10" color="text-white" />
          {price} Bs
        </Button>
      </CardFooter>
    </Card>
    </div>
  )
}
