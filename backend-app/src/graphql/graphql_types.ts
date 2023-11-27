import { ObjectId } from './scalars/objectid.scalar';
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  ObjectId: { input: ObjectId; output: ObjectId; }
  Time: { input: any; output: any; }
};

export type ErrorInput = {
  __typename?: 'ErrorInput';
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type LoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type LoginResponse = ResponseBase & {
  __typename?: 'LoginResponse';
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
  token?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser?: Maybe<Response>;
  updateUser?: Maybe<Response>;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationUpdateUserArgs = {
  deleteInput?: InputMaybe<Scalars['Boolean']['input']>;
  updateUserInput: UpdateUserInput;
};

export type PaginationInput = {
  filter?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  rows?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<UserResponse>;
  getRoles?: Maybe<RolesResponse>;
  getUserById?: Maybe<UserResponse>;
  getUsers?: Maybe<UsersResponse>;
  login?: Maybe<LoginResponse>;
};


export type QueryGetRolesArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetUserByIdArgs = {
  businessId: Scalars['ObjectId']['input'];
  id: Scalars['ObjectId']['input'];
};


export type QueryGetUsersArgs = {
  paginationInput: PaginationInput;
};


export type QueryLoginArgs = {
  loginInput: LoginInput;
};

export type Response = ResponseBase & {
  __typename?: 'Response';
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type ResponseBase = {
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type Role = {
  __typename?: 'Role';
  code: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
};

export type RolesResponse = ResponseBase & {
  __typename?: 'RolesResponse';
  data?: Maybe<Array<Maybe<Role>>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export enum StatusEnum {
  ERROR = 'ERROR',
  OK = 'OK'
}

export type UpdateUserInput = {
  businessId: Scalars['ObjectId']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['ObjectId']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type User = {
  __typename?: 'User';
  createdBy?: Maybe<Scalars['ObjectId']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  lastLogin?: Maybe<Scalars['Date']['output']>;
  lastName: Scalars['String']['output'];
  name: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  roleId: Scalars['ObjectId']['output'];
  roleInfo?: Maybe<Role>;
  status: Scalars['Boolean']['output'];
};

export type UserInput = {
  businessId: Scalars['ObjectId']['input'];
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  roleId?: InputMaybe<Scalars['ObjectId']['input']>;
};

export type UserResponse = ResponseBase & {
  __typename?: 'UserResponse';
  data?: Maybe<User>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type UsersResponse = ResponseBase & {
  __typename?: 'UsersResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<User>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;


/** Mapping of interface types */
export type ResolversInterfaceTypes<RefType extends Record<string, unknown>> = {
  ResponseBase: ( LoginResponse ) | ( Response ) | ( RolesResponse ) | ( UserResponse ) | ( UsersResponse );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  ErrorInput: ResolverTypeWrapper<ErrorInput>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  PaginationInput: PaginationInput;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  ResponseBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ResponseBase']>;
  Role: ResolverTypeWrapper<Role>;
  RolesResponse: ResolverTypeWrapper<RolesResponse>;
  StatusEnum: StatusEnum;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UsersResponse: ResolverTypeWrapper<UsersResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Date: Scalars['Date']['output'];
  ErrorInput: ErrorInput;
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  LoginResponse: LoginResponse;
  Mutation: {};
  ObjectId: Scalars['ObjectId']['output'];
  PaginationInput: PaginationInput;
  Query: {};
  Response: Response;
  ResponseBase: ResolversInterfaceTypes<ResolversParentTypes>['ResponseBase'];
  Role: Role;
  RolesResponse: RolesResponse;
  String: Scalars['String']['output'];
  Time: Scalars['Time']['output'];
  UpdateUserInput: UpdateUserInput;
  User: User;
  UserInput: UserInput;
  UserResponse: UserResponse;
  UsersResponse: UsersResponse;
};

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type ErrorInputResolvers<ContextType = any, ParentType extends ResolversParentTypes['ErrorInput'] = ResolversParentTypes['ErrorInput']> = {
  field?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type LoginResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['LoginResponse'] = ResolversParentTypes['LoginResponse']> = {
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createUser?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['Response']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'deleteInput' | 'updateUserInput'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  getRoles?: Resolver<Maybe<ResolversTypes['RolesResponse']>, ParentType, ContextType, RequireFields<QueryGetRolesArgs, 'paginationInput'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'businessId' | 'id'>>;
  getUsers?: Resolver<Maybe<ResolversTypes['UsersResponse']>, ParentType, ContextType, RequireFields<QueryGetUsersArgs, 'paginationInput'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginResponse']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'loginInput'>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseBase'] = ResolversParentTypes['ResponseBase']> = {
  __resolveType: TypeResolveFn<'LoginResponse' | 'Response' | 'RolesResponse' | 'UserResponse' | 'UsersResponse', ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RolesResponse'] = ResolversParentTypes['RolesResponse']> = {
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface TimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Time'], any> {
  name: 'Time';
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  createdBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  lastLogin?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  roleId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  roleInfo?: Resolver<Maybe<ResolversTypes['Role']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UserResponse'] = ResolversParentTypes['UserResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UsersResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['UsersResponse'] = ResolversParentTypes['UsersResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['User']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  ErrorInput?: ErrorInputResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  ResponseBase?: ResponseBaseResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RolesResponse?: RolesResponseResolvers<ContextType>;
  Time?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UsersResponse?: UsersResponseResolvers<ContextType>;
};

