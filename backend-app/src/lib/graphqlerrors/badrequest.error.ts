import { StatusEnum } from '@/graphql/graphql_types'
import { CustomError } from './custom.error'
export class BadRequestError extends CustomError {
  status = StatusEnum.ERROR

  constructor (public message: string) {
    super(message)
    // only because we are extending a built in class
    Object.setPrototypeOf(this, BadRequestError.prototype)
  }

  serializeErrors () {
    return {
      status: this.status,
      message: this.message
    }
  }
}
