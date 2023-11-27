import { StatusEnum } from '@/graphql/graphql_types'
import { CustomError } from './custom.error'
import { ValidationError } from 'yup'
export const errorHandler = (err: unknown) => {
  if (err instanceof ValidationError) {
    const errorInput = err.inner.map(e => ({ field: e.path, message: e.message }))
    return {
      message: 'error en la validación',
      status: StatusEnum.ERROR,
      errorInput
    }
  }
  if (err instanceof CustomError) {
    return err.serializeErrors()
  }
  console.error(err)
  return {
    message: 'Error no encontrado',
    status: StatusEnum.ERROR
  }
}
