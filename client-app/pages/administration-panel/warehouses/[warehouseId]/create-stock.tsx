import { useForm } from 'react-hook-form'
import { Button, Image } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/store/index'

import Input from '@/components/atoms/Input'
import AdministrationLayout from '@/components/templates/layouts'
import {
  StatusEnum,
  useCreateStockMutation,
  useGetProductsOutOfWarehouseLazyQuery
} from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import ComboInput from '@/components/atoms/ComboInput'
import { TValueProductData } from '@/components/atoms/modals/EditProductModal'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'
import Selector from '@/components/atoms/InputSelector'

function CreateStock() {
  const [filterProduct] = useState<string>('')
  const [productsData, setProductsData] = useState<TValueProductData>()
  // const [warehouseData /* ,setWarehousesData */] = useState<TValuesWarehouses>(
  //   {}
  // )
  const valueFilterProduct = UseDebouncedValue(filterProduct, 500)
  // const { measurementUnits } = useAppSelector(state => state.configuration)
  const units = useAppSelector(
    state => state.configuration.business?.measurementUnits
  )
  console.log(units, 'units')
  const [CreateStock, { loading }] = useCreateStockMutation()
  const { control, handleSubmit, watch, reset } = useForm()
  const router = useRouter()
  const { warehouseId } = router.query
  const [getProducts, { data }] = useGetProductsOutOfWarehouseLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: valueFilterProduct
      },
      warehouseId
    }
  })

  const onSubmit = () => {
    CreateStock({
      variables: {
        createStockInput: {
          quantity: parseInt(watch('quantity')),
          units: watch('units'),
          productId: productsData?.id,
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
        console.log(data, 'data')
      }
    })
    console.log('send')
  }
  useEffect(() => {
    console.log(productsData, 'data')
    console.log(watch('product'), 'watch')
  }, [productsData])
  return (
    <AdministrationLayout showBackButton={true}>
      <div className="w-full"></div>
      <div className="absolute top-20 ms-5 mt-5 flex h-[75%] w-[90%] transform flex-col items-start justify-center bg-[url(https://bakeandlow.cl/cdn/shop/files/Bake_Low_Banners_1_2048x.jpg?v=1613796261)] bg-cover bg-center">
        <div
          className={`${
            productsData ? 'absolute right-0 h-full w-[60%] bg-gray-700 opacity-60' : ''
          }`}
        />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={` relative z-30 flex h-full  w-[43%] flex-col items-center justify-center border bg-slate-50/100  px-16 py-9 transition-all duration-700  ${
            productsData ? '' : ''
          }`}
        >
          <h3 className="mb-7"> Registrar producto </h3>
          <div className="max-w-full space-y-3">
            <ComboInput
              rules={{
                required: {
                  value: true,
                  message: 'Este campo es requerido'
                }
              }}
              control={control}
              name="product"
              onClick={getProducts}
              label="Producto"
              value={productsData?.name || ''}
              onChange={value => {
                setProductsData(
                  data?.getProductsOutOfWarehouse?.data?.find(
                    product => product.name === value
                  ) as TValueProductData
                )
              }}
              options={
                data?.getProductsOutOfWarehouse?.data?.map(product => ({
                  label: product.name,
                  value: product.name
                })) || [{ label: 'Cargando..', value: 'Cargando..' }]
              }
            />
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
            <div className="grid grid-cols-2 gap-2  ">
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
            className="my-6  h-12 w-4/5 rounded-md bg-secondary/80 px-5 text-xl text-white transition duration-300 hover:bg-secondary"
            type="submit"
            onClick={() => {}}
          >
            Completar
          </Button>
        </form>
        <div
          className={`absolute  grid grid-cols-2 place-items-center gap-x-2 py-6 ps-4 transition-all duration-300 ${
            !productsData ? 'invisible left-1 ' : 'left-unit-9xl '
          }`}
        >
          <div className="">
            <Input
              required={false}
              value={productsData?.description || ''}
              variant='bordered'
              type="textArea"
              name="description"
              label="Descripción del producto"
              disabled={true}
              customeClassName=" mb-2"
            />
            <div className="grid grid-cols-2 gap-2">
              <Input
                required={false}
                name="code"
                label="Código"
                value={productsData?.code}
                disabled={true}
                customeClassName="cursor-not-allowed"
              />
              <Input
                required={false}
                value={productsData?.suggetedPrice?.toString() || ''}
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
                productsData?.image ||
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
