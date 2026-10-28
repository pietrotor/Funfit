import { useForm } from 'react-hook-form'
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Image
} from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { GetServerSideProps } from 'next'
import { useAppSelector } from '@/store/index'

import PageHeader from '@/components/molecules/PageHeader'
import Input from '@/components/atoms/Input'
import AdministrationLayout from '@/components/templates/layouts'
import {
  StatusEnum,
  useCreateStockMutation,
  useGetProductByIdLazyQuery,
  useGetProductsOutOfWarehouseLazyQuery
} from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import Selector from '@/components/atoms/InputSelector'
import { authUserHeader } from '@/utils/verificationUser'

interface ICreateStock {
  user: any
}
function CreateStock({ user }: ICreateStock) {
  const [filterProduct, setFilterProduct] = useState<string>('')
  const [productsData, setProductsData] = useState<string>()
  const valueFilterProduct = UseDebouncedValue(filterProduct, 500)
  const units = useAppSelector(
    state => state.configuration.business?.measurementUnits
  )
  const [CreateStock, { loading }] = useCreateStockMutation()
  const { control, handleSubmit, watch, reset } = useForm()
  const router = useRouter()
  const { warehouseId } = router.query

  const [getProductById, { data: productInfo }] = useGetProductByIdLazyQuery({
    onError() {
      showSuccessToast('Error al obtener el producto', 'error')
    }
  })

  const [getProducts, { data }] = useGetProductsOutOfWarehouseLazyQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      paginationInput: {
        filter: valueFilterProduct
      },
      warehouseId
    },
    onError: () => {
      showSuccessToast('Error al obtener los productos', 'error')
    }
  })

  useEffect(() => {
    if (!productsData) return
    getProductById({
      fetchPolicy: 'cache-first',
      variables: {
        getProductByIdId: productsData
      }
    })
  }, [productsData])

  const onSubmit = () => {
    CreateStock({
      variables: {
        createStockInput: {
          quantity: parseInt(watch('quantity')),
          units: watch('units'),
          productId: productsData,
          securityStock: parseInt(watch('securityStock')),
          warehouseId
        }
      },
      onCompleted: data => {
        if (data.createStock?.status === StatusEnum.ERROR) {
          showSuccessToast(
            data.createStock.message || 'Error al registrar el stock',
            'error'
          )
          return
        }
        setProductsData(undefined)
        reset()
        showSuccessToast(
          data.createStock?.message || 'Stock registrado correctamente',
          'success'
        )
        router.back()
      },
      onError() {
        showSuccessToast('No se pudo crear el stock de este producto', 'error')
      }
    })
  }
  return (
    <AdministrationLayout user={user} showBackButton={true}>
      <div className="m-auto w-full">
        <PageHeader
          title="Registrar producto"
          description="Agrega un producto con su stock inicial a este almacén"
        />
        <div
          className={`grid gap-6 ${
            productsData ? 'lg:grid-cols-2' : 'lg:max-w-xl'
          }`}
        >
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_1px_3px_rgba(28,25,23,0.04)] sm:p-6"
        >
          <div className="w-full space-y-3">
            <Autocomplete
              variant={'bordered'}
              label={'Producto'}
              value={productsData}
              className={`${
                productsData ? 'border-stone-900' : 'border-stone-300'
              } w-full`}
              radius="sm"
              onSelectionChange={e => {
                setProductsData(e as any)
              }}
              onOpenChange={() => getProducts()}
              list="options"
              onInputChange={e => {
                setFilterProduct(e)
              }}
              placeholder={'Selecciona un producto'}
            >
              {(data?.getProductsOutOfWarehouse?.data || []).map(item => (
                <AutocompleteItem key={item.id} value={item.id}>
                  {item.name}
                </AutocompleteItem>
              ))}
            </Autocomplete>
            <Input
              control={control}
              name="securityStock"
              label="Stock de seguridad"
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: 'Solo se permiten números'
                }
              }}
            />
            <div className="grid gap-2 lg:grid-cols-2  ">
              <Input
                control={control}
                name="quantity"
                label="Cantidad"
                rules={{
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: 'Solo se permiten números'
                  }
                }}
              />
              <Selector
                name="units"
                label="Unidades"
                control={control}
                placeholder="Unidades"
                options={
                  units?.map(unit => ({
                    value: unit.name,
                    label: unit.shortName
                  })) || [{ value: 'Cargando..', label: 'Cargando..' }]
                }
                rules={{
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  }
                }}
              />
            </div>
          </div>
          <Button
            isLoading={loading}
            className="mt-6 h-12 w-full rounded-md bg-primary-600 px-5 text-base font-semibold text-white transition duration-300 hover:bg-primary-darken"
            type="submit"
            onClick={() => {}}
          >
            Completar
          </Button>
        </form>
        {productsData && (
          <div className="grid w-full gap-4 rounded-2xl border border-stone-200 bg-white p-4 shadow-[0_1px_3px_rgba(28,25,23,0.04)] sm:p-6 md:grid-cols-[1fr_auto]">
            <div>
              <Input
                required={false}
                value={productInfo?.getProductById?.data?.description || ''}
                variant="bordered"
                type="textArea"
                name="description"
                label="Descripción del producto"
                disabled={true}
                customeClassName=" mb-2"
              />
              <div className="grid gap-2 xl:grid-cols-2 ">
                <Input
                  required={false}
                  name="code"
                  label="Código"
                  value={productInfo?.getProductById?.data?.code}
                  disabled={true}
                  customeClassName="cursor-not-allowed"
                />
                <Input
                  required={false}
                  value={
                    productInfo?.getProductById?.data?.suggetedPrice?.toString() ||
                    ''
                  }
                  name="sudgestedPrice"
                  label="Precio sugerido (Bs)"
                  disabled={true}
                  customeClassName="cursor-not-allowed"
                />
              </div>
            </div>
            <div>
              <Image
                className="rounded-md border-2 border-stone-200"
                src={
                  productInfo?.getProductById?.data?.image ||
                  '/common/missing_image.png'
                }
                alt={productInfo?.getProductById?.data?.name || 'Producto'}
                width={200}
              />
            </div>
          </div>
        )}
        </div>
      </div>
    </AdministrationLayout>
  )
}
export default CreateStock
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
