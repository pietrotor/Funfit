import { Radio, RadioGroup } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useGetWarehousesLazyQuery } from '@/graphql/graphql-types'
import { TpointOfSaleDistributor } from '@/interfaces/TData'
type TselectWareHouseProps = {
  selectedDistributor: TpointOfSaleDistributor
  setSelectDistributor: (values: TpointOfSaleDistributor) => void
}

export const SelectWarehouses = ({
  selectedDistributor, setSelectDistributor
}: TselectWareHouseProps) => {
  const [selected, setSelected] = useState<string>()
  const [getWarehouses, { data }] = useGetWarehousesLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {}
    }
  })

  useEffect(() => {
    getWarehouses()
  }, [])

  return (
    <section className=" mt-3 px-14  text-center">
      <div>
        <RadioGroup
          value={selected}
          onValueChange={value => {
            setSelected(value)
            setSelectDistributor({ warehouse: value, distributor: selectedDistributor.distributor })
          }}
          color="secondary"
        >
          {data?.getWarehouses?.data?.map(warehouse => (
            <Radio key={warehouse.id} value={warehouse.id}>
              {warehouse.name}
            </Radio>
          )) || []}
        </RadioGroup>
      </div>
    </section>
  )
}
