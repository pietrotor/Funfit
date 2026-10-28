import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@nextui-org/react'
import { GetServerSideProps } from 'next'
import ComboInput from '@/components/atoms/ComboInput'
import AdministrationLayout from '@/components/templates/layouts'
import PageHeader from '@/components/molecules/PageHeader'
import InputComponent from '@/components/atoms/Input'
import Selector from '@/components/atoms/InputSelector'
import ButtonComponent from '@/components/atoms/Button'
import IconSelector from '@/components/atoms/IconSelector'
import { authUserHeader } from '@/utils/verificationUser'
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
  }

  const getProducts = () => {
  }

  const handleAddRow = () => {
    setRows([...rows, { product: '', quantity: '', units: '' }])
  }

  return (
    <AdministrationLayout user={user} showBackButton>
      <div className="m-auto w-full">
        <PageHeader title="Crear nueva receta" />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-5 lg:grid-cols-3"
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
          <div className="lg:col-span-2">
            <div className="h-full rounded-2xl border border-stone-200 bg-white p-4">
              <div className="flex justify-between items-center">
                <h4 className="font-amsipro text-xl font-bold text-tertiary">
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
                      <th className="text-left text-sm font-semibold text-stone-500">
                        Insumo
                      </th>
                      <th className="text-left text-sm font-semibold text-stone-500">
                        Cantidad
                      </th>
                      <th className="text-left text-sm font-semibold text-stone-500">
                        Unidad de medida
                      </th>
                      <th className="text-left text-sm font-semibold text-stone-500">
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
                            <IconSelector name="trash" className="text-danger" width="w-5" height="h-5" />
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
export const getServerSideProps: GetServerSideProps = async ctx =>
  await authUserHeader(ctx)
