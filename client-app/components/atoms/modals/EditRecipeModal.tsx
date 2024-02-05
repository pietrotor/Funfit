import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { MyModal } from './MyModal'
import ButtonComponent from '../Button'
import InputComponent from '../Input'
import IconSelector from '../IconSelector'
import Selector from '../InputSelector'
import ComboInput from '../ComboInput'
import { RecipeFormProps } from '../../../pages/administration-panel/recipies/AddRecipe'
import { TDataRecipes } from '@/interfaces/TData'
type EditRecipeModalProps = {
  isOpen: boolean
  onClose: () => void
  values?: TDataRecipes
  handleSendUpdateRecipe?: any
}
export const EditRecipeModal = ({
  isOpen,
  onClose,
  values,
  handleSendUpdateRecipe
}: EditRecipeModalProps) => {
  const { control, handleSubmit, reset } = useForm()
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
  useEffect(() => {
    reset({
      name: values?.name
    })
  }, [values])

  return (
    <MyModal
      title="Editar receta"
      message="Aquí puedes editar la receta"
      color="warning"
      control={control}
      loading={false}
      handleCancel={onClose}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      isOpen={isOpen}
      onClose={onClose}
      size="3xl"
    >
      <div
        className=" m-auto flex w-5/6 flex-col items-center space-y-4 pb-9 pt-8 text-gray-500"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-full rounded-md ">
          <div className="flex flex-col items-center justify-between">
            <div className="flex w-full items-center justify-between space-x-10 px-2">
              <InputComponent
                name="name"
                label="Nombre de la receta"
                control={control}
                defaultValue={values?.name}
              />
              <ButtonComponent
                showTooltip
                type="submit"
                tooltipText="añadir insumo"
                onClick={handleAddRow}
              >
                <IconSelector
                  name="Plus"
                  className="text-secondary"
                  width="w-5"
                  height="h-5"
                />
              </ButtonComponent>
            </div>
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
                </tr>
              </thead>
              <tbody>
                {values?.ingredients.map((row, idx) => (
                  <tr key={idx}>
                    <td className="pe-2">
                      <ComboInput
                        name={`insume-${idx}`}
                        defaultValue={(idx + 1).toString()}
                        label="Insumo"
                        onChange={getProducts}
                        control={control}
                        options={
                          values?.ingredients.map(ingredient => ({
                            label: ingredient.name,
                            value: ingredient.id.toString()
                          })) || []
                        }
                        onClick={() => {}}
                      />
                    </td>
                    <td className="pe-2">
                      <InputComponent
                        defaultValue={row.quantity.toString()}
                        name={`quantity-${idx}`}
                        label="Cantidad"
                        control={control}
                      />
                    </td>
                    <td>
                      <Selector
                        name={`units-${idx}`}
                        label="Unidad"
                        defaultValue={'1'}
                        control={control}
                        options={[
                          { label: 'Kg', value: '1' },
                          { label: 'L', value: '2' }
                        ]}
                      />
                    </td>
                    <td className=" ps-2 text-center">
                      <ButtonComponent
                        showTooltip
                        tooltipText="eliminar insumo"
                        onClick={() => {
                          const newRows = [...rows]
                          newRows.splice(idx, 1)
                          setRows(newRows)
                        }}
                      >
                        <IconSelector
                          name="trash"
                          className="text-red-500"
                          width="w-5"
                          height="h-5"
                        />
                      </ButtonComponent>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </MyModal>
  )
}
