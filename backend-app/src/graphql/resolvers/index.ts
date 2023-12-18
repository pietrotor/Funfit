import dateTimeScalar from "../scalars/date.scalar";
import ObjectIdScalar from "../scalars/objectid.scalar";
import { GraphQLTime } from "graphql-scalars";
import { Resolvers } from "../graphql_types";
import { ContextGraphQl } from "../../interfaces/context.interface";
import { userMutation, userQuery, userType } from "./user.resolver";
import { roleQuery } from "./role.resolver";
import { productMutation, productQuery, productType } from "./product.resolver";
import {
  configurationMutation,
  configurationQuery,
  configurationType,
} from "./configuration.resolver";
import {
  warehouseMutation,
  warehouseQuery,
  warehouseType,
} from "./warehose.resolver";
import { stockMutation, stockQuery, stockType } from "./stock.resolver";

const resolvers: Resolvers<ContextGraphQl> = {
  Date: dateTimeScalar,
  Time: GraphQLTime,
  ObjectId: ObjectIdScalar,
  ...userType,
  ...productType,
  ...warehouseType,
  ...configurationType,
  ...stockType,
  Query: {
    ...userQuery,
    ...roleQuery,
    ...productQuery,
    ...warehouseQuery,
    ...configurationQuery,
    ...stockQuery,
  },
  Mutation: {
    ...userMutation,
    ...productMutation,
    ...warehouseMutation,
    ...configurationMutation,
    ...stockMutation,
  },
};

export default resolvers;
