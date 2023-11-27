import { StatusEnum } from '@/graphql/graphql_types'
import { CustomError } from './custom.error'
export class NotAuthorizedError extends CustomError {
  status = StatusEnum.ERROR
  constructor () {
    super('no autorizado')
    // only because we are extending a built in class
    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  serializeErrors () {
    return {
      status: this.status,
      message: this.message
    }
  }
}
