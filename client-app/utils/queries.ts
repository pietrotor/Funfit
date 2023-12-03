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
}`

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
