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
    onError(error) {
      console.log('🚀 ~ onError ~ error:', error)
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
    onCompleted: data => {
      console.log(data, 'data')
    },
    onError: error => {
      console.log(error, 'error')
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
            data.createStock.message || 'Error al crear un usuario',
            'error'
          )
          return
        }
        setProductsData(undefined)
        reset()
        showSuccessToast(
          data.createStock?.message || 'Usuario creado correctamente',
          'success'
        )
        router.back()
      },
      onError(error) {
        console.log('🚀 ~ onError ~ error:', error)
        showSuccessToast('No se pudo crear el stock de este producto', 'error')
      }
    })
    console.log('send')
  }
  return (
    <AdministrationLayout user={user} showBackButton={true}>
      <div className="w-full"></div>
      <div className="flex h-screen w-full transform justify-center bg-[url(https://bakeandlow.cl/cdn/shop/files/Bake_Low_Banners_1_2048x.jpg?v=1613796261)] bg-cover bg-center lg:right-0">
        <div
          className={`${
            productsData
              ? 'absolute h-full  w-[60%] bg-gray-700 opacity-60 md:right-0'
              : ''
          }`}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={
            'relative z-30 flex h-full w-full flex-1 flex-col items-center justify-center border bg-slate-50/100  px-16 py-9  transition-all duration-700  '
          }
        >
          <h3 className="mb-7"> Registrar producto </h3>
          <div className="w-full space-y-3">
            <Autocomplete
              variant={'bordered'}
              label={'Producto'}
              value={productsData}
              className={`${
                productsData ? 'border-gray-900' : 'border-gray-300'
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
            className="my-6 h-12 w-full rounded-md bg-secondary/80 px-5 text-xl text-white transition duration-300 hover:bg-secondary"
            type="submit"
            onClick={() => {}}
          >
            Completar
          </Button>
        </form>
        <div
          className={`hidden w-full flex-1 grid-cols-1 gap-x-2 py-6 ps-4 transition-all duration-300 lg:grid lg:grid-cols-2 lg:place-items-center ${
            !productsData
              ? 'invisible md:left-1 '
              : 'md:left-unit-7xl lg:left-unit-9xl xl:right-0'
          }`}
        >
          <div className="">
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
                label="precio sugerido (Bs)"
                disabled={true}
                customeClassName="cursor-not-allowed"
              />
            </div>
          </div>
          <div className="">
            <Image
              className="mt-3 rounded-md border-2 border-gray-300"
              src={
                productInfo?.getProductById?.data?.image ||
                'https://st.depositphotos.com/2934765/53192/v/600/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg'
              }
              alt="image product"
              width={200}
            />
          </div>
        </div>
      </div>
    </AdministrationLayout>
  )
}
export default CreateStock
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
