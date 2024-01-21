import dateTimeScalar from '../scalars/date.scalar'
import ObjectIdScalar from '../scalars/objectid.scalar'
import { GraphQLTime } from 'graphql-scalars'
import { Resolvers } from '../graphql_types'
import { ContextGraphQl } from '../../interfaces/context.interface'
import { userMutation, userQuery, userType } from './user.resolver'
import { roleQuery } from './role.resolver'
import { productMutation, productQuery, productType } from './product.resolver'
import {
  configurationMutation,
  configurationQuery,
  configurationType
} from './configuration.resolver'
import {
  warehouseMutation,
  warehouseQuery,
  warehouseType
} from './warehose.resolver'
import { stockMutation, stockQuery, stockType } from './stock.resolver'
import {
  stockHistoryMutation,
  stockHistoryQuery,
  stockHistoryType
} from './stockHistory.resolver'
import { branchMutation, branchQuery, branchType } from './branch.resolver'
import {
  branchProductMutation,
  branchProductQuery,
  branchProductType
} from './branchProduct.resolver'
import { cashMutation, cashQuery, cashType } from './cash.resolver'
import { saleMutation, saleQuery, saleType } from './sale.resolver'

const resolvers: Resolvers<ContextGraphQl> = {
  Date: dateTimeScalar,
  Time: GraphQLTime,
  ObjectId: ObjectIdScalar,
  ...userType,
  ...productType,
  ...warehouseType,
  ...configurationType,
  ...stockType,
  ...stockHistoryType,
  ...branchType,
  ...branchProductType,
  ...cashType,
  ...saleType,
  Query: {
    ...userQuery,
    ...roleQuery,
    ...productQuery,
    ...warehouseQuery,
    ...configurationQuery,
    ...stockQuery,
    ...stockHistoryQuery,
    ...branchQuery,
    ...branchProductQuery,
    ...cashQuery,
    ...saleQuery
  },
  Mutation: {
    ...userMutation,
    ...productMutation,
    ...warehouseMutation,
    ...configurationMutation,
    ...stockMutation,
    ...stockHistoryMutation,
    ...branchMutation,
    ...branchProductMutation,
    ...cashMutation,
    ...saleMutation
  }
}

export default resolvers
