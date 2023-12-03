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
mutation UpdateUser($updateUserInput: UpdateUserInput!) {
  updateUser(updateUserInput: $updateUserInput) {
    errorInput {
      field
      message
    }
    message
    status
  }
}
`
