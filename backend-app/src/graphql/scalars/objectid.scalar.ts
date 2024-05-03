import { GraphQLScalarType, Kind } from 'graphql'
import { Types } from 'mongoose'

const ObjectIdScalar = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'Mongo object id scalar type',
  parseValue(value: unknown) {
    return new Types.ObjectId(value as string) // value from the client input variables
  },
  serialize(value: any) {
    console.log('🚀 ~ serialize ~ value:', value)
    return new Types.ObjectId(value).toHexString() // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return new Types.ObjectId(ast.value) // value from the client query
    }
    return null
  }
})
export default ObjectIdScalar

export type ObjectId = Types.ObjectId
