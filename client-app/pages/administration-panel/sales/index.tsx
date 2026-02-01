import { Radio, RadioGroup, useDisclosure } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'

import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import Table from '@/components/organisms/tableNext/Table'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
import ButtonComponent from '@/components/atoms/Button'
import { TDataBranch, TSaleProduct } from '@/interfaces/TData'
import UseGetCustomSalesPaginated from '@/services/UseGetCustomSalesPaginated'
import { useAppSelector } from '@/store/index'
import InformationCard from '@/components/molecules/Card/InformationCard'
import InputComponent from '@/components/atoms/Input'
import ComboInput from '@/components/atoms/ComboInput'
// import { useGetUsersLazyQuery } from '@/graphql/graphql-types'
import DateConverter from '@/components/atoms/DateConverter'
import {
  PaymentMethodEnum,
  Sale,
  useGetProductsLazyQuery,
  useGetUsersLazyQuery
} from '@/graphql/graphql-types'
import { useGetSalesSummary } from '@/services/useGetSalesSummary'
import { SaleCancelModal } from '@/components/molecules/SaleCancelModal'
import ProductListModal from '@/components/atoms/modals/ProductListModal'
import ExportModal from '@/components/atoms/modals/ExportModal'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

interface SalesProps {
  user: any
}

function Sales({ user }: SalesProps) {
  const router = useRouter()
  const { branches, currentBranch } = useAppSelector(
    state => state.branchReducer
  )

  const { control, watch } = useForm({
    defaultValues: {
      initialDate: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
        .toISOString()
        .split('T')[0],
      endDate: new Date().toISOString().split('T')[0],
      initialHour: '',
      endHour: ''
    }
  })
  const [branchSelected, setSelected] = useState<TDataBranch>(currentBranch)
  const [productsDetiail, setProducts] = useState<TSaleProduct[]>()
  const handleProductsListModal = useDisclosure()

  const { data: summaryData, setVariables: setSummaryVariables } =
    useGetSalesSummary()

  const { data, setVariables, variables, loading, refetch } =
    UseGetCustomSalesPaginated(branchSelected.id)

  const handleDeleteModal = useDisclosure()
  const [selectedItem, setSelectedItem] = useState<Sale | null>(null)

  useEffect(() => {
    setSelected(currentBranch)
    setSummaryVariables(prevVariables => ({
      ...prevVariables,
      branchIds: [currentBranch.id],
      initialDate: watch('initialDate'),
      endDate: watch('endDate')
    }))
    setVariables(prevVariables => ({
      ...prevVariables,
      branchIds: [currentBranch.id],
      initialDate: watch('initialDate'),
      endDate: watch('endDate')
    }))
  }, [currentBranch])

  const [getUsers, { data: users }] = useGetUsersLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      paginationInput: {
        rows: 250
      }
    }
  })

  const [getProducts, { data: products }] = useGetProductsLazyQuery({
    fetchPolicy: 'cache-first',
    variables: {
      paginationInput: {
        rows: 400
      }
    }
  })

  const handleChangeRow = (row: number) => {
    setVariables({ ...variables, rows: row, currentPage: 1 })
  }

  function getTotalByPaymentMethod(method: PaymentMethodEnum) {
    return summaryData?.paymentMethods.find(
      paymentMethod => paymentMethod.method === method
    )
  }
  const handleProducts = (products: TSaleProduct[]) => {
    setProducts(products)
    handleProductsListModal.onOpen()
  }

  const [exportStatus, setExportStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [exportError, setExportError] = useState<string>('')
  const exportModal = useDisclosure()
  const [hourFilterError, setHourFilterError] = useState<string>('')

  // Función para validar y aplicar filtro de horas
  const validateAndApplyHourFilter = (initialHour: string, endHour: string) => {
    // Si ambas están vacías, no hay filtro (válido)
    if (!initialHour && !endHour) {
      setHourFilterError('')
      setVariables({ ...variables, initialHour: undefined, endHour: undefined })
      setSummaryVariables(prev => ({
        ...prev,
        branchIds: [currentBranch.id],
        initialHour: undefined,
        endHour: undefined
      }))
      return
    }

    // Si solo una está definida, mostrar advertencia
    if ((initialHour && !endHour) || (!initialHour && endHour)) {
      setHourFilterError('Debes completar ambas horas para filtrar')
      // No aplicar filtro parcial
      setVariables({ ...variables, initialHour: undefined, endHour: undefined })
      setSummaryVariables(prev => ({
        ...prev,
        branchIds: [currentBranch.id],
        initialHour: undefined,
        endHour: undefined
      }))
      return
    }

    // Validar que hora inicial < hora final
    if (initialHour >= endHour) {
      setHourFilterError('La hora inicial debe ser menor que la hora final')
      // No aplicar filtro inválido
      setVariables({ ...variables, initialHour: undefined, endHour: undefined })
      setSummaryVariables(prev => ({
        ...prev,
        branchIds: [currentBranch.id],
        initialHour: undefined,
        endHour: undefined
      }))
      return
    }

    // Todo válido, aplicar filtro
    setHourFilterError('')
    setVariables({ ...variables, initialHour, endHour })
    setSummaryVariables(prev => ({
      ...prev,
      branchIds: [currentBranch.id],
      initialHour,
      endHour
    }))
  }

  const handleExportToExcel = async () => {
    try {
      setExportStatus('loading')
      setExportError('')
      exportModal.onOpen()

      const params = new URLSearchParams({
        branchIds: branchSelected.id,
        initialDate: watch('initialDate'),
        endDate: watch('endDate')
      })

      if (variables?.saleBy) {
        params.append('saleBy', variables.saleBy)
      }
      if (variables?.productId) {
        params.append('productId', variables.productId)
      }
      // Incluir filtro de horas si ambas están definidas
      if (variables?.initialHour && variables?.endHour) {
        params.append('initialHour', variables.initialHour)
        params.append('endHour', variables.endHour)
      }

      const backendUrl = process.env.NEXT_PUBLIC_BACKENDURL?.replace('/graphql-api', '') || 'http://localhost:4000'
      const response = await fetch(`${backendUrl}/api/sales/export?${params.toString()}`)
      
      if (!response.ok) {
        throw new Error('Error al exportar')
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `ventas_${branchSelected.name}_${watch('initialDate')}_${watch('endDate')}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
      
      setExportStatus('success')
    } catch (error: any) {
      console.error('Error al exportar:', error)
      setExportError(error.message || 'Error al exportar el archivo Excel')
      setExportStatus('error')
    }
  }

  const handleCloseExportModal = () => {
    exportModal.onClose()
    if (exportStatus === 'error') {
      setExportStatus('idle')
    }
  }

  const getSalePaymentMethod = (paymentMethod: PaymentMethodEnum) => {
    switch (paymentMethod) {
      case PaymentMethodEnum.CARD:
        return {
          icon: <IconSelector name="CreditCard" />,
          text: 'Tarjeta'
        }
      case PaymentMethodEnum.QR_TRANSFER:
        return {
          icon: <IconSelector name="QrCode" />,
          text: 'QR'
        }
      case PaymentMethodEnum.CASH:
        return {
          icon: <IconSelector name="Cash" />,
          text: 'Efectivo'
        }
    }
  }

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto mt-7 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Reporte de ventas
        </h3>
        <InformationCard className="mt-4 p-4 ">
          <h3>Sucursales</h3>
          <RadioGroup
            value={branchSelected.name}
            onValueChange={value => {
              setSelected(
                branches.find(branch => branch.name === value) as TDataBranch
              )
              setSummaryVariables(prevVariables => ({
                ...prevVariables,
                branchIds: [branches.find(branch => branch.name === value)!.id]
              }))
            }}
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

        <div className="mt-10 grid grid-cols-2 gap-2 md:gap-4 md:space-y-0 lg:grid-cols-6">
          <InputComponent
            isRequired={false}
            name="initialDate"
            label="Fecha inicial"
            type="date"
            className=" rounded-md bg-white"
            control={control}
            defaultValue={
              new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                .toISOString()
                .split('T')[0]
            }
            onValueChange={e => {
              setVariables({ ...variables, initialDate: e })
              setSummaryVariables(prevVariables => ({
                ...prevVariables,
                branchIds: [currentBranch.id],
                initialDate: e
              }))
            }}
          />
          <InputComponent
            isRequired={false}
            name="finalDate"
            label="Fecha final"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="rounded-md bg-white"
            control={control}
            onValueChange={e => {
              setVariables({ ...variables, endDate: e })
              setSummaryVariables(prevVariables => ({
                ...prevVariables,
                branchIds: [currentBranch.id],
                endDate: e
              }))
            }}
          />
          <InputComponent
            isRequired={false}
            name="initialHour"
            label="Hora inicial"
            type="time"
            className="rounded-md bg-white"
            control={control}
            onValueChange={e => {
              const endHour = watch('endHour')
              validateAndApplyHourFilter(e, endHour)
            }}
          />
          <InputComponent
            isRequired={false}
            name="endHour"
            label="Hora final"
            type="time"
            className="rounded-md bg-white"
            control={control}
            onValueChange={e => {
              const initialHour = watch('initialHour')
              validateAndApplyHourFilter(initialHour, e)
            }}
          />
          <div className="col-start-1 col-end-3 bg-white lg:col-start-5 lg:col-end-6">
            <ComboInput
              label="Producto"
              name="productId"
              control={control}
              onSelectionChange={e => {
                setVariables({ ...variables, productId: e })
                setSummaryVariables(prevVariables => ({
                  ...prevVariables,
                  branchIds: [currentBranch.id],
                  productId: e
                }))
              }}
              onClick={() => getProducts()}
              options={
                products?.getProducts?.data?.map(product => ({
                  label: product.name,
                  value: product.id
                })) || [
                  {
                    label: 'cargando...',
                    value: ''
                  }
                ]
              }
            />
          </div>
          <div className="col-start-1 col-end-3 rounded-md bg-white lg:col-start-6 lg:col-end-7 ">
            <ComboInput
              label="Vendedor"
              name="seller"
              control={control}
              onSelectionChange={e => {
                setVariables({ ...variables, saleBy: e })
                setSummaryVariables(prevVariables => ({
                  ...prevVariables,
                  branchIds: [currentBranch.id],
                  saleBy: e
                }))
              }}
              onClick={() => getUsers()}
              options={
                users?.getUsers?.data?.map(user => ({
                  label: user.name,
                  value: user.id
                })) || [
                  {
                    label: 'cargando...',
                    value: ''
                  }
                ]
              }
            />
          </div>
        </div>

        {/* Mensaje de error/advertencia para filtro de horas */}
        {hourFilterError && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{hourFilterError}</span>
          </div>
        )}

        {/* Indicador de filtro de hora activo */}
        {variables?.initialHour && variables?.endHour && !hourFilterError && (
          <div className="mt-2 flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 flex-shrink-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span>
              Filtrando ventas entre <strong>{variables.initialHour}</strong> y{' '}
              <strong>{variables.endHour}</strong>
            </span>
          </div>
        )}

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleExportToExcel}
            disabled={exportStatus === 'loading'}
            className="group relative flex items-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl hover:shadow-emerald-500/25 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {/* Efecto de brillo */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            
            {/* Icono */}
            <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 backdrop-blur-sm">
              <IconSelector name="Download" width="w-5" height="h-5" className="text-white" />
            </div>
            
            {/* Texto */}
            <div className="relative flex flex-col items-start">
              <span className="text-sm font-bold tracking-wide">Exportar a Excel</span>
              <span className="text-xs font-normal opacity-80">Descargar reporte</span>
            </div>

            {/* Icono de Excel */}
            <div className="relative ml-2 flex h-8 w-8 items-center justify-center rounded bg-white/20">
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                <path d="M14,2H6A2,2,0,0,0,4,4V20a2,2,0,0,0,2,2H18a2,2,0,0,0,2-2V8ZM15.2,17,12,12.2,8.8,17H6.5l4.3-6L6.8,5H9.1l3,4.7L15,5h2.3l-4.2,6,4.3,6Z" />
              </svg>
            </div>
          </button>
        </div>

        <section className="my-4 mb-8  grid gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-4">
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Total en ventas</div>
                <div className="text-center">{summaryData?.total || 0} Bs</div>
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
                <div className="text-center">
                  {getTotalByPaymentMethod(PaymentMethodEnum.CASH)?.total || 0}{' '}
                  Bs
                </div>
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
                <div className="text-center">
                  {getTotalByPaymentMethod(PaymentMethodEnum.QR_TRANSFER)
                    ?.total || 0}{' '}
                  Bs
                </div>
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
                <div className="text-center">
                  {getTotalByPaymentMethod(PaymentMethodEnum.CARD)?.total || 0}{' '}
                  Bs
                </div>
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
          isLoading={loading}
          itemsPerPage={variables?.rows}
          currentPage={variables?.currentPage}
          totalPages={variables?.totalPages}
          enablePagination={true}
          totalItems={data?.getSalesPaginated?.totalRecords || 0}
          titles={[
            { name: '#' },
            { name: 'Fecha de venta' },
            { name: 'Monto total' },
            { name: 'Descuento' },
            { name: 'Método de pago' },
            { name: 'Productos' },
            { name: 'Vendedor' },
            { name: 'Observaciones' },
            { name: 'Acciones' }
          ]}
          items={(data?.getSalesPaginated?.data || []).map((sale, idx) => ({
            content: [
              <h3 key={idx} className="text-sm">
                {' '}
                {idx + 1}
              </h3>,
              <div key={idx} className="w-[10rem] text-sm md:w-full">
                <DateConverter dateString={sale.date} showTime />
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm font-bold">{sale.total} Bs</div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">{sale.discount || 'S/D'}</div>
              </div>,
              <div
                key={idx}
                className=" flex items-center justify-center gap-1 rounded-sm border border-primary p-1 text-primary"
              >
                {getSalePaymentMethod(sale.paymentMethod).icon}
                <p>{getSalePaymentMethod(sale.paymentMethod).text}</p>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm ">
                  {sale.products.length <= 3 ? (
                    sale.products.map((product, idx) => (
                      <p
                        key={idx}
                        className="m-auto mt-1 w-fit rounded-full bg-blue-100 px-2 py-1 font-semibold text-blue-600"
                      >
                        {product.product?.name}
                      </p>
                    ))
                  ) : (
                    <ButtonComponent
                      onClick={() =>
                        handleProducts(sale.products as TSaleProduct[])
                      }
                      showTooltip
                      tooltipText="Ver lista de productos"
                      type="history"
                    >
                      <IconSelector
                        name="eye"
                        color="text-blue-600"
                        width="w-8"
                      />
                    </ButtonComponent>
                  )}
                </div>
              </div>,
              <div key={idx} className=" flex justify-center  ">
                <div className="text-sm">
                  {sale.createdByInfo?.name} {sale.createdByInfo?.lastName}
                </div>
              </div>,
              <div key={idx}>
                {sale.canceled && (
                  <div className="flex h-full flex-col items-center justify-center gap-3">
                    <p className="m-auto w-fit bg-red-600 px-4 py-1 font-bold text-white">
                      Venta Anulada
                    </p>
                    <div>
                      <DateConverter dateString={sale.canceledAt} showTime />
                    </div>
                  </div>
                )}
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
                  >
                    <IconSelector
                      name="Recipe"
                      color="text-primary"
                      width="w-8"
                    />
                  </ButtonComponent>
                  {!sale.canceled && (
                    <ButtonComponent
                      onClick={() => {
                        setSelectedItem(sale as any)
                        handleDeleteModal.onOpen()
                      }}
                      type="delete"
                      showTooltip
                      tooltipText="Eliminar"
                    >
                      <IconSelector
                        name="trash"
                        color="text-danger"
                        width="w-8"
                      />
                    </ButtonComponent>
                  )}
                </div>
              </div>
            ]
          }))}
        />
      </div>
      <SaleCancelModal
        sale={selectedItem}
        modalDisclosure={handleDeleteModal}
        refetch={refetch}
      />
      <ProductListModal
        isOpen={handleProductsListModal.isOpen}
        onClose={handleProductsListModal.onClose}
        values={productsDetiail || []}
      />
      <ExportModal
        isOpen={exportModal.isOpen}
        onClose={handleCloseExportModal}
        status={exportStatus}
        errorMessage={exportError}
      />
    </AdministrationLayout>
  )
}
export default Sales

export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
