import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import UseGetCustomSalesPaginated from '@/services/UseGetCustomSalesPaginated'
import { useAppSelector } from '@/store/index'
import InformationCard from '@/components/molecules/Card/InformationCard'
import DateConverter from '@/components/atoms/DateConverter'

function DailySale() {
  const router = useRouter()
  const { currentBranch } = useAppSelector(state => state.branchReducer)

  const { data, setVariables, variables, setFilter, loading } =
    UseGetCustomSalesPaginated(currentBranch.id)

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  useEffect(() => {
    setVariables({
      ...variables,
      initialDate: new Date().toISOString().split('T')[0],
      endDate: new Date().toISOString().split('T')[0]
    })
  }, [])
  return (
    <AdministrationLayout>
      <div className="m-auto mt-7 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Ventas del día
        </h3>
        <section className="my-4 mb-8  grid gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Total en ventas</div>
                <div className="text-center">200 Bs</div>
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
                <div className="text-xl">Ventas en efectivo</div>
                <div className="text-center">1999 Bs</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Cash"
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
                <div className="text-xl"> Ventas por QR</div>
                <div className="text-center">3190 Bs</div>
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
                <div className="text-xl">Ventas por tarjeta</div>
                <div className="text-center">100 Bs</div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="CreditCard"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
        </section>
        <Table
          onChangeRow={row => handleChangeRow(row)}
          tableName="Lista de ventas"
          onChangePage={page =>
            setVariables({ ...variables, currentPage: page })
          }
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          enablePagination={true}
          onSearch={value => setFilter(value)}
          totalItems={variables?.totalRecords}
          isLoading={loading}
          titles={[
            { name: '#' },
            { name: 'Código de venta' },
            { name: 'Fecha de venta' },
            { name: 'Monto total' },
            { name: 'Descuento' },
            { name: 'Productos' },
            { name: 'Vendedor' },
            { name: 'Acciones' }
          ]}
          items={(data?.getSalesPaginated?.data || []).map((sale, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {' '}
                {idx + 1}
              </h3>,
              <p key={idx} className="text-sm">
                {sale.code}
              </p>,
              <div key={idx} className="text-sm">
                <DateConverter showTime dateString={sale.date} />
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">{sale.total} Bs</div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">
                  {sale.discount ? sale.discount + 'Bs' : '-'}
                </div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">
                  {sale.products.map((product, idx) => (
                    <p
                      key={idx}
                      className="m-auto w-fit rounded-full bg-blue-100 px-2 py-1 font-semibold text-blue-600"
                    >
                      {product.product?.name}
                    </p>
                  ))}
                </div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">{sale.createdBy}</div>
              </div>,
              <div key={idx}>
                <div className="space-x-1">
                  <ButtonComponent
                    onClick={() =>
                      router.push(`/administration-panel/sales/${sale.id}`)
                    }
                    type="edit"
                    showTooltip
                    tooltipText="Ver detalles de venta"
                    className="px-3"
                  >
                    <IconSelector
                      name="Recipe"
                      color="text-primary"
                      width="w-8"
                    />
                  </ButtonComponent>
                </div>
              </div>
            ]
          }))}
        />
      </div>
    </AdministrationLayout>
  )
}
export default DailySale

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
