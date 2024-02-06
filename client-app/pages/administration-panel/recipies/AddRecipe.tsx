import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'
import ComboInput from '@/components/atoms/ComboInput'
import AdministrationLayout from '@/components/templates/layouts'
import InputComponent from '@/components/atoms/Input'
import Selector from '@/components/atoms/InputSelector'
import ButtonComponent from '@/components/atoms/Button'
import IconSelector from '@/components/atoms/IconSelector'
// import { TValueProductData } from '@/components/atoms/modals/EditProductModal'

export interface RecipeFormProps {
  product: string
  quantity: string
  units: string
}

interface RecipeProps {
  user: any
}

function Recipe({ user }: RecipeProps) {
  // const [productsData, setProductsData] = useState<TValueProductData>()
  const { control, handleSubmit } = useForm()
  const [rows, setRows] = useState<RecipeFormProps[]>([
    { product: '', quantity: '', units: '' } // Fila por defecto
  ])

  const onSubmit = () => {
    console.log('submit', rows)
  }

  const getProducts = () => {
    console.log('getProducts')
  }

  const handleAddRow = () => {
    setRows([...rows, { product: '', quantity: '', units: '' }])
  }

  return (
    <AdministrationLayout user={user} showBackButton>
      <div className="m-auto mt-16 w-5/6">
        <h3 className="text-center text-4xl font-extrabold text-gray-500">
          Crea una nueva receta
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 grid grid-cols-3 gap-5"
        >
          <div className="flex flex-col space-y-2">
            <InputComponent
              name="RecipeName"
              label="Nombre de la receta"
              control={control}
            />
            <InputComponent
              name="Portions"
              label="Porciones"
              control={control}
            />
            <InputComponent
              name="Category"
              label="Categoria"
              control={control}
            />
            <Button color="secondary">Agregar a la lista</Button>
          </div>
          <div className="col-span-2">
            <div className="h-full rounded-md border-2 p-3 shadow-lg">
              <div className="flex justify-between items-center">
                <h4 className="text-2xl font-bold text-gray-500">
                  Lista de insumos
                </h4>
                <ButtonComponent
                  showTooltip
                  type='submit'
                  tooltipText='añadir insumo'
                  onClick={handleAddRow}
                >
                  <IconSelector name="Plus" className='text-secondary' width="w-5" height="h-5" />
                </ButtonComponent>
              </div>
              <div className="mt-5">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left font-semibold text-gray-500">
                        Insumo
                      </th>
                      <th className="text-left font-semibold text-gray-500">
                        Cantidad
                      </th>
                      <th className="text-left font-semibold text-gray-500">
                        Unidad de medida
                      </th>
                      <th className="text-left font-semibold text-gray-500">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, idx) => (
                      <tr key={idx}>
                        <td className='pe-2'>
                          <ComboInput
                            name={`insume-${idx}`}
                            label="Insumo"
                            onChange={getProducts}
                            control={control}
                            options={[]}
                            onClick={() => {}}
                          />
                        </td>
                        <td className='pe-2'>
                          <InputComponent
                            name={`quantity-${idx}`}
                            label="Cantidad"
                            control={control}
                          />
                        </td>
                        <td >
                          <Selector
                            name={`units-${idx}`}
                            label="Unidad de medida"
                            control={control}
                            options={[]}
                          />
                        </td>
                        <td className=' text-center'>
                          <ButtonComponent
                          showTooltip
                          tooltipText='eliminar insumo'
                            onClick={() => {
                              const newRows = [...rows]
                              newRows.splice(idx, 1)
                              setRows(newRows)
                            }
                            }
                          >
                            <IconSelector name="trash" className='text-red-500' width="w-5" height="h-5" />
                          </ButtonComponent>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdministrationLayout>
  )
}

export default Recipe
