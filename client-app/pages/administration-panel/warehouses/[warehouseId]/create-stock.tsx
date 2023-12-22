import { useForm } from 'react-hook-form'
import { Button, Image } from '@nextui-org/react'
import { useEffect, useState } from 'react'

import Input from '@/components/atoms/Input'
import AdministrationLayout from '@/components/templates/layouts'
import { StatusEnum, useCreateStockMutation, useGetProductsLazyQuery, useGetWarehousesLazyQuery } from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import ComboInput from '@/components/atoms/InputDropDown'
import { TValueProductData } from '@/components/atoms/modals/EditProductModal'
import { TValuesWarehouses } from '@/components/atoms/modals/EditWarehouseModal'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

function CreateStock() {
  const [filterProduct, setFilterProduct] = useState<string>('')
  const [filterWarehouse, setFilterWarehouse] = useState<string>('')
  const valueFilterWarehouse = UseDebouncedValue(filterWarehouse, 500)
  const valueFilterProduct = UseDebouncedValue(filterProduct, 500)
  const [CreateStock] = useCreateStockMutation()
  const [productsData, setProductsData] = useState <TValueProductData>()
  const [warehouseData, setWarehousesData] = useState <TValuesWarehouses>({})
  const { control, handleSubmit, watch, reset } = useForm()
  const [getProducts, { data }] = useGetProductsLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: valueFilterProduct
      }
    }
  })
  const [getWarehouses, dataWarehouses] = useGetWarehousesLazyQuery({
    fetchPolicy: 'network-only',
    variables: {
      paginationInput: {
        filter: valueFilterWarehouse
      }
    }
  })

  const onSubmit = () => {
    CreateStock({
      variables: {
        createStockInput: {
          lastStockEntry: parseInt(watch('lastStockEntry')),
          quantity: parseInt(watch('quantity')),
          units: watch('units'),
          productId: productsData?.id,
          securityStock: parseInt(watch('securityStock')),
          warehouseId: '657e33b1f2348d91dde57d3b'
        }
      },
      onCompleted: data => {
        if (data.createStock?.status === StatusEnum.ERROR) {
          showSuccessToast(data.createStock.message || 'Error al crear un usuario', 'error')
          return
        }
        showSuccessToast(data.createStock?.message || 'Usuario creado correctamente', 'success')
        console.log(data, 'data')
        reset()
      }
    })
    console.log('send')
  }
  useEffect(() => {
    console.log(productsData, 'data')
    console.log(dataWarehouses, 'data')
  }
  , [dataWarehouses])
  return (
    <AdministrationLayout>
      <div className='flex flex-col items-center'>
        <div className='bg-[url(https://bakeandlow.cl/cdn/shop/files/Bake_Low_Banners_1_2048x.jpg?v=1613796261)] transform scale-x-[-1]  absolute w-screen min-h-screen bg-cover bg-center'/>
        <form onSubmit={handleSubmit(onSubmit)} className=' border p-8 w-1/2 ms-auto space-y-8 flex flex-col bg-slate-50/100 h-screen z-10'>
          <h3 className=' text-center font-extrabold text-3xl text-gray-500 '>
            Crear Stock
          </h3>
          <div className='grid grid-cols-2 gap-2 px-4'>
              <ComboInput
                onClick={getProducts}
                label='Producto'
                onChange={(value) => {
                  setFilterWarehouse(value)
                  setProductsData(data?.getProducts?.data?.find((product) => product.name === value) as TValueProductData)
                }
                }
                options = {
                data?.getProducts?.data?.map((product) => ({
                  label: product.name
                })) || [
                  { label: 'Cargando..' }
                ]
                }
              />
              <ComboInput
                onClick={getWarehouses}
                label='Almacén'
                onChange={(value) => {
                  console.log(value, 'value')
                  setFilterProduct(value)
                  setWarehousesData(dataWarehouses?.data?.getWarehouses?.data?.find((warehouse) => warehouse.name === value) as TValuesWarehouses)
                  console.log(dataWarehouses, 'warehouseData')
                }
                }
                options = {
                  dataWarehouses?.data?.getWarehouses?.data?.map((warehouse) => ({
                    label: warehouse.name
                  })) || [
                    { label: 'Cargando..' }
                  ]
                }
              />
              <Input
                control={control}
                name="lastStockEntry"
                label='Última entrada'
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
              <Input
                control={control}
                name="quantity"
                label='Cantidad'
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
              <Input
                control={control}
                name="units"
                label='Unidades'
                rules={{
                  required: {
                    value: true,
                    message: 'Este campo es requerido'
                  },
                  pattern: {
                    value: /^[a-zA-Z\s]+$/i,
                    message: 'Solo se permiten letras'
                  }
                }}
              />
              <Input
                control={control}
                name="securityStock"
                label='Stock de seguridad'
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
            </div>
            <hr className='border border-gray-300' />
            {(productsData && warehouseData) &&
            <div className='px-4 grid grid-cols-2 gap-x-2 place-items-center transition-all duration-400'>
            <div className=''>
              <Input
                required = {false}
                value={warehouseData.address || ''}
                type='textArea'
                name='address'
                label='Dirección del almacén'
                disabled= {true}
                customeClassName='cursor-not-allowed mb-2'
              />
              <Input
                required = {false}
                value={productsData?.description || ''}
                type='textArea'
                name='description'
                label='Descripción del producto'
                disabled= {true}
                customeClassName='cursor-not-allowed mb-2'
              />
                <div className='grid grid-cols-2 gap-2'>
                  <Input
                    required = {false}
                    name='code'
                    label='Código'
                    value={productsData?.code }
                    disabled= {true}
                    customeClassName='cursor-not-allowed'
                  />
                  <Input
                    required = {false}
                    value={productsData?.suggetedPrice || ''}
                    name='sudgestedPrice'
                    label='precio sugerido (Bs)'
                    disabled= {true}
                    customeClassName='cursor-not-allowed'
                  />

            </div>
        </div>
        <div className=''>
        <Image
            className='border-2 mt-3 border-gray-300 rounded-md'
            src={ productsData?.image || 'https://st.depositphotos.com/2934765/53192/v/600/depositphotos_531920820-stock-illustration-photo-available-vector-icon-default.jpg'}
            alt='image product'
            width={200}
          />
          <Button
            className='w-full my-6 px-5 bg-secondary/80 text-xl h-12 text-white rounded-md hover:bg-secondary transition duration-300'
            type='submit'
            onClick={() => { }}
          >
             Completar
          </Button>
        </div>
      </div>}
        </form>
      </div>
    </AdministrationLayout>
  )
}
export default CreateStock
