import { CircularProgressbar } from 'react-circular-progressbar'
import { useGetBranchProductStockQuery } from '@/graphql/graphql-types'

type StockComboCircularProgressBarProps = {
  branchProductId: string
}

const StockComboCircularProgressBar = ({
  branchProductId
}: StockComboCircularProgressBarProps) => {
  const { data } = useGetBranchProductStockQuery({
    variables: {
      id: branchProductId
    },
    pollInterval: 5000
  })

  const stock = data?.getBranchProductStock?.data || 0

  return (
    <CircularProgressbar value={stock} maxValue={stock} text={`${stock}`} />
  )
}

export { StockComboCircularProgressBar }
