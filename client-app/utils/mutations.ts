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
