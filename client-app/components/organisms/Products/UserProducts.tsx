import UserCard from '@/components/molecules/Card/UserCard'
import { TProductBranchData } from '@/interfaces/TData'
type TProps = {
  data: TProductBranchData[]
  loading: boolean
  title: string
}
export function UserProducts({ data, loading, title }: TProps) {
  return (
    <div>
      <div className="mt-4 w-full">
        <h3 className="w-fitp-1  font-amatemora text-left text-7xl font-extrabold text-primary">
          {title}
        </h3>
        <div className="mt-4 border-2 border-primary bg-primary"></div>
      </div>
      <div className="grid w-full gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
        {(data || []).map(product => (
          <UserCard
            isLoading={loading}
            id={product.id}
            key={product.id}
            name={product?.product?.name || ''}
            description={product.product?.description || ''}
            price={product.price || 0}
            image={product?.product?.image as string}
            images={[product.product?.image as string]}
          />
        ))}
      </div>
    </div>
  )
}
