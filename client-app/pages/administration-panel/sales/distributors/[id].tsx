/* eslint-disable indent */
/* eslint-disable multiline-ternary */
import { useRouter } from 'next/router'
import 'react-circular-progressbar/dist/styles.css'

import { GetServerSideProps } from 'next'
import {
  Button,
  Input,
  Modal,
  ModalContent,
  Textarea,
  useDisclosure
} from '@nextui-org/react'
import { Controller, get, useForm } from 'react-hook-form'
import {
  Banknote,
  Coins,
  CreditCard,
  ListChecks,
  QrCode,
  ReceiptText,
  UserRound,
  Warehouse
} from 'lucide-react'
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import Table from '@/components/organisms/tableNext/Table'
import PageHeader from '@/components/molecules/PageHeader'
import StatCard from '@/components/molecules/StatCard'
import { AdminButton } from '@/components/atoms/Button/AdminButton'
import { formatBs } from '@/utils/formatBs'
import Images from '@/components/atoms/Image/Image'
import { authUserHeader } from '@/utils/verificationUser'
import {
  CreatePaymentInput,
  DistributorSalePaymentMethod,
  StatusEnum,
  useCreatePaymentMutation
} from '@/graphql/graphql-types'
import DateConverter from '@/components/atoms/DateConverter'
import UseGetCustomDistributorSaleById from '@/services/UseGetCustomDistributorSaleById'
import { UseGetCustomDistributorSalePayment } from '@/services/UseGetCustomDistributorSalePayment'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'

interface SaleDetailProps {
  user: any
}

