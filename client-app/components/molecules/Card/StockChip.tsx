import clsx from 'clsx'
import { Chip } from '@nextui-org/react'
import { useGetBranchProductStockQuery } from '@/graphql/graphql-types'

type StockChipProps = {
  branchProudctId: string
}

const StockChip = ({ branchProudctId }: StockChipProps) => {
  const { data } = useGetBranchProductStockQuery({
    variables: {
      id: branchProudctId
    },
    pollInterval: 5000
  })
  return (
    <Chip
      className={clsx(
        'absolute left-1/2 top-36 z-10 -translate-x-1/2 -translate-y-1/4 transform  text-white',
        data?.getBranchProductStock?.data === 0 ? ' bg-gray-300' : 'bg-primary'
      )}
      variant="solid"
      size="sm"
    >
      <span>
        {data?.getBranchProductStock?.data === 0
          ? 'Sin Stock'
          : `Inv. ${data?.getBranchProductStock?.data || 0}`}
      </span>
    </Chip>
  )
}

export { StockChip }
