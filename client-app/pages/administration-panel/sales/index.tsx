import { Chip, Radio, RadioGroup, useDisclosure } from '@nextui-org/react'
import {
  Banknote,
  Coins,
  CreditCard,
  Download,
  QrCode,
  Truck,
  Wallet
} from 'lucide-react'
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
import { filterPaginationInterfaceState } from '@/interfaces/paginationInterfaces'
import UseGetCustomSalesPaginated from '@/services/UseGetCustomSalesPaginated'
import { useAppSelector } from '@/store/index'
import PageHeader from '@/components/molecules/PageHeader'
import StatCard from '@/components/molecules/StatCard'
import { formatBs } from '@/utils/formatBs'
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
import { getSalePaymentMethod } from '@/utils/getSalePaymentMethod'
import VendisLogo from '@/components/atoms/VendisLogo'

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
      endDate: watch('endDate'),
      currentPage: 1
    }))
  }, [currentBranch])

  // Every report filter applies to the branch shown in the selector, not to
  // the global branch from the sidebar.
  const applyFilters = (changes: filterPaginationInterfaceState) => {
    setVariables(prevVariables => ({
      ...prevVariables,
      ...changes,
      branchIds: [branchSelected.id],
      currentPage: 1
    }))
    setSummaryVariables(prevVariables => ({
      ...prevVariables,
      ...changes,
      branchIds: [branchSelected.id]
    }))
  }

  const handleChangeBranch = (name: string) => {
    const branch = branches.find(branch => branch.name === name)
    if (!branch) return
    setSelected(branch as TDataBranch)
    setVariables(prevVariables => ({
      ...prevVariables,
      branchIds: [branch.id],
      currentPage: 1
    }))
    setSummaryVariables(prevVariables => ({
      ...prevVariables,
      branchIds: [branch.id]
    }))
  }

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
    setVariables(prevVariables => ({
      ...prevVariables,
      rows: row,
      currentPage: 1
    }))
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
      applyFilters({ initialHour: undefined, endHour: undefined })
      return
    }

    // Si solo una está definida, mostrar advertencia
    if ((initialHour && !endHour) || (!initialHour && endHour)) {
      setHourFilterError('Debes completar ambas horas para filtrar')
      // No aplicar filtro parcial
      applyFilters({ initialHour: undefined, endHour: undefined })
      return
    }

    // Validar que hora inicial < hora final
    if (initialHour >= endHour) {
      setHourFilterError('La hora inicial debe ser menor que la hora final')
      // No aplicar filtro inválido
      applyFilters({ initialHour: undefined, endHour: undefined })
      return
    }

    // Todo válido, aplicar filtro
    setHourFilterError('')
    applyFilters({ initialHour, endHour })
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

  return (
    <AdministrationLayout user={user}>
      <div className="m-auto w-full">
        <PageHeader
          title="Reporte de ventas"
          actions={
            <button
              type="button"
              onClick={handleExportToExcel}
              disabled={exportStatus === 'loading'}
              className="flex h-11 items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 text-sm font-semibold text-white transition-colors hover:bg-primary-darken focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:cursor-not-allowed disabled:opacity-70"
            >
              <Download className="h-4 w-4" aria-hidden />
              Exportar a Excel
            </button>
          }
        />
        <div className="w-full rounded-2xl border border-stone-200 bg-white p-4">
          <h3 className="font-amsipro text-lg font-semibold text-tertiary">
            Sucursales
          </h3>
          <RadioGroup
            value={branchSelected.name}
            onValueChange={handleChangeBranch}
            color="primary"
            className="mt-3"
          >
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
              {branches.map(branch => (
                <Radio key={branch.id} value={branch.name} className="max-w-full">
                  {branch.name}
                </Radio>
              ))}
            </div>
          </RadioGroup>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-6">
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
            onValueChange={e => applyFilters({ initialDate: e })}
          />
          <InputComponent
            isRequired={false}
            name="finalDate"
            label="Fecha final"
            type="date"
            defaultValue={new Date().toISOString().split('T')[0]}
            className="rounded-md bg-white"
            control={control}
            onValueChange={e => applyFilters({ endDate: e })}
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
          <div className="bg-white sm:col-span-2 lg:col-span-1">
            <ComboInput
              label="Producto"
              name="productId"
              control={control}
              onSelectionChange={e => applyFilters({ productId: e })}
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
          <div className="rounded-md bg-white sm:col-span-2 lg:col-span-1">
            <ComboInput
              label="Vendedor"
              name="seller"
              control={control}
              onSelectionChange={e => applyFilters({ saleBy: e })}
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

        <section className="mb-6 mt-4 grid gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
          <StatCard
            label="Total en ventas"
            value={formatBs(summaryData?.total)}
            icon={Coins}
            tone="primary"
          />
          <StatCard
            label="Ventas en efectivo"
            value={formatBs(getTotalByPaymentMethod(PaymentMethodEnum.CASH)?.total)}
            icon={Banknote}
            tone="success"
          />
          <StatCard
            label="Ventas por QR"
            value={formatBs(getTotalByPaymentMethod(PaymentMethodEnum.QR_TRANSFER)?.total)}
            icon={QrCode}
            tone="neutral"
          />
          <StatCard
            label="Ventas por tarjeta"
            value={formatBs(getTotalByPaymentMethod(PaymentMethodEnum.CARD)?.total)}
            icon={CreditCard}
            tone="neutral"
          />
          <StatCard
            label="Ventas PedidosYa"
            value={formatBs(getTotalByPaymentMethod(PaymentMethodEnum.PEDIDOS_YA)?.total)}
            icon={Truck}
            tone="neutral"
          />
          <StatCard
            label="Ventas por Vendis"
            value={formatBs(getTotalByPaymentMethod(PaymentMethodEnum.VENDIS)?.total)}
            iconNode={<VendisLogo className="h-5" />}
            tone="neutral"
          />
          <StatCard
            label="Ventas otros"
            value={formatBs(getTotalByPaymentMethod(PaymentMethodEnum.OTHER)?.total)}
            icon={Wallet}
            tone="neutral"
          />
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
              <div key={idx} className="min-w-0 text-sm">
                <DateConverter dateString={sale.date} showTime />
              </div>,
              <div key={idx} className="text-sm font-bold">
                {formatBs(sale.total)}
              </div>,
              <div key={idx} className="text-sm">
                {sale.discount || 'S/D'}
              </div>,
              <div
                key={idx}
                className="flex w-fit max-w-full flex-col gap-1 rounded-lg border border-stone-200 bg-stone-50 px-2 py-1 text-stone-700"
              >
                <div className="flex items-center gap-1">
                  {getSalePaymentMethod(sale.paymentMethod).icon}
                  <p>{getSalePaymentMethod(sale.paymentMethod).text}</p>
                </div>
                {(sale as Sale).entersCash &&
                  sale.paymentMethod !== PaymentMethodEnum.CASH && (
                    <p className="text-tiny text-secondary">Ingresó a caja</p>
                )}
              </div>,
              <div key={idx}>
                <div className="flex flex-wrap gap-1 text-sm">
                  {sale.products.length <= 3 ? (
                    sale.products.map((product, idx) => (
                      <Chip key={idx} variant="flat" color="primary" size="sm">
                        {product.product?.name}
                      </Chip>
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
                        color="text-secondary"
                        width="w-8"
                      />
                    </ButtonComponent>
                  )}
                </div>
              </div>,
              <div key={idx} className="min-w-0 break-words text-sm">
                {sale.createdByInfo?.name} {sale.createdByInfo?.lastName}
              </div>,
              <div key={idx} className="min-w-0 break-words text-sm">
                <p>{(sale as Sale).observations || '—'}</p>
                {sale.canceled && (
                  <Chip
                    className="mt-1"
                    color="danger"
                    variant="flat"
                    radius="full"
                    size="sm"
                  >
                    Anulada
                  </Chip>
                )}
              </div>,
              <div key={idx}>
                <div className="flex flex-wrap gap-2">
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