function SaleDistributorDetail({ user }: SaleDetailProps) {
  const router = useRouter()
  const { data, refetch: refetchSale } = UseGetCustomDistributorSaleById(
    router.query.id as string
  )
  const {
    data: paymentsData,
    loading,
    refetch
  } = UseGetCustomDistributorSalePayment(router.query.id as string)

  const [createPayment, { loading: loadingPayment }] = useCreatePaymentMutation(
    {
      onError() {
        showSuccessToast('No se pudo realizar el pago', 'error')
      }
    }
  )

  const addPaymentDisclosure = useDisclosure()
  const {
    control,
    formState: { errors },
    handleSubmit
  } = useForm<CreatePaymentInput>()

  const getSalePaymentMethod = (
    paymentMethod: DistributorSalePaymentMethod
  ) => {
    switch (paymentMethod) {
      case DistributorSalePaymentMethod.MIXED:
        return {
          icon: (
            <IconSelector className=" rounded-md text-white" name="Recipe" />
          ),
          text: 'Crédito - Contado'
        }
      case DistributorSalePaymentMethod.CREDIT:
        return {
          icon: (
            <IconSelector className=" rounded-md text-white" name="Recipe" />
          ),
          text: 'Crédito'
        }
      case DistributorSalePaymentMethod.CASH:
        return {
          icon: <IconSelector className=" rounded-md text-white" name="Cash" />,
          text: 'Contado'
        }
    }
  }

  const onSubmit = (createPaymentInput: CreatePaymentInput) => {
    const saleInfo = data?.getDistributorSale?.data
    if (!saleInfo) return
    const newTotalPaid =
      parseFloat(String(createPaymentInput.amount)) + saleInfo.totalPaid
    const newBalance =
      saleInfo.balance - parseFloat(String(createPaymentInput.amount))
    createPayment({
      variables: {
        createPaymentInput: {
          amount: parseFloat(String(createPaymentInput.amount)),
          balance: newBalance,
          date: new Date().toISOString(),
          distributorId: saleInfo.distributorId,
          distributorSaleId: saleInfo.id,
          totalPaid: newTotalPaid,
          observation: createPaymentInput.observation
        }
      },
      onCompleted({ createPayment }) {
        if (createPayment?.status !== StatusEnum.OK) {
          return showSuccessToast(
            createPayment?.message || 'No se pudo crear el pago',
            'error'
          )
        }
        showSuccessToast(
          createPayment?.message || 'Pago creado correctamente',
          'success'
        )
        addPaymentDisclosure.onClose()
        refetchSale()
        refetch()
      }
    })
  }

  return (
    <AdministrationLayout user={user} showBackButton={true}>
      <div className="m-auto w-full">
        <PageHeader title="Detalle de venta" />
        <section className="mb-8 grid gap-3 sm:grid-cols-2 md:gap-4 xl:grid-cols-3">
          <StatCard
            label="Total"
            value={formatBs(data?.getDistributorSale?.data?.total)}
            icon={Coins}
            tone="primary"
          />
          {!!data?.getDistributorSale?.data?.balance && !loading && (
            <>
              <StatCard
                label="Total pagado"
                value={formatBs(data?.getDistributorSale?.data?.totalPaid)}
                icon={Banknote}
                tone="success"
              />
              <StatCard
                label="Saldo pendiente"
                value={formatBs(data?.getDistributorSale?.data?.balance)}
                icon={ReceiptText}
                tone="danger"
              />
            </>
          )}
          <StatCard
            label="Código de venta"
            value={data?.getDistributorSale?.data?.code}
            icon={QrCode}
          />
          <StatCard
            label="Método de pago"
            value={
              data?.getDistributorSale?.data?.paymentMethod
                ? getSalePaymentMethod(
                    data?.getDistributorSale?.data?.paymentMethod!
                  ).text
                : ''
            }
            icon={CreditCard}
          />
          <StatCard
            label="Vendedor"
            value={`${data?.getDistributorSale?.data?.createdByInfo?.name ?? ''} ${
              data?.getDistributorSale?.data?.createdByInfo?.lastName ?? ''
            }`.trim()}
            icon={UserRound}
          />
          <StatCard
            label="Almacén"
            value={data?.getDistributorSale?.data?.warehouse?.name}
            icon={Warehouse}
          />
          <StatCard
            label="Lista de precios"
            value={data?.getDistributorSale?.data?.priceList?.name}
            icon={ListChecks}
          />
        </section>
        {data?.getDistributorSale?.data?.canceled && (
          <section className="mb-6 w-fit max-w-full rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">
            <h4 className="font-amsipro text-lg font-semibold">Venta anulada</h4>
            <div className="flex flex-col justify-center text-sm">
              <p className="mt-2 font-semibold">Anulado en fecha:</p>
              <DateConverter
                dateString={data?.getDistributorSale?.data?.canceledAt}
                showTime
              />
              <p className="mt-2 font-semibold">Anulado por:</p>
              <p>
                {data?.getDistributorSale?.data?.canceledByInfo?.name}{' '}
                {data?.getDistributorSale?.data?.canceledByInfo?.lastName}
              </p>
            </div>
          </section>
        )}
        <h2 className="mb-4 font-amsipro text-xl font-bold text-tertiary">
          Productos
        </h2>
        <Table
          titles={[
            { name: '#' },
            { name: 'Imagen' },
            { name: 'Nombre del producto' },
            { name: 'Código' },
            { name: 'Unidades' },
            { name: 'Total' }
          ]}
          items={(data?.getDistributorSale?.data?.products || []).map(
            (sale, idx) => ({
              content: [
                <h3 key={idx} className="text-sm">
                  {idx + 1}
                </h3>,
                <div key={idx} className=" flex justify-center ">
                  <Images
                    alt="imagen"
                    src={sale.product?.image || '/common/missing_image.png'}
                    className="h-14  w-16 rounded-md object-cover md:h-20 md:w-20"
                  />
                </div>,
                <div key={idx} className=" text-sm">
                  {sale.product?.name}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {sale.product?.code}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {sale.qty}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {formatBs(sale.total)}
                </div>
              ]
            })
          )}
          tableName="Productos vendidos"
          enablePagination={false}
        />
        <div className="mb-4 mt-8 flex w-full flex-col justify-between gap-3 md:flex-row md:items-center">
          <h2 className="font-amsipro text-xl font-bold text-tertiary">Pagos</h2>
          {data?.getDistributorSale?.data?.balance !== 0 && (
            <AdminButton
              onClick={() => addPaymentDisclosure.onOpen()}
              color="primary"
              text="Agregar pago"
              iconName="Coins"
            />
          )}
        </div>
        <Table
          titles={[
            { name: '#' },
            { name: 'Monto pagado' },
            { name: 'Saldo' },
            { name: 'Total abonado' },
            { name: 'Fecha' },
            { name: 'Observaciones' },
            { name: 'Registrado por' }
          ]}
          isLoading={loading}
          items={(paymentsData?.getDistributorSalePayments?.data || []).map(
            (payment, idx) => ({
              content: [
                <h3 key={idx} className="text-sm">
                  {idx + 1}
                </h3>,
                <div key={idx} className=" flex justify-center text-sm ">
                  <p>{formatBs(payment.amount)}</p>
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {formatBs(payment.balance)}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {formatBs(payment.totalPaid)}
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  <DateConverter dateString={payment.date} showTime />
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  <p>{payment.observation}</p>
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  <p>
                    {payment.createdByInfo?.name}{' '}
                    {payment.createdByInfo?.lastName}
                  </p>
                </div>
              ]
            })
          )}
          tableName="Pagos"
          enablePagination={false}
        />
      </div>
      <Modal
        isOpen={addPaymentDisclosure.isOpen}
        onClose={addPaymentDisclosure.onClose}
      >
        <ModalContent className="p-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h4 className="mb-4">Agregar pago</h4>
            <Controller
              control={control}
              name="amount"
              rules={{
                required: 'Campo obligatorio',
                pattern: {
                  value: /^\d+(\.\d+)?$/,
                  message: 'Solo números'
                },
                validate: field => {
                  if (
                    parseFloat(String(field)) >
                    (data?.getDistributorSale?.data?.balance || 0)
                  ) {
                    return 'El monto no puede ser mayor al saldo'
                  }
                  return true
                }
              }}
              render={({ field: { value, onChange } }) => (
                <Input
                  value={value as any}
                  errorMessage={get(errors, 'amount')?.message}
                  onChange={onChange}
                  label="Monto"
                  variant="bordered"
                  placeholder="100"
                  color="default"
                />
              )}
            />
            <p className="mt-2 text-xs">
              Saldo pendiente: {formatBs(data?.getDistributorSale?.data?.balance)}
            </p>
            <Controller
              control={control}
              name="observation"
              render={({ field: { value, onChange } }) => (
                <Textarea
                  value={value || ''}
                  errorMessage={get(errors, 'observation')?.message}
                  onChange={onChange}
                  label="Observaciones"
                  variant="bordered"
                  placeholder="El pago lo realizo con su hijo..."
                  color="default"
                  className="mt-4"
                />
              )}
            />
            <Button
              type="submit"
              color="primary"
              className="mt-5 w-full text-base font-semibold"
              isLoading={loadingPayment}
            >
              Pagar
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </AdministrationLayout>
  )
}
export default SaleDistributorDetail
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
