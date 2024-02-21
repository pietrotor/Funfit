import { MyModal } from './MyModal'
import Images from '../Image/Image'
import { TSaleProduct } from '@/interfaces/TData'

interface IProductsListModalProps {
  isOpen: boolean
  values: TSaleProduct[]
  onClose: () => void
  order?: boolean
}

function ProductListModal({
  isOpen,
  values,
  onClose,
  order = false
}: IProductsListModalProps) {
  return (
    <MyModal
      title="Lista de productos"
      message="A continuación se muestra la lista de productos"
      isForm={false}
      onSubmit={onClose}
      isOpen={isOpen}
      handleCancel={onClose}
      onClose={onClose}
      hideCloseButton={false}
      hideSuccessButton
      size={'xl'}
    >
      <section className=" relative space-y-3  bg-cover bg-center px-8 ">
        <div className="my-5 ">
          <ul className="flex flex-col text-center">
            {values?.map(product => (
              <li
                className="  mb-1 flex items-center justify-between rounded-md bg-slate-200/50 px-2 py-1 text-lg font-semibold"
                key={product.product.id}
              >
                <p className="flex items-center justify-center ">
                  <Images
                    alt="No image available"
                    src={
                      product?.product?.image ||
                      'https://st4.depositphotos.com/14953852/24787/v/450/depositphotos_247872612-stock-illustration-no-image-available-icon-vector.jpg'
                    }
                    className="me-3 h-16 w-16 rounded-md object-cover  "
                  />
                  {product.product.name}{' '}
                </p>
                {order ? (
                  <p className="flex items-center justify-center ">
                    {product.qty} x Bs.{product.price}
                  </p>
                ) : (
                  <p className="flex items-center justify-center ">
                    {product.qty}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </MyModal>
  )
}

export default ProductListModal
