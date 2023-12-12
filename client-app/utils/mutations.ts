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
      price
      code
      units
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
      price
      code
      units
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
      price
      code
      units
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