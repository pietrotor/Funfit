import React, { useState } from 'react'
import { Button, Image, useDisclosure } from '@nextui-org/react'
import AdministrationLayout from '@/components/templates/layouts'
import Table from '@/components/organisms/tableNext/Table'
import IconSelector from '@/components/atoms/IconSelector'
import { AddProductModal } from '@/components/atoms/modals/AddProductModal'
import { EditProductModal, TValueProductData } from '@/components/atoms/modals/EditProductModal'
import { ConfirmModal } from '@/components/atoms/modals/ConfirmModal'

const Productos = () => {
  const [editProduct, setEditProduct] = useState <TValueProductData>({})
  const handleAddProduct = useDisclosure()
  const handleEditProduct = useDisclosure()
  const handleConfirmDeleteProduct = useDisclosure()

  const handleUpdateProduct = (productId: number) => {
    console.log(productId)
    setEditProduct({
      id: productId,
      name: 'Pastel de crema de cacahuate',
      units: 10,
      description: 'Pastel de crema de cacahuate con chocolate y nuez',
      cost: 150,
      image: 'https://www.onfitnesscenter.com/inscripcion-gimnasio/modules//smartblog/images/189-single-default.jpg'
    })
    handleEditProduct.onOpen()
  }

  const handleSendUpdateUser = async (values: TValueProductData) => {
    try {
      console.log(values)
    } catch (error) {
      console.log(error)
    }
  }
  const products = [{
    id: 1,
    name: 'Pastel de crema de cacahuate',
    units: 10,
    description: 'Pastel de crema de cacahuate con chocolate y nuez',
    cost: 150,
    image: 'https://www.onfitnesscenter.com/inscripcion-gimnasio/modules//smartblog/images/189-single-default.jpg'
  },
  {
    id: 2,
    name: 'Pastel de chocolate',
    units: 10,
    description: 'Pastel de chocolate con chocolate y nuez',
    cost: 160,
    image: 'https://www.onfitnesscenter.com/inscripcion-gimnasio/modules//smartblog/images/189-single-default.jpg'
  },
  {
    id: 3,
    name: 'Pastel de fresa',
    units: 10,
    description: 'Pastel de fresa con chocolate y nuez',
    cost: 170,
    image: 'https://www.onfitnesscenter.com/inscripcion-gimnasio/modules//smartblog/images/189-single-default.jpg'
  }
  ]

  const handleDeleteUser = (productId: number) => {
    console.log(productId)
    setEditProduct({
      id: productId,
      name: 'Pastel de crema de cacahuate',
      units: 10,
      description: 'Pastel de crema de cacahuate con chocolate y nuez',
      cost: 150,
      image: 'https://www.onfitnesscenter.com/inscripcion-gimnasio/modules//smartblog/images/189-single-default.jpg'
    })
    handleConfirmDeleteProduct.onOpen()
  }
  return <AdministrationLayout>
    <div className="m-auto w-5/6 mt-16 ">
    <h2 className='text-center font-extrabold text-2xl text-gray-500 '>Administración de productos</h2>
    <Button onClick={handleAddProduct.onOpen} color="secondary" className="float-right my-4 text-gray-600">
          Agregar nuevo producto
          <IconSelector name="addUser" />
        </Button>
      <Table
      tableName='Productos'
      titles={
        [
          { name: '#' },
          { name: 'Imagen' },
          { name: 'Nombre' },
          { name: 'Costo' },
          { name: 'Descripción' },
          { name: 'Unidades' },
          { name: 'Acciones' }
        ]
      }
      items={ products.map((product, idx) => ({
        content: [idx + 1,
        <Image alt='image' src={ product.image} key={idx}/>,
        <div key={idx} className='text-sm text-left'>{product.name}</div>,
        product.cost + ' Bs.',
        <div key={idx} className='text-sm text-left'>{product.description}</div>,
        product.units + ' Unidades',
      <div key={idx} className="flex space-x-3">
        <Button
          onClick={() => handleUpdateProduct(product.id)}
          color="secondary"
          className="w-1/2"
        >
          Editar
        </Button>
        <Button onClick={() => handleDeleteUser(product.id)} color="danger" className="w-1/2">
          Eliminar
        </Button>
      </div>
        ]
      }))} />
    </div>
    <AddProductModal
      isOpen={handleAddProduct.isOpen}
      onClose={handleAddProduct.onClose}/>
    <EditProductModal
      isOpen={handleEditProduct.isOpen}
      onClose={handleEditProduct.onClose}
      handleSendUpdateUser={ handleSendUpdateUser}
      values={ editProduct }
    />

    <ConfirmModal
      onCancel={() => console.log()}
      title='Eliminar producto'
      onConfirm={ () => console.log()}
      message={`Seguro que quiere eliminar a ${editProduct.name} ?`}
      isOpen={handleConfirmDeleteProduct.isOpen}
      onClose={handleConfirmDeleteProduct.onClose}
    />

  </AdministrationLayout>
}

export default Productos
