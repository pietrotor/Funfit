import { useForm } from 'react-hook-form'
import { Button, Image } from '@nextui-org/react'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import Input from '@/components/atoms/Input'
import AdministrationLayout from '@/components/templates/layouts'
import { StatusEnum, useCreateStockMutation, useGetProductsOutOfWarehouseLazyQuery } from '@/graphql/graphql-types'
import { showSuccessToast } from '@/components/atoms/Toast/toasts'
import ComboInput from '@/components/atoms/InputDropDown'
import { TValueProductData } from '@/components/atoms/modals/EditProductModal'
import { TValuesWarehouses } from '@/components/atoms/modals/EditWarehouseModal'
import UseDebouncedValue from '@/hooks/UseDebouncedValue'

function CreateStock() {
  const [filterProduct/*, setFilterProduct */] = useState<string>('')
  const valueFilterProduct = UseDebouncedValue(filterProduct, 500)
  const [CreateStock] = useCreateStockMutation()
  const [productsData, setProductsData] = useState <TValueProductData>()
  const [warehouseData/* ,setWarehousesData */] = useState <TValuesWarehouses>({})
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
          showSuccessToast(data.createStock.message || 'Error al crear un usuario', 'error')
          return
        }
        setProductsData(undefined)
        reset()
        showSuccessToast(data.createStock?.message || 'Usuario creado correctamente', 'success')
        console.log(data, 'data')
      }
    })
    console.log('send')
  }
  useEffect(() => {
    console.log(productsData, 'data')
  }
  , [data])
  return (
    <AdministrationLayout>
      <div className='flex flex-col items-start ms-10 justify-center h-[90%] bg-[url(https://bakeandlow.cl/cdn/shop/files/Bake_Low_Banners_1_2048x.jpg?v=1613796261)] transform absolute w-[90%] mt-10 bg-cover bg-center'>
        <div className={`${productsData ? 'bg-gray-700 opacity-60 w-[60%] h-full right-0 absolute' : ''}`}/>
        <form onSubmit={handleSubmit(onSubmit)} className={` border px-16 py-9  flex flex-col justify-center items-center bg-slate-50/100 relative  h-full z-30 transition-all duration-700  ${productsData ? '' : ''}` }>
                <h3 className='mb-7'> Registrar producto </h3>
                <div className='max-w-5/6'>
                  <ComboInput
                  // rules={{ required: { value: true, message: 'Este campo es requerido' } }}
                  control={control}
                  name='product'
                    onClick={getProducts}
                    label='Producto'
                    onChange={(value) => {
                      setProductsData(data?.getProductsOutOfWarehouse?.data?.find((product) => product.name === value) as TValueProductData)
                    }
                    }
                    options = {
                    data?.getProductsOutOfWarehouse?.data?.map((product) => ({
                      label: product.name
                    })) || [
                      { label: 'Cargando..' }
                    ]
                    }
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
                <div className='grid grid-cols-2 gap-2  pt-3'>

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

                </div>

              </div>
              <Button
          className='w-4/5  my-6 px-5 bg-secondary/80 text-xl h-12 text-white rounded-md hover:bg-secondary transition duration-300'
          type='submit'
          onClick={() => { }}
        >
          Completar
        </Button>
      </form>
      <div className={`ps-4  py-6 grid grid-cols-2 gap-x-2 place-items-center transition-all duration-300 absolute ${!productsData ? 'left-1 invisible ' : 'left-unit-9xl '}`}>
          <div className=''>
            <Input
              labelColor=' text-white '
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
        </div>
      </div>
      </div>
    </AdministrationLayout>
  )
}
export default CreateStock
