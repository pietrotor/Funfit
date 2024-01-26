import { useRouter } from 'next/router'
import { useState } from 'react'
// import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
// import { useDisclosure } from '@nextui-org/react'

import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
// import { MoveStockModal } from '@/components/atoms/modals/MoveStockModal'
import { useGetWarehouseStockQuery } from '@/graphql/graphql-types'
import Table from '@/components/organisms/tableNext/Table'
// import ButtonComponent from '@/components/atoms/Button'
import { PaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
// import { TStockData } from '@/interfaces/TData'
// import { WarehouseRoute } from '@/utils/routes'
// import { AdminButton } from '@/components/atoms/Button/AdminButton'
import InformationCard from '@/components/molecules/Card/InformationCard'
import Images from '@/components/atoms/Image/Image'

function Warehouse() {
  const [variables, setVariables] = useState<PaginationInterfaceState>({
    rows: 5,
    filter: '',
    currentPage: 1
  })
  const [filter, setFilter] = useState<string>('')
  // const [stock, setStock] = useState<TStockData>()
  // const handleMoveStockModal = useDisclosure()
  const filtroDebounced = UseDebouncedValue(filter, 2000)
  const router = useRouter()
  const { warehouseId } = router.query
  const { loading } = useGetWarehouseStockQuery({
    variables: {
      warehouseStockPaginationInput: {
        filter: filtroDebounced,
        page: variables?.currentPage,
        rows: variables?.rows,
        warehouses: [warehouseId as string]
      }
    },
    fetchPolicy: 'network-only',
    onCompleted: data => {
      setVariables({
        totalPages: data.getWarehouseStock?.totalPages || 1,
        rows: data.getWarehouseStock?.rows || 5,
        filter: filtroDebounced,
        currentPage: data.getWarehouseStock?.currentPage || 1,
        totalRecords: data.getWarehouseStock?.totalRecords || 1
      })
    }
  })

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }
  // const handleCreateMovement = (stockId: TStockData) => {
  //   handleMoveStockModal.onOpen()
  //   setStock(stockId)
  // }
  const datas = [
    {
      id: 1,
      name: 'Producto 1',
      code: '123456',
      quantity: 20,
      total: 20,
      image: 'https://picsum.photos/200/300'
    },
    {
      id: 2,
      name: 'Producto 2',
      code: '123456',
      quantity: 20,
      total: 20,
      image: 'https://picsum.photos/200/300'
    },
    {
      id: 3,
      name: 'Producto 3',
      code: '123456',
      quantity: 20,
      total: 20,
      image: 'https://picsum.photos/200/300'
    },
    {
      id: 4,
      name: 'Producto 4',
      code: '123456',
      quantity: 20,
      total: 20,
      image: 'https://picsum.photos/200/300'
    },
    {
      id: 5,
      name: 'Producto 5',
      code: '123456',
      quantity: 20,
      total: 20,
      image: 'https://picsum.photos/200/300'
    }
  ]
  return (
    <AdministrationLayout showBackButton={true}>
      <div className="m-auto mt-16 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Venta
        </h3>
        <section className="my-4 grid  gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-3 mb-12">
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Total:</div>
                <div className="text-center">20 Bs</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Coins"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Codigo de venta:</div>
                <div className="text-center">AYL-25-01-2024-031</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="QrCode"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Sucursal</div>
                <div className="text-center">NuevaSucursal</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Branch"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
        </section>
        {/* <div className="flex justify-end space-x-3">
          <AdminButton
            pathname={`${WarehouseRoute}/${warehouseId}/warehouse-history`}
            color="primary"
            text="Historial del almacén"
            iconName="Warehouse"
            showMinIcon={true}
            addPlusIcon={false}
          />
          <AdminButton
            color="secondary"
            pathname={`/administration-panel/warehouses/${warehouseId}/create-stock`}
            iconName="Box"
            text="Agregar nuevo Stock"
          />
        </div> */}
        <Table
          titles={[
            { name: '#' },
            { name: 'Imagen' },
            { name: 'Nombre del producto' },
            { name: 'Código' },
            { name: 'Unidades' },
            { name: 'Total' }

          ]}
          items={(datas || []).map((stock, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {((variables?.currentPage || 0) - 1) * (variables?.rows || 0) +
                  idx +
                  1}
              </h3>,
              <div key={idx} className=" flex justify-center ">
                <Images
                alt='imagen'
                src={ stock.image }
                className='w-20 h-20 rounded-md'
                />
              </div>,
              <div key={idx} className="">
                {stock.name}
              </div>,
              <div key={idx} className="flex justify-center space-x-3">
                {stock.code}
              </div>,
              <div key={idx} className="flex justify-center space-x-3">
                {stock.quantity}
              </div>,
              <div key={idx} className="flex justify-center space-x-3">
                {stock.total}
              </div>
            ]
          }))}
          onChangeRow={row => handleChangeRow(row)}
          tableName="STOCKS"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          isLoading={loading}
          enablePagination={true}
          onSearch={value => setFilter(value)}
          totalItems={variables?.totalRecords}
        />
      </div>
    </AdministrationLayout>
  )
}
export default Warehouse
