import { GraphQLTime } from 'graphql-scalars'
import { Resolvers } from '../graphql_types'
import dateTimeScalar from '../scalars/date.scalar'
import ObjectIdScalar from '../scalars/objectid.scalar'
import { ContextGraphQl } from '../../interfaces/context.interface'
import { userMutation, userQuery, userType } from './user.resolver'
const resolvers: Resolvers<ContextGraphQl> = {
  Date: dateTimeScalar,
  Time: GraphQLTime,
  ObjectId: ObjectIdScalar,
  ...userType,
  Query: {
    ...userQuery
  },
  Mutation: {
    ...userMutation
  }
}

export default resolvers
