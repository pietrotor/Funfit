import UserCard from '@/components/molecules/Card/UserCard'
import { TProductBranchData } from '@/interfaces/TData'
type TProps = {
  data : TProductBranchData[]
  loading: boolean
}
export function UserProducts({ data, loading }: TProps) {
  return (
    <div>
      <div className="grid w-full gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
        {(data || []).map(product => (
          <UserCard
            isLoading={loading}
            id={product.id}
            key={product.id}
            name={product?.product?.name || ''}
            description={product.product?.description || ''}
            price={product.product?.suggetedPrice || 0}
            image={product?.product?.image as string}
            images={[product.product?.image as string]}
          />
        ))}
      </div>
    </div>
  )
}
