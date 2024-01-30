import UserCard from '@/components/molecules/Card/UserCard'
import useCustomPublicProductsQuery from '@/services/UseProducts'
export function UserProducts() {
  const { data, loading } = useCustomPublicProductsQuery()

  return (
    <div>
      <div className="grid w-full gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
        {(data?.getPublicProducts?.data || []).map(product => (
          <UserCard
            isLoading={loading}
            id={product.id}
            key={product.id}
            name={product.name}
            description={product.description}
            price={product?.suggetedPrice}
            image={product?.image as string}
            images={[product.image as string]}
          />
        ))}
      </div>
    </div>
  )
}
