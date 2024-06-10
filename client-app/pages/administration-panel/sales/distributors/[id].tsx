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
import AdministrationLayout from '@/components/templates/layouts'
import IconSelector from '@/components/atoms/IconSelector'
import Table from '@/components/organisms/tableNext/Table'
import InformationCard from '@/components/molecules/Card/InformationCard'
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
      <div className="m-auto mt-8 w-5/6 ">
        <h3 className="text-center text-4xl font-extrabold text-gray-500 ">
          Detalle de venta
        </h3>
        <section className="my-4 mb-12  grid gap-3 pt-6 md:gap-4 lg:grid-cols-2 xl:grid-cols-3">
          <InformationCard className="h-full px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Total:</div>
                <div className="text-center">
                  {data?.getDistributorSale?.data?.total} Bs
                </div>
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
          {!!data?.getDistributorSale?.data?.balance && !loading && (
            <>
              <InformationCard className="h-full !bg-blue-500 px-3 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    <div className="text-xl">Total pagado:</div>
                    <div className="text-center">
                      {data?.getDistributorSale?.data?.totalPaid} Bs
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
              <InformationCard className="h-full !bg-red-500 px-3 py-6 text-white">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-bold">
                    <div className="text-xl">Saldo pendiente:</div>
                    <div className="text-center">
                      {data?.getDistributorSale?.data?.balance} Bs
                    </div>
                  </div>
                  <span className="rounded-full bg-secondary p-3 ">
                    <IconSelector
                      name="Recipe"
                      className=" rounded-md text-white"
                      height="h-6"
                      width="w-6"
                    />
                  </span>
                </div>
              </InformationCard>
            </>
          )}
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Codigo de venta:</div>
                <div className="text-center">
                  {data?.getDistributorSale?.data?.code}
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
                <div className="text-xl">Método de pago:</div>
                <div className="text-center">
                  {data?.getDistributorSale?.data?.paymentMethod
                    ? getSalePaymentMethod(
                        data?.getDistributorSale?.data?.paymentMethod!
                      ).text
                    : ''}
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                {data?.getDistributorSale?.data?.paymentMethod ? (
                  getSalePaymentMethod(
                    data?.getDistributorSale?.data?.paymentMethod!
                  ).icon
                ) : (
                  <></>
                )}
              </span>
            </div>
          </InformationCard>
          <InformationCard className="h-full bg-slate-200 px-3 py-6">
            <div className="flex items-center justify-between">
              <div className="text-lg font-bold">
                <div className="text-xl">Vendedor:</div>
                <div className="text-center">
                  {data?.getDistributorSale?.data?.createdByInfo?.name}{' '}
                  {data?.getDistributorSale?.data?.createdByInfo?.lastName}
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="user"
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
                <div className="text-xl">Almacen:</div>
                <div className="text-center">
                  {data?.getDistributorSale?.data?.warehouse?.name}
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Warehouse"
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
                <div className="text-xl">Lista de precios:</div>
                <div className="text-center">
                  {data?.getDistributorSale?.data?.priceList?.name}
                </div>
              </div>
              <span className="rounded-full bg-secondary p-3 ">
                <IconSelector
                  name="Configuration"
                  className=" rounded-md text-white"
                  height="h-6"
                  width="w-6"
                />
              </span>
            </div>
          </InformationCard>
        </section>
        {data?.getDistributorSale?.data?.canceled && (
          <section className="mb-4 w-fit rounded-md bg-red-600 p-4 px-10 text-white">
            <h4>Venta anulada</h4>
            <div className="flex flex-col justify-center text-sm">
              <p className="mt-2 font-bold">Anulado en fecha: </p>
              <DateConverter
                dateString={data?.getDistributorSale?.data?.canceledAt}
                showTime
              />
              <p className="mt-2 font-bold">Anulado por: </p>
              <p>
                {data?.getDistributorSale?.data?.canceledByInfo?.name}{' '}
                {data?.getDistributorSale?.data?.canceledByInfo?.lastName}
              </p>
            </div>
          </section>
        )}
        <h2 className="mb-4">Productos</h2>
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
                    src={sale.product?.image || 'asdf'}
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
                  {sale.total} Bs
                </div>
              ]
            })
          )}
          tableName="Productos vendidos"
          enablePagination={false}
        />
        <div className="flex w-full flex-col justify-between md:flex-row md:items-center">
          <h2 className="mb-4 mt-8">Pagos</h2>
          {data?.getDistributorSale?.data?.balance !== 0 && (
            <Button
              color="secondary"
              className="flex flex-row-reverse items-center"
              onClick={() => addPaymentDisclosure.onOpen()}
            >
              <IconSelector
                name="Plus"
                className=" rounded-md text-white"
                height="h-4"
                width="w-4"
              />
              <p className="text-base font-semibold">Agregar Pagos</p>
            </Button>
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
                  <p>{payment.amount} Bs</p>
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {payment.balance} Bs
                </div>,
                <div
                  key={idx}
                  className="flex justify-center space-x-3 text-sm"
                >
                  {payment.totalPaid} Bs
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
          tableName="Productos vendidos"
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
              Saldo pendiente: {data?.getDistributorSale?.data?.balance} Bs
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
