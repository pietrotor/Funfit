import { Radio, RadioGroup, Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useGetPriceListsPaginatedLazyQuery } from '@/graphql/graphql-types'
import { TpointOfSaleDistributor } from '@/interfaces/TData'

type TselecctDistributorProps = {
  selectedDistributor: TpointOfSaleDistributor
  setSelectDistributor: (values: TpointOfSaleDistributor) => void
}

export const SelectPriceLists = ({
  selectedDistributor,
  setSelectDistributor
}: TselecctDistributorProps) => {
  const [selected, setSelected] = useState<string>()
  const [getPriceLists, { data, loading }] = useGetPriceListsPaginatedLazyQuery(
    {
      fetchPolicy: 'network-only',
      variables: {
        paginationInput: {}
      }
    }
  )

  useEffect(() => {
    getPriceLists()
  }, [])

  return (
    <section className=" mt-3 px-14 text-center">
      <div>
        {loading ? (
          <Spinner label="Cargando..." color="secondary" />
        ) : (
          <RadioGroup
            value={selected}
            onValueChange={value => {
              setSelected(value)
              setSelectDistributor({
                warehouse: selectedDistributor.warehouse,
                distributor: selectedDistributor.distributor,
                priceListId: value
              })
            }}
            color="secondary"
          >
            {data?.getPriceListsPaginated?.data?.map(priceList => (
              <Radio key={priceList.id} value={priceList.id}>
                {priceList.name}
              </Radio>
            )) || []}
          </RadioGroup>
        )}
      </div>
    </section>
  )
}
