import UserCard from '@/components/molecules/Card/UserCard'
export function UserProducts () {
  const products = [{
    id: 1,
    name: 'Torta saludable  ',
    description: 'Torta de chocolate con harina de avena, sin azucar, sin gluten, sin lactosa. ',
    price: 100,
    image: 'https://images5.alphacoders.com/132/1323979.png'
  },
  {
    id: 2,
    name: 'Brownie',
    description: 'Brownie de chocolate con harina de avena, sin gluten, sin lactosa.',
    price: 200,
    image: 'https://images4.alphacoders.com/132/1325213.png'
  },
  {
    id: 3,
    name: 'Galleteas de avena',
    description: 'Galletas de avena con chispas de chocolate, sin gluten,sin lactosa.',
    price: 300,
    image: 'https://images.alphacoders.com/132/1322078.png'
  },
  {
    id: 4,
    name: 'Puding de chocolate',
    description: 'puding de chocolate con harina de avena, sin gluten, sin lactosa ni grasa .',
    price: 300,
    image: 'https://images2.alphacoders.com/132/1324802.png'
  },
  {
    id: 5,
    name: 'Producto 3',
    description: 'Descripcion del producto 3',
    price: 300,
    image: 'https://n9z4u8f2.rocketcdn.me/wp-content/uploads/2012/06/IMG_5738-1.jpg'
  },
  {
    id: 6,
    name: 'Torta saludable  ',
    description: 'Torta de chocolate con harina de avena, sin gluten, sin lactosa. ',
    price: 300,
    image: 'https://i.pinimg.com/564x/42/bf/9e/42bf9e202935428722c78568c503fcb5.jpg'
  }
  ]

  return (
    <div>
      <div className="grid grid-cols-3 gap-4 gap-y-5 py-8 w-full">
        {products.map((product) => (
            <UserCard key={product.id} name={product.name} description={product.description} price={product.price} image={product.image} />
        ))}
      </div>
    </div>
  )
}
