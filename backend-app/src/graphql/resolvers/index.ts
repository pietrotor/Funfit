import { GraphQLTime } from "graphql-scalars";
import { Resolvers } from "../graphql_types";
import dateTimeScalar from "../scalars/date.scalar";
import ObjectIdScalar from "../scalars/objectid.scalar";
import { ContextGraphQl } from "../../interfaces/context.interface";
import { userMutation, userQuery, userType } from "./user.resolver";
import { roleQuery } from "./role.resolver";
const resolvers: Resolvers<ContextGraphQl> = {
  Date: dateTimeScalar,
  Time: GraphQLTime,
  ObjectId: ObjectIdScalar,
  ...userType,
  Query: {
    ...userQuery,
    ...roleQuery,
  },
  Mutation: {
    ...userMutation,
  },
};

export default resolvers;
