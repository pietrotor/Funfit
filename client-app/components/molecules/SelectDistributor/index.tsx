import { Radio, RadioGroup, Spinner } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { useGetDistributorsPaginatedLazyQuery } from '@/graphql/graphql-types'
import { TpointOfSaleDistributor } from '@/interfaces/TData'

type TselecctDistributorProps = {
  selectedDistributor: TpointOfSaleDistributor
  setSelectDistributor: (values: TpointOfSaleDistributor) => void
}

export const SelectDistributor = ({
  selectedDistributor,
  setSelectDistributor
}: TselecctDistributorProps) => {
  const [selected, setSelected] = useState<string>()
  const [getDistributors, { data, loading }] =
    useGetDistributorsPaginatedLazyQuery({
      fetchPolicy: 'network-only',
      variables: {
        paginationInput: {}
      }
    })

  useEffect(() => {
    getDistributors()
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
                distributor: value
              })
            }}
            color="secondary"
          >
            {data?.getDistributorsPaginated?.data?.map(distributor => (
              <Radio key={distributor.id} value={distributor.id}>
                {distributor.name}
              </Radio>
            )) || []}
          </RadioGroup>
        )}
      </div>
    </section>
  )
}
