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
