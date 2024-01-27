import { Radio, RadioGroup } from '@nextui-org/react'
import { useState } from 'react'
import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import { TDataBranch } from '@/interfaces/TData'
import UseGetCustomSalesPaginated from '@/services/UseGetCustomSalesPaginated'
import { useAppSelector } from '@/store/index'
import InformationCard from '@/components/molecules/Card/InformationCard'
import InputComponent from '@/components/atoms/Input'
import ComboInput from '@/components/atoms/ComboInput'
// import { useGetUsersLazyQuery } from '@/graphql/graphql-types'
import DateConverter from '@/components/atoms/DateConverter'

function Sales() {
  const router = useRouter()
  const { branches, currentBranch } = useAppSelector(
    state => state.branchReducer
  )
  const { control } = useForm()
  const [branchSelected, setSelected] = useState<TDataBranch>(currentBranch)

  // const [getUsers, { data: users }] = useGetUsersLazyQuery({
  //   fetchPolicy: 'network-only',
  //   variables: {
  //     paginationInput: {}
  //   }
  // })
  const { data, setVariables, variables, setFilter } =
    UseGetCustomSalesPaginated(branchSelected.id)

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  return (
    <AdministrationLayout>
      <div className="m-auto mt-16 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Reporte de ventas
        </h3>
        <InformationCard className="mt-4 p-4 ">
          <h3>Sucursales</h3>
          <RadioGroup
            value={branchSelected.name}
            onValueChange={value =>
              setSelected(
                branches.find(branch => branch.name === value) as TDataBranch
              )
            }
            className="mt-2"
          >
            <div className="grid grid-cols-5 gap-x-4 gap-y-2 ">
              {branches.map(branch => (
                <Radio key={branch.id} value={branch.name}>
                  {branch.name}
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </InformationCard>

        <div className="mt-10 grid grid-cols-5 gap-4">
          <InputComponent
            isRequired={false}
            name="initialDate"
            label="Fecha inicial"
            type="date"
            className=" rounded-md bg-white"
            control={control}
            onValueChange={e => setVariables({ ...variables, initialDate: e })}
          />
          <InputComponent
            isRequired={false}
            name="finalDate"
            label="Fecha final"
            type="date"
            className="rounded-md bg-white"
            control={control}
            onValueChange={e => setVariables({ ...variables, endDate: e })}
          />
          <div className="col-start-5 rounded-md bg-white ">
          <ComboInput
              label="Vendedor"
              name="seller"
              control={control}
              onChange={e => setVariables({ ...variables, saleBy: e })}
              onClick={() => console.log('')}
              options={[]}
            />
          </div>
        </div>

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
          titles={[
            { name: '#' },
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
              <div key={idx} className="text-sm">
                <DateConverter dateString={sale.date}/>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">{sale.total}</div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">{sale.discount}</div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">
                  {sale.products.map(product => <>{product.product?.name}</>) ||
                    ''}{' '}
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
export default Sales

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
