import { StatusEnum } from '@/graphql/graphql_types'

interface IError {
  message: string
  field?: string
}
export interface OutErrorResponse {
  errorInput?: IError[]
  message: string
  status: StatusEnum
}
export abstract class CustomError extends Error {
  abstract status: StatusEnum
  readonly errorInput?: IError[]
  constructor(message: string, errorInput?: IError[]) {
    super(message)
    if (errorInput) {
      this.errorInput = errorInput
    }
    Object.setPrototypeOf(this, CustomError.prototype)
  }

  abstract serializeErrors(): OutErrorResponse
}
