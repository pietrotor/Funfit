import { MyModal } from './MyModal'
import Images from '../Image/Image'
import { TDataRecipes } from '@/interfaces/TData'

type SelectBranchModalProps = {
  isOpen: boolean
  onClose: () => void
  data: TDataRecipes
}

export const ShowRecipeListModal = ({
  isOpen,
  onClose,
  data
}: SelectBranchModalProps) => {
  return (
    <MyModal
      title="Lista de ingredientes"
      message="A continuación se muestra la lista de ingredientes que se necesitan para preparar esta receta"
      isForm={false}
      onSubmit={onClose}
      isOpen={isOpen}
      color="information"
      handleCancel={onClose}
      onClose={onClose}
      hideCloseButton={false}
      size={'xl'}
    >
      <section className=" relative space-y-3  bg-cover bg-center px-8 ">
        <div className="my-5 ">
          <ul className="flex flex-col text-center">
            {data.ingredients.map(ingredient => (
              <li
                className="  mb-1 flex items-center justify-between rounded-md bg-slate-200/50 px-2 py-1 text-lg font-semibold"
                key={ingredient.id}
              >
                <p className="flex items-center justify-center ">
                  <Images
                    alt="No image available"
                    src="https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg"
                    className="me-3 h-16 w-16 rounded-md object-cover  "
                  />
                  {ingredient.name}{' '}
                </p>
                <p className="me-2 flex items-center">
                  {ingredient.quantity + 'Kg'}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MyModal>
  )
}
