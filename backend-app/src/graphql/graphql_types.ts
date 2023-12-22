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

export type Configuration = {
  __typename?: 'Configuration';
  address: Scalars['String']['output'];
  businessName: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  measurementUnits: Array<MeasurementUnits>;
  nit?: Maybe<Scalars['String']['output']>;
  phone: Scalars['String']['output'];
  s3BucketUrl?: Maybe<Scalars['String']['output']>;
  web?: Maybe<Scalars['String']['output']>;
};

export type ConfigurationResponse = ResponseBase & {
  __typename?: 'ConfigurationResponse';
  data?: Maybe<Configuration>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type CreateProductInput = {
  code: Scalars['String']['input'];
  cost?: InputMaybe<Scalars['Float']['input']>;
  description: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  suggetedPrice: Scalars['Float']['input'];
};

export type CreateStockInput = {
  lastStockEntry: Scalars['Int']['input'];
  productId: Scalars['ObjectId']['input'];
  quantity: Scalars['Int']['input'];
  securityStock?: InputMaybe<Scalars['Int']['input']>;
  units: Scalars['String']['input'];
  warehouseId: Scalars['ObjectId']['input'];
};

export type CreateStockMovementInput = {
  date: Scalars['Date']['input'];
  detail?: InputMaybe<Scalars['String']['input']>;
  quantity: Scalars['Int']['input'];
  stockId: Scalars['ObjectId']['input'];
  type: StockMovementTypeEnum;
};

export type CreateWarehouseInput = {
  address: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
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

export type MeasurementUnits = {
  __typename?: 'MeasurementUnits';
  name: Scalars['String']['output'];
  shortName: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  creatStockMovement?: Maybe<StockResponse>;
  createProduct?: Maybe<ProductResponse>;
  createStock?: Maybe<StockResponse>;
  createUser?: Maybe<UserResponse>;
  createWarehouse?: Maybe<WarehouseResponse>;
  deleteProduct?: Maybe<ProductResponse>;
  deleteWarehouse?: Maybe<WarehouseResponse>;
  updateConfiguration?: Maybe<ConfigurationResponse>;
  updateProduct?: Maybe<ProductResponse>;
  updateUser?: Maybe<UserResponse>;
  updateWarehouse?: Maybe<WarehouseResponse>;
};


export type MutationCreatStockMovementArgs = {
  createStockMovementInput: CreateStockMovementInput;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateStockArgs = {
  createStockInput: CreateStockInput;
};


export type MutationCreateUserArgs = {
  userInput: UserInput;
};


export type MutationCreateWarehouseArgs = {
  createWarehouseInput: CreateWarehouseInput;
};


export type MutationDeleteProductArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteWarehouseArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationUpdateConfigurationArgs = {
  updateConfigurationInput: UpdateConfigurationInput;
};


export type MutationUpdateProductArgs = {
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateUserArgs = {
  deleteInput?: InputMaybe<Scalars['Boolean']['input']>;
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateWarehouseArgs = {
  updateWarehouseInput: UpdateWarehouseInput;
};

export type PaginationInput = {
  filter?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  rows?: InputMaybe<Scalars['Int']['input']>;
};

export type Product = {
  __typename?: 'Product';
  code: Scalars['String']['output'];
  cost?: Maybe<Scalars['Float']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  suggetedPrice: Scalars['Float']['output'];
  warehouses: Array<Scalars['ObjectId']['output']>;
};

export type ProductResponse = ResponseBase & {
  __typename?: 'ProductResponse';
  data?: Maybe<Product>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type ProductsResponse = ResponseBase & {
  __typename?: 'ProductsResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Product>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<UserResponse>;
  getConfiguration?: Maybe<ConfigurationResponse>;
  getProductById?: Maybe<ProductResponse>;
  getProductStock?: Maybe<StocksResponse>;
  getProducts?: Maybe<ProductsResponse>;
  getProductsOutOfWarehouse?: Maybe<ProductsResponse>;
  getRoles?: Maybe<RolesResponse>;
  getStockById?: Maybe<StockResponse>;
  getStockHistory?: Maybe<StocksHistoryResponse>;
  getStocksPaginated?: Maybe<StocksResponse>;
  getUserById?: Maybe<UserResponse>;
  getUsers?: Maybe<UsersResponse>;
  getWarehouseById?: Maybe<WarehouseResponse>;
  getWarehouseHistory?: Maybe<WarehouseHistoryResponse>;
  getWarehouseStock?: Maybe<StocksResponse>;
  getWarehouses?: Maybe<WarehousesResponse>;
  login?: Maybe<LoginResponse>;
};


export type QueryGetProductByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetProductStockArgs = {
  paginationInput: PaginationInput;
  productId: Scalars['ObjectId']['input'];
};


export type QueryGetProductsArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetProductsOutOfWarehouseArgs = {
  warehouseId: Scalars['ObjectId']['input'];
};


export type QueryGetRolesArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetStockByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetStockHistoryArgs = {
  paginationInput: PaginationInput;
  stockId: Scalars['ObjectId']['input'];
};


export type QueryGetStocksPaginatedArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetUsersArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetWarehouseByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetWarehouseHistoryArgs = {
  paginationInput: PaginationInput;
  warehouseId: Scalars['ObjectId']['input'];
};


export type QueryGetWarehouseStockArgs = {
  paginationInput: PaginationInput;
  warehouseId: Scalars['ObjectId']['input'];
};


export type QueryGetWarehousesArgs = {
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

export type Stock = {
  __typename?: 'Stock';
  id: Scalars['ObjectId']['output'];
  lastStockEntry: Scalars['Int']['output'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId']['output'];
  quantity: Scalars['Int']['output'];
  securityStock?: Maybe<Scalars['Int']['output']>;
  units: Scalars['String']['output'];
  warehouse?: Maybe<Warehouse>;
  warehouseId: Scalars['ObjectId']['output'];
};

export type StockHistory = {
  __typename?: 'StockHistory';
  createdBy?: Maybe<Scalars['ObjectId']['output']>;
  createdByInfo?: Maybe<User>;
  date: Scalars['Date']['output'];
  id: Scalars['ObjectId']['output'];
  quantity: Scalars['Int']['output'];
  stock?: Maybe<Stock>;
  stockBefore: Scalars['Int']['output'];
  stockId: Scalars['ObjectId']['output'];
  stockLater: Scalars['Int']['output'];
  type: StockMovementTypeEnum;
  warehouse?: Maybe<Warehouse>;
  warehouseId: Scalars['ObjectId']['output'];
};

export enum StockMovementTypeEnum {
  DISPOSE = 'DISPOSE',
  INWARD = 'INWARD',
  OUTWARD = 'OUTWARD'
}

export type StockResponse = ResponseBase & {
  __typename?: 'StockResponse';
  data?: Maybe<Stock>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type StocksHistoryResponse = ResponseBase & {
  __typename?: 'StocksHistoryResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<StockHistory>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type StocksResponse = ResponseBase & {
  __typename?: 'StocksResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Stock>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type UpdateConfigurationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  businessName?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
  measurementUnits?: InputMaybe<Array<UpdateMeasurementUnitsInput>>;
  nit?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  s3BucketUrl?: InputMaybe<Scalars['String']['input']>;
  web?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMeasurementUnitsInput = {
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
};

export type UpdateProductInput = {
  code?: InputMaybe<Scalars['String']['input']>;
  cost?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  suggetedPrice?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  roleId?: InputMaybe<Scalars['ObjectId']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateWarehouseInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
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
  email: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  password: Scalars['String']['input'];
  phone: Scalars['String']['input'];
  roleId: Scalars['ObjectId']['input'];
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

export type Warehouse = {
  __typename?: 'Warehouse';
  address: Scalars['String']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
};

export type WarehouseHistoryResponse = ResponseBase & {
  __typename?: 'WarehouseHistoryResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<StockHistory>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type WarehouseResponse = ResponseBase & {
  __typename?: 'WarehouseResponse';
  data?: Maybe<Warehouse>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type WarehouseStockPaginationInput = {
  filter?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  rows?: InputMaybe<Scalars['Int']['input']>;
  warehouses: Array<Scalars['ObjectId']['input']>;
};

export type WarehousesResponse = ResponseBase & {
  __typename?: 'WarehousesResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Warehouse>>;
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
  ResponseBase: ( ConfigurationResponse ) | ( LoginResponse ) | ( ProductResponse ) | ( ProductsResponse ) | ( Response ) | ( RolesResponse ) | ( StockResponse ) | ( StocksHistoryResponse ) | ( StocksResponse ) | ( UserResponse ) | ( UsersResponse ) | ( WarehouseHistoryResponse ) | ( WarehouseResponse ) | ( WarehousesResponse );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Configuration: ResolverTypeWrapper<Configuration>;
  ConfigurationResponse: ResolverTypeWrapper<ConfigurationResponse>;
  CreateProductInput: CreateProductInput;
  CreateStockInput: CreateStockInput;
  CreateStockMovementInput: CreateStockMovementInput;
  CreateWarehouseInput: CreateWarehouseInput;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  ErrorInput: ResolverTypeWrapper<ErrorInput>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  MeasurementUnits: ResolverTypeWrapper<MeasurementUnits>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  PaginationInput: PaginationInput;
  Product: ResolverTypeWrapper<Product>;
  ProductResponse: ResolverTypeWrapper<ProductResponse>;
  ProductsResponse: ResolverTypeWrapper<ProductsResponse>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  ResponseBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ResponseBase']>;
  Role: ResolverTypeWrapper<Role>;
  RolesResponse: ResolverTypeWrapper<RolesResponse>;
  StatusEnum: StatusEnum;
  Stock: ResolverTypeWrapper<Stock>;
  StockHistory: ResolverTypeWrapper<StockHistory>;
  StockMovementTypeEnum: StockMovementTypeEnum;
  StockResponse: ResolverTypeWrapper<StockResponse>;
  StocksHistoryResponse: ResolverTypeWrapper<StocksHistoryResponse>;
  StocksResponse: ResolverTypeWrapper<StocksResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  UpdateConfigurationInput: UpdateConfigurationInput;
  UpdateMeasurementUnitsInput: UpdateMeasurementUnitsInput;
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWarehouseInput: UpdateWarehouseInput;
  User: ResolverTypeWrapper<User>;
  UserInput: UserInput;
  UserResponse: ResolverTypeWrapper<UserResponse>;
  UsersResponse: ResolverTypeWrapper<UsersResponse>;
  Warehouse: ResolverTypeWrapper<Warehouse>;
  WarehouseHistoryResponse: ResolverTypeWrapper<WarehouseHistoryResponse>;
  WarehouseResponse: ResolverTypeWrapper<WarehouseResponse>;
  WarehouseStockPaginationInput: WarehouseStockPaginationInput;
  WarehousesResponse: ResolverTypeWrapper<WarehousesResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean']['output'];
  Configuration: Configuration;
  ConfigurationResponse: ConfigurationResponse;
  CreateProductInput: CreateProductInput;
  CreateStockInput: CreateStockInput;
  CreateStockMovementInput: CreateStockMovementInput;
  CreateWarehouseInput: CreateWarehouseInput;
  Date: Scalars['Date']['output'];
  ErrorInput: ErrorInput;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  LoginResponse: LoginResponse;
  MeasurementUnits: MeasurementUnits;
  Mutation: {};
  ObjectId: Scalars['ObjectId']['output'];
  PaginationInput: PaginationInput;
  Product: Product;
  ProductResponse: ProductResponse;
  ProductsResponse: ProductsResponse;
  Query: {};
  Response: Response;
  ResponseBase: ResolversInterfaceTypes<ResolversParentTypes>['ResponseBase'];
  Role: Role;
  RolesResponse: RolesResponse;
  Stock: Stock;
  StockHistory: StockHistory;
  StockResponse: StockResponse;
  StocksHistoryResponse: StocksHistoryResponse;
  StocksResponse: StocksResponse;
  String: Scalars['String']['output'];
  Time: Scalars['Time']['output'];
  UpdateConfigurationInput: UpdateConfigurationInput;
  UpdateMeasurementUnitsInput: UpdateMeasurementUnitsInput;
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWarehouseInput: UpdateWarehouseInput;
  User: User;
  UserInput: UserInput;
  UserResponse: UserResponse;
  UsersResponse: UsersResponse;
  Warehouse: Warehouse;
  WarehouseHistoryResponse: WarehouseHistoryResponse;
  WarehouseResponse: WarehouseResponse;
  WarehouseStockPaginationInput: WarehouseStockPaginationInput;
  WarehousesResponse: WarehousesResponse;
};

export type ConfigurationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Configuration'] = ResolversParentTypes['Configuration']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  businessName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  measurementUnits?: Resolver<Array<ResolversTypes['MeasurementUnits']>, ParentType, ContextType>;
  nit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  s3BucketUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  web?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ConfigurationResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ConfigurationResponse'] = ResolversParentTypes['ConfigurationResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Configuration']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type MeasurementUnitsResolvers<ContextType = any, ParentType extends ResolversParentTypes['MeasurementUnits'] = ResolversParentTypes['MeasurementUnits']> = {
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  shortName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  creatStockMovement?: Resolver<Maybe<ResolversTypes['StockResponse']>, ParentType, ContextType, RequireFields<MutationCreatStockMovementArgs, 'createStockMovementInput'>>;
  createProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'createProductInput'>>;
  createStock?: Resolver<Maybe<ResolversTypes['StockResponse']>, ParentType, ContextType, RequireFields<MutationCreateStockArgs, 'createStockInput'>>;
  createUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  createWarehouse?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<MutationCreateWarehouseArgs, 'createWarehouseInput'>>;
  deleteProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteWarehouse?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<MutationDeleteWarehouseArgs, 'id'>>;
  updateConfiguration?: Resolver<Maybe<ResolversTypes['ConfigurationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateConfigurationArgs, 'updateConfigurationInput'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'updateProductInput'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'deleteInput' | 'updateUserInput'>>;
  updateWarehouse?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<MutationUpdateWarehouseArgs, 'updateWarehouseInput'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  suggetedPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  warehouses?: Resolver<Array<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductResponse'] = ResolversParentTypes['ProductResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductsResponse'] = ResolversParentTypes['ProductsResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['Product']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  getConfiguration?: Resolver<Maybe<ResolversTypes['ConfigurationResponse']>, ParentType, ContextType>;
  getProductById?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<QueryGetProductByIdArgs, 'id'>>;
  getProductStock?: Resolver<Maybe<ResolversTypes['StocksResponse']>, ParentType, ContextType, RequireFields<QueryGetProductStockArgs, 'paginationInput' | 'productId'>>;
  getProducts?: Resolver<Maybe<ResolversTypes['ProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetProductsArgs, 'paginationInput'>>;
  getProductsOutOfWarehouse?: Resolver<Maybe<ResolversTypes['ProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetProductsOutOfWarehouseArgs, 'warehouseId'>>;
  getRoles?: Resolver<Maybe<ResolversTypes['RolesResponse']>, ParentType, ContextType, RequireFields<QueryGetRolesArgs, 'paginationInput'>>;
  getStockById?: Resolver<Maybe<ResolversTypes['StockResponse']>, ParentType, ContextType, RequireFields<QueryGetStockByIdArgs, 'id'>>;
  getStockHistory?: Resolver<Maybe<ResolversTypes['StocksHistoryResponse']>, ParentType, ContextType, RequireFields<QueryGetStockHistoryArgs, 'paginationInput' | 'stockId'>>;
  getStocksPaginated?: Resolver<Maybe<ResolversTypes['StocksResponse']>, ParentType, ContextType, RequireFields<QueryGetStocksPaginatedArgs, 'paginationInput'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUsers?: Resolver<Maybe<ResolversTypes['UsersResponse']>, ParentType, ContextType, RequireFields<QueryGetUsersArgs, 'paginationInput'>>;
  getWarehouseById?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<QueryGetWarehouseByIdArgs, 'id'>>;
  getWarehouseHistory?: Resolver<Maybe<ResolversTypes['WarehouseHistoryResponse']>, ParentType, ContextType, RequireFields<QueryGetWarehouseHistoryArgs, 'paginationInput' | 'warehouseId'>>;
  getWarehouseStock?: Resolver<Maybe<ResolversTypes['StocksResponse']>, ParentType, ContextType, RequireFields<QueryGetWarehouseStockArgs, 'paginationInput' | 'warehouseId'>>;
  getWarehouses?: Resolver<Maybe<ResolversTypes['WarehousesResponse']>, ParentType, ContextType, RequireFields<QueryGetWarehousesArgs, 'paginationInput'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginResponse']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'loginInput'>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseBase'] = ResolversParentTypes['ResponseBase']> = {
  __resolveType: TypeResolveFn<'ConfigurationResponse' | 'LoginResponse' | 'ProductResponse' | 'ProductsResponse' | 'Response' | 'RolesResponse' | 'StockResponse' | 'StocksHistoryResponse' | 'StocksResponse' | 'UserResponse' | 'UsersResponse' | 'WarehouseHistoryResponse' | 'WarehouseResponse' | 'WarehousesResponse', ParentType, ContextType>;
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

export type StockResolvers<ContextType = any, ParentType extends ResolversParentTypes['Stock'] = ResolversParentTypes['Stock']> = {
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  lastStockEntry?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  securityStock?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  units?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StockHistoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockHistory'] = ResolversParentTypes['StockHistory']> = {
  createdBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  createdByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  quantity?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stock?: Resolver<Maybe<ResolversTypes['Stock']>, ParentType, ContextType>;
  stockBefore?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  stockId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  stockLater?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['StockMovementTypeEnum'], ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StockResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StockResponse'] = ResolversParentTypes['StockResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Stock']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StocksHistoryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StocksHistoryResponse'] = ResolversParentTypes['StocksHistoryResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['StockHistory']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StocksResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['StocksResponse'] = ResolversParentTypes['StocksResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['Stock']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
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

export type WarehouseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Warehouse'] = ResolversParentTypes['Warehouse']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseHistoryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseHistoryResponse'] = ResolversParentTypes['WarehouseHistoryResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['StockHistory']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehouseResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehouseResponse'] = ResolversParentTypes['WarehouseResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type WarehousesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['WarehousesResponse'] = ResolversParentTypes['WarehousesResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['Warehouse']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Configuration?: ConfigurationResolvers<ContextType>;
  ConfigurationResponse?: ConfigurationResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  ErrorInput?: ErrorInputResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  MeasurementUnits?: MeasurementUnitsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  Product?: ProductResolvers<ContextType>;
  ProductResponse?: ProductResponseResolvers<ContextType>;
  ProductsResponse?: ProductsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  ResponseBase?: ResponseBaseResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RolesResponse?: RolesResponseResolvers<ContextType>;
  Stock?: StockResolvers<ContextType>;
  StockHistory?: StockHistoryResolvers<ContextType>;
  StockResponse?: StockResponseResolvers<ContextType>;
  StocksHistoryResponse?: StocksHistoryResponseResolvers<ContextType>;
  StocksResponse?: StocksResponseResolvers<ContextType>;
  Time?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UsersResponse?: UsersResponseResolvers<ContextType>;
  Warehouse?: WarehouseResolvers<ContextType>;
  WarehouseHistoryResponse?: WarehouseHistoryResponseResolvers<ContextType>;
  WarehouseResponse?: WarehouseResponseResolvers<ContextType>;
  WarehousesResponse?: WarehousesResponseResolvers<ContextType>;
};

