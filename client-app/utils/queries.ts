import { gql } from '@apollo/client'

export const LOGIN = gql`
  query Login($loginInput: LoginInput!) {
    login(loginInput: $loginInput) {
      errorInput {
        field
        message
      }
      message
      status
      token
    }
  }
`
export const CURRENT_USER = gql`
  query CurrentUser {
  currentUser {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      lastName
      email
      phone
      lastLogin
      status
      createdBy
      roleId
      roleInfo {
        id
        name
        code
        status
      }
    }
  }
}
`

export const GET_USERS = gql`
  query GetUsers($paginationInput: PaginationInput!) {
    getUsers(paginationInput: $paginationInput) {
      errorInput {
        field
        message
      }
      status
      message
      data {
        id
        name
        lastName
        email
        phone
        lastLogin
        status
        createdBy
        roleId
      }
      totalRecords
      totalPages
      rows
      currentPage
    }
  }
`
export const GET_PRODUCTS = gql`
query GetProducts($paginationInput: PaginationInput!) {
  getProducts(paginationInput: $paginationInput) {
    errorInput {
      message
      field
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
    totalRecords
    totalPages
    rows
    currentPage
  }
}
`
