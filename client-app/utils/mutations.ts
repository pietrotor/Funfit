import { gql } from '@apollo/client'
export const CREATE_USER = gql`
mutation CreateUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    errorInput {
      field
      message
    }
    message
    status
  }
}   
`
export const UPDATE_USER = gql`
mutation UpdateUser($updateUserInput: UpdateUserInput!, $deleteInput: Boolean) {
  updateUser(updateUserInput: $updateUserInput, deleteInput: $deleteInput) {
    errorInput {
      field
      message
    }
    message
    status
  },
  
}
`
export const CREATE_PRODUCT = gql`
mutation CreateProduct($createProductInput: CreateProductInput!) {
  createProduct(createProductInput: $createProductInput) {
    errorInput {
      field
      message
    }
    status
    message
    data {
      id
      name
      suggetedPrice
      code
      description
      cost
      image
      warehouses
    }
  }
}
`
export const UPDATE_PRODUCT = gql`
mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
  updateProduct(updateProductInput: $updateProductInput) {
    data {
      id
      name
      suggetedPrice
      code
      description
      cost
      image
      warehouses
    }
    errorInput {
      message
      field
    }
    message
    status
  }
}
`

export const DELETE_PRODUCT = gql`
mutation DeleteProduct($deleteProductId: ObjectId!) {
  deleteProduct(id: $deleteProductId) {
    data {
      id
      name
      suggetedPrice
      code
      description
      cost
      image
      warehouses
    }
    errorInput {
      message
      field
    }
    message
    status
  }
}
`
export const CREATE_STOCK = gql`
mutation CreateStock($createStockInput: CreateStockInput!) {
  createStock(createStockInput: $createStockInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      productId
      warehouseId
      quantity
      securityStock
      lastStockEntry
      units
      product {
        id
        name
        suggetedPrice
        code
        description
        cost
        image
        warehouses
      }
      warehouse {
        id
        name
        description
        address
      }
    }
  }
}
`
export const CREATE_STOCK_MOVEMENT = gql`
mutation CreatStockMovement($createStockMovementInput: CreateStockMovementInput!) {
  creatStockMovement(createStockMovementInput: $createStockMovementInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      productId
      warehouseId
      quantity
      securityStock
        units
      product {
        id
        name
        suggetedPrice
        code
        description
        cost
        image
        warehouses
      }
      warehouse {
        id
        name
        description
        address
      }
    }
  }
}
`
