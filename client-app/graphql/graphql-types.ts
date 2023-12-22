import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  ObjectId: any;
  Time: any;
};

export type Configuration = {
  __typename?: 'Configuration';
  address: Scalars['String'];
  businessName: Scalars['String'];
  email: Scalars['String'];
  id: Scalars['ObjectId'];
  measurementUnits: Array<MeasurementUnits>;
  nit?: Maybe<Scalars['String']>;
  phone: Scalars['String'];
  s3BucketUrl?: Maybe<Scalars['String']>;
  web?: Maybe<Scalars['String']>;
};

export type ConfigurationResponse = ResponseBase & {
  __typename?: 'ConfigurationResponse';
  data?: Maybe<Configuration>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type CreateProductInput = {
  code: Scalars['String'];
  cost?: InputMaybe<Scalars['Float']>;
  description: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  suggetedPrice: Scalars['Float'];
};

export type CreateStockInput = {
  lastStockEntry: Scalars['Int'];
  productId: Scalars['ObjectId'];
  quantity: Scalars['Int'];
  securityStock?: InputMaybe<Scalars['Int']>;
  units: Scalars['String'];
  warehouseId: Scalars['ObjectId'];
};

export type CreateStockMovementInput = {
  date: Scalars['Date'];
  detail?: InputMaybe<Scalars['String']>;
  quantity: Scalars['Int'];
  stockId: Scalars['ObjectId'];
  type: StockMovementTypeEnum;
};

export type CreateWarehouseInput = {
  address: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
};

export type ErrorInput = {
  __typename?: 'ErrorInput';
  field?: Maybe<Scalars['String']>;
  message: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = ResponseBase & {
  __typename?: 'LoginResponse';
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
  token?: Maybe<Scalars['String']>;
};

export type MeasurementUnits = {
  __typename?: 'MeasurementUnits';
  name: Scalars['String'];
  shortName: Scalars['String'];
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
  id: Scalars['ObjectId'];
};


export type MutationDeleteWarehouseArgs = {
  id: Scalars['ObjectId'];
};


export type MutationUpdateConfigurationArgs = {
  updateConfigurationInput: UpdateConfigurationInput;
};


export type MutationUpdateProductArgs = {
  updateProductInput: UpdateProductInput;
};


export type MutationUpdateUserArgs = {
  deleteInput?: InputMaybe<Scalars['Boolean']>;
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateWarehouseArgs = {
  updateWarehouseInput: UpdateWarehouseInput;
};

export type PaginationInput = {
  filter?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  rows?: InputMaybe<Scalars['Int']>;
};

export type Product = {
  __typename?: 'Product';
  code: Scalars['String'];
  cost?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  id: Scalars['ObjectId'];
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  suggetedPrice: Scalars['Float'];
  warehouses: Array<Scalars['ObjectId']>;
};

export type ProductResponse = ResponseBase & {
  __typename?: 'ProductResponse';
  data?: Maybe<Product>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type ProductsResponse = ResponseBase & {
  __typename?: 'ProductsResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Product>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
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
  getStocksPaginated?: Maybe<StocksResponse>;
  getUserById?: Maybe<UserResponse>;
  getUsers?: Maybe<UsersResponse>;
  getWarehouseById?: Maybe<WarehouseResponse>;
  getWarehouseStock?: Maybe<StocksResponse>;
  getWarehouses?: Maybe<WarehousesResponse>;
  login?: Maybe<LoginResponse>;
};


export type QueryGetProductByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetProductStockArgs = {
  paginationInput: PaginationInput;
  productId: Scalars['ObjectId'];
};


export type QueryGetProductsArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetProductsOutOfWarehouseArgs = {
  warehouseId: Scalars['ObjectId'];
};


export type QueryGetRolesArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetStockByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetStocksPaginatedArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetUserByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetUsersArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetWarehouseByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetWarehouseStockArgs = {
  paginationInput: PaginationInput;
  warehouseId: Scalars['ObjectId'];
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
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type ResponseBase = {
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type Role = {
  __typename?: 'Role';
  code: Scalars['String'];
  id: Scalars['ObjectId'];
  name: Scalars['String'];
  status: Scalars['Boolean'];
};

export type RolesResponse = ResponseBase & {
  __typename?: 'RolesResponse';
  data?: Maybe<Array<Maybe<Role>>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export enum StatusEnum {
  ERROR = 'ERROR',
  OK = 'OK'
}

export type Stock = {
  __typename?: 'Stock';
  id: Scalars['ObjectId'];
  lastStockEntry: Scalars['Int'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId'];
  quantity: Scalars['Int'];
  securityStock?: Maybe<Scalars['Int']>;
  units: Scalars['String'];
  warehouse?: Maybe<Warehouse>;
  warehouseId: Scalars['ObjectId'];
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
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type StocksResponse = ResponseBase & {
  __typename?: 'StocksResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Stock>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
};

export type UpdateConfigurationInput = {
  address?: InputMaybe<Scalars['String']>;
  businessName?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectId'];
  measurementUnits?: InputMaybe<Array<UpdateMeasurementUnitsInput>>;
  nit?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  s3BucketUrl?: InputMaybe<Scalars['String']>;
  web?: InputMaybe<Scalars['String']>;
};

export type UpdateMeasurementUnitsInput = {
  name: Scalars['String'];
  shortName: Scalars['String'];
};

export type UpdateProductInput = {
  code?: InputMaybe<Scalars['String']>;
  cost?: InputMaybe<Scalars['Float']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectId'];
  image?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  suggetedPrice?: InputMaybe<Scalars['Float']>;
};

export type UpdateUserInput = {
  email?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectId'];
  lastName?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  roleId?: InputMaybe<Scalars['ObjectId']>;
  status?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateWarehouseInput = {
  address?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectId'];
  name?: InputMaybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  createdBy?: Maybe<Scalars['ObjectId']>;
  email: Scalars['String'];
  id: Scalars['ObjectId'];
  lastLogin?: Maybe<Scalars['Date']>;
  lastName: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
  roleId: Scalars['ObjectId'];
  roleInfo?: Maybe<Role>;
  status: Scalars['Boolean'];
};

export type UserInput = {
  email: Scalars['String'];
  lastName: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  phone: Scalars['String'];
  roleId: Scalars['ObjectId'];
};

export type UserResponse = ResponseBase & {
  __typename?: 'UserResponse';
  data?: Maybe<User>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type UsersResponse = ResponseBase & {
  __typename?: 'UsersResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<User>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
};

export type Warehouse = {
  __typename?: 'Warehouse';
  address: Scalars['String'];
  description: Scalars['String'];
  id: Scalars['ObjectId'];
  name: Scalars['String'];
};

export type WarehouseResponse = ResponseBase & {
  __typename?: 'WarehouseResponse';
  data?: Maybe<Warehouse>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type WarehouseStockPaginationInput = {
  filter?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  rows?: InputMaybe<Scalars['Int']>;
  warehouses: Array<Scalars['ObjectId']>;
};

export type WarehousesResponse = ResponseBase & {
  __typename?: 'WarehousesResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Warehouse>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
};

export type CreateUserMutationVariables = Exact<{
  userInput: UserInput;
}>;


export type CreateUserMutation = { __typename?: 'Mutation', createUser?: { __typename?: 'UserResponse', message?: string | null, status: StatusEnum, errorInput?: Array<{ __typename?: 'ErrorInput', field?: string | null, message: string }> | null } | null };

export type UpdateUserMutationVariables = Exact<{
  updateUserInput: UpdateUserInput;
  deleteInput?: InputMaybe<Scalars['Boolean']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser?: { __typename?: 'UserResponse', message?: string | null, status: StatusEnum, errorInput?: Array<{ __typename?: 'ErrorInput', field?: string | null, message: string }> | null } | null };

export type CreateProductMutationVariables = Exact<{
  createProductInput: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'ProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', field?: string | null, message: string }> | null, data?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null } | null };

export type UpdateProductMutationVariables = Exact<{
  updateProductInput: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'ProductResponse', message?: string | null, status: StatusEnum, data?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['ObjectId'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct?: { __typename?: 'ProductResponse', message?: string | null, status: StatusEnum, data?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CreateStockMutationVariables = Exact<{
  createStockInput: CreateStockInput;
}>;


export type CreateStockMutation = { __typename?: 'Mutation', createStock?: { __typename?: 'StockResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null } | null };

export type CreatStockMovementMutationVariables = Exact<{
  createStockMovementInput: CreateStockMovementInput;
}>;


export type CreatStockMovementMutation = { __typename?: 'Mutation', creatStockMovement?: { __typename?: 'StockResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null } | null };

export type GetConfigurationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConfigurationQuery = { __typename?: 'Query', getConfiguration?: { __typename?: 'ConfigurationResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', field?: string | null, message: string }> | null, data?: { __typename?: 'Configuration', id: any, businessName: string, nit?: string | null, phone: string, email: string, web?: string | null, address: string, s3BucketUrl?: string | null, measurementUnits: Array<{ __typename?: 'MeasurementUnits', name: string, shortName: string }> } | null } | null };

export type LoginQueryVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login?: { __typename?: 'LoginResponse', message?: string | null, status: StatusEnum, token?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', field?: string | null, message: string }> | null } | null };

export type CurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type CurrentUserQuery = { __typename?: 'Query', currentUser?: { __typename?: 'UserResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null } | null };

export type GetUsersQueryVariables = Exact<{
  paginationInput: PaginationInput;
}>;


export type GetUsersQuery = { __typename?: 'Query', getUsers?: { __typename?: 'UsersResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', field?: string | null, message: string }> | null, data?: Array<{ __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any }> | null } | null };

export type GetProductsQueryVariables = Exact<{
  paginationInput: PaginationInput;
}>;


export type GetProductsQuery = { __typename?: 'Query', getProducts?: { __typename?: 'ProductsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> }> | null } | null };

export type GetWarehousesQueryVariables = Exact<{
  paginationInput: PaginationInput;
}>;


export type GetWarehousesQuery = { __typename?: 'Query', getWarehouses?: { __typename?: 'WarehousesResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Warehouse', id: any, name: string, description: string, address: string }> | null } | null };

export type CreateWarehouseMutationVariables = Exact<{
  createWarehouseInput: CreateWarehouseInput;
}>;


export type CreateWarehouseMutation = { __typename?: 'Mutation', createWarehouse?: { __typename?: 'WarehouseResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null };

export type UpdateWarehouseMutationVariables = Exact<{
  updateWarehouseInput: UpdateWarehouseInput;
}>;


export type UpdateWarehouseMutation = { __typename?: 'Mutation', updateWarehouse?: { __typename?: 'WarehouseResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null };

export type DeleteWarehouseMutationVariables = Exact<{
  deleteWarehouseId: Scalars['ObjectId'];
}>;


export type DeleteWarehouseMutation = { __typename?: 'Mutation', deleteWarehouse?: { __typename?: 'WarehouseResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null };

export type GetStocksPaginatedQueryVariables = Exact<{
  paginationInput: PaginationInput;
}>;


export type GetStocksPaginatedQuery = { __typename?: 'Query', getStocksPaginated?: { __typename?: 'StocksResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null }> | null } | null };

export type GetStockByIdQueryVariables = Exact<{
  getStockByIdId: Scalars['ObjectId'];
}>;


export type GetStockByIdQuery = { __typename?: 'Query', getStockById?: { __typename?: 'StockResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null } | null };

export type GetWarehouseByIdQueryVariables = Exact<{
  getWarehouseByIdId: Scalars['ObjectId'];
}>;


export type GetWarehouseByIdQuery = { __typename?: 'Query', getWarehouseById?: { __typename?: 'WarehouseResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null };


export const CreateUserDocument = gql`
    mutation CreateUser($userInput: UserInput!) {
  createUser(userInput: $userInput) {
    errorInput {
      field
      message
    }
    message
    status
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      userInput: // value for 'userInput'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($updateUserInput: UpdateUserInput!, $deleteInput: Boolean) {
  updateUser(updateUserInput: $updateUserInput, deleteInput: $deleteInput) {
    errorInput {
      field
      message
    }
    message
    status
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      updateUserInput: // value for 'updateUserInput'
 *      deleteInput: // value for 'deleteInput'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($createProductInput: CreateProductInput!) {
  createProduct(createProductInput: $createProductInput) {
    errorInput {
      field
      message
    }
    status
    message
    data {
      id
      name
      suggetedPrice
      code
      description
      cost
      image
      warehouses
    }
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      createProductInput: // value for 'createProductInput'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const UpdateProductDocument = gql`
    mutation UpdateProduct($updateProductInput: UpdateProductInput!) {
  updateProduct(updateProductInput: $updateProductInput) {
    data {
      id
      name
      suggetedPrice
      code
      description
      cost
      image
      warehouses
    }
    errorInput {
      message
      field
    }
    message
    status
  }
}
    `;
export type UpdateProductMutationFn = Apollo.MutationFunction<UpdateProductMutation, UpdateProductMutationVariables>;

/**
 * __useUpdateProductMutation__
 *
 * To run a mutation, you first call `useUpdateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProductMutation, { data, loading, error }] = useUpdateProductMutation({
 *   variables: {
 *      updateProductInput: // value for 'updateProductInput'
 *   },
 * });
 */
export function useUpdateProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProductMutation, UpdateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProductMutation, UpdateProductMutationVariables>(UpdateProductDocument, options);
      }
export type UpdateProductMutationHookResult = ReturnType<typeof useUpdateProductMutation>;
export type UpdateProductMutationResult = Apollo.MutationResult<UpdateProductMutation>;
export type UpdateProductMutationOptions = Apollo.BaseMutationOptions<UpdateProductMutation, UpdateProductMutationVariables>;
export const DeleteProductDocument = gql`
    mutation DeleteProduct($deleteProductId: ObjectId!) {
  deleteProduct(id: $deleteProductId) {
    data {
      id
      name
      suggetedPrice
      code
      description
      cost
      image
      warehouses
    }
    errorInput {
      message
      field
    }
    message
    status
  }
}
    `;
export type DeleteProductMutationFn = Apollo.MutationFunction<DeleteProductMutation, DeleteProductMutationVariables>;

/**
 * __useDeleteProductMutation__
 *
 * To run a mutation, you first call `useDeleteProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteProductMutation, { data, loading, error }] = useDeleteProductMutation({
 *   variables: {
 *      deleteProductId: // value for 'deleteProductId'
 *   },
 * });
 */
export function useDeleteProductMutation(baseOptions?: Apollo.MutationHookOptions<DeleteProductMutation, DeleteProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteProductMutation, DeleteProductMutationVariables>(DeleteProductDocument, options);
      }
export type DeleteProductMutationHookResult = ReturnType<typeof useDeleteProductMutation>;
export type DeleteProductMutationResult = Apollo.MutationResult<DeleteProductMutation>;
export type DeleteProductMutationOptions = Apollo.BaseMutationOptions<DeleteProductMutation, DeleteProductMutationVariables>;
export const CreateStockDocument = gql`
    mutation CreateStock($createStockInput: CreateStockInput!) {
  createStock(createStockInput: $createStockInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      productId
      warehouseId
      quantity
      securityStock
      units
      product {
        id
        name
        suggetedPrice
        code
        description
        cost
        image
        warehouses
      }
      warehouse {
        id
        id
        name
        description
        address
        name
        description
        address
      }
    }
  }
}
    `;
export type CreateStockMutationFn = Apollo.MutationFunction<CreateStockMutation, CreateStockMutationVariables>;

/**
 * __useCreateStockMutation__
 *
 * To run a mutation, you first call `useCreateStockMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateStockMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createStockMutation, { data, loading, error }] = useCreateStockMutation({
 *   variables: {
 *      createStockInput: // value for 'createStockInput'
 *   },
 * });
 */
export function useCreateStockMutation(baseOptions?: Apollo.MutationHookOptions<CreateStockMutation, CreateStockMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateStockMutation, CreateStockMutationVariables>(CreateStockDocument, options);
      }
export type CreateStockMutationHookResult = ReturnType<typeof useCreateStockMutation>;
export type CreateStockMutationResult = Apollo.MutationResult<CreateStockMutation>;
export type CreateStockMutationOptions = Apollo.BaseMutationOptions<CreateStockMutation, CreateStockMutationVariables>;
export const CreatStockMovementDocument = gql`
    mutation CreatStockMovement($createStockMovementInput: CreateStockMovementInput!) {
  creatStockMovement(createStockMovementInput: $createStockMovementInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      productId
      warehouseId
      quantity
      securityStock
      units
      product {
        id
        name
        suggetedPrice
        code
        description
        cost
        image
        warehouses
      }
      warehouse {
        id
        name
        description
        address
      }
    }
  }
}
    `;
export type CreatStockMovementMutationFn = Apollo.MutationFunction<CreatStockMovementMutation, CreatStockMovementMutationVariables>;

/**
 * __useCreatStockMovementMutation__
 *
 * To run a mutation, you first call `useCreatStockMovementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatStockMovementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [creatStockMovementMutation, { data, loading, error }] = useCreatStockMovementMutation({
 *   variables: {
 *      createStockMovementInput: // value for 'createStockMovementInput'
 *   },
 * });
 */
export function useCreatStockMovementMutation(baseOptions?: Apollo.MutationHookOptions<CreatStockMovementMutation, CreatStockMovementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatStockMovementMutation, CreatStockMovementMutationVariables>(CreatStockMovementDocument, options);
      }
export type CreatStockMovementMutationHookResult = ReturnType<typeof useCreatStockMovementMutation>;
export type CreatStockMovementMutationResult = Apollo.MutationResult<CreatStockMovementMutation>;
export type CreatStockMovementMutationOptions = Apollo.BaseMutationOptions<CreatStockMovementMutation, CreatStockMovementMutationVariables>;
export const GetConfigurationDocument = gql`
    query GetConfiguration {
  getConfiguration {
    errorInput {
      field
      message
    }
    status
    message
    data {
      id
      businessName
      nit
      phone
      email
      web
      address
      s3BucketUrl
      measurementUnits {
        name
        shortName
      }
    }
  }
}
    `;

/**
 * __useGetConfigurationQuery__
 *
 * To run a query within a React component, call `useGetConfigurationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConfigurationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConfigurationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConfigurationQuery(baseOptions?: Apollo.QueryHookOptions<GetConfigurationQuery, GetConfigurationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConfigurationQuery, GetConfigurationQueryVariables>(GetConfigurationDocument, options);
      }
export function useGetConfigurationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConfigurationQuery, GetConfigurationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConfigurationQuery, GetConfigurationQueryVariables>(GetConfigurationDocument, options);
        }
export type GetConfigurationQueryHookResult = ReturnType<typeof useGetConfigurationQuery>;
export type GetConfigurationLazyQueryHookResult = ReturnType<typeof useGetConfigurationLazyQuery>;
export type GetConfigurationQueryResult = Apollo.QueryResult<GetConfigurationQuery, GetConfigurationQueryVariables>;
export const LoginDocument = gql`
    query Login($loginInput: LoginInput!) {
  login(loginInput: $loginInput) {
    errorInput {
      field
      message
    }
    message
    status
    token
  }
}
    `;

/**
 * __useLoginQuery__
 *
 * To run a query within a React component, call `useLoginQuery` and pass it any options that fit your needs.
 * When your component renders, `useLoginQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLoginQuery({
 *   variables: {
 *      loginInput: // value for 'loginInput'
 *   },
 * });
 */
export function useLoginQuery(baseOptions: Apollo.QueryHookOptions<LoginQuery, LoginQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
      }
export function useLoginLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LoginQuery, LoginQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LoginQuery, LoginQueryVariables>(LoginDocument, options);
        }
export type LoginQueryHookResult = ReturnType<typeof useLoginQuery>;
export type LoginLazyQueryHookResult = ReturnType<typeof useLoginLazyQuery>;
export type LoginQueryResult = Apollo.QueryResult<LoginQuery, LoginQueryVariables>;
export const CurrentUserDocument = gql`
    query CurrentUser {
  currentUser {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      lastName
      email
      phone
      lastLogin
      status
      createdBy
      roleId
      roleInfo {
        id
        name
        code
        status
      }
    }
  }
}
    `;

/**
 * __useCurrentUserQuery__
 *
 * To run a query within a React component, call `useCurrentUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useCurrentUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCurrentUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useCurrentUserQuery(baseOptions?: Apollo.QueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
      }
export function useCurrentUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CurrentUserQuery, CurrentUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CurrentUserQuery, CurrentUserQueryVariables>(CurrentUserDocument, options);
        }
export type CurrentUserQueryHookResult = ReturnType<typeof useCurrentUserQuery>;
export type CurrentUserLazyQueryHookResult = ReturnType<typeof useCurrentUserLazyQuery>;
export type CurrentUserQueryResult = Apollo.QueryResult<CurrentUserQuery, CurrentUserQueryVariables>;
export const GetUsersDocument = gql`
    query GetUsers($paginationInput: PaginationInput!) {
  getUsers(paginationInput: $paginationInput) {
    errorInput {
      field
      message
    }
    status
    message
    data {
      id
      name
      lastName
      email
      phone
      lastLogin
      status
      createdBy
      roleId
    }
    totalRecords
    totalPages
    rows
    currentPage
  }
}
    `;

/**
 * __useGetUsersQuery__
 *
 * To run a query within a React component, call `useGetUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUsersQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *   },
 * });
 */
export function useGetUsersQuery(baseOptions: Apollo.QueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
      }
export function useGetUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUsersQuery, GetUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUsersQuery, GetUsersQueryVariables>(GetUsersDocument, options);
        }
export type GetUsersQueryHookResult = ReturnType<typeof useGetUsersQuery>;
export type GetUsersLazyQueryHookResult = ReturnType<typeof useGetUsersLazyQuery>;
export type GetUsersQueryResult = Apollo.QueryResult<GetUsersQuery, GetUsersQueryVariables>;
export const GetProductsDocument = gql`
    query GetProducts($paginationInput: PaginationInput!) {
  getProducts(paginationInput: $paginationInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      suggetedPrice
      code
      description
      cost
      image
      warehouses
    }
    totalRecords
    totalPages
    rows
    currentPage
  }
}
    `;

/**
 * __useGetProductsQuery__
 *
 * To run a query within a React component, call `useGetProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *   },
 * });
 */
export function useGetProductsQuery(baseOptions: Apollo.QueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
      }
export function useGetProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsQuery, GetProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsQuery, GetProductsQueryVariables>(GetProductsDocument, options);
        }
export type GetProductsQueryHookResult = ReturnType<typeof useGetProductsQuery>;
export type GetProductsLazyQueryHookResult = ReturnType<typeof useGetProductsLazyQuery>;
export type GetProductsQueryResult = Apollo.QueryResult<GetProductsQuery, GetProductsQueryVariables>;
export const GetWarehousesDocument = gql`
    query GetWarehouses($paginationInput: PaginationInput!) {
  getWarehouses(paginationInput: $paginationInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      description
      address
    }
    totalRecords
    totalPages
    rows
    currentPage
  }
}
    `;

/**
 * __useGetWarehousesQuery__
 *
 * To run a query within a React component, call `useGetWarehousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehousesQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *   },
 * });
 */
export function useGetWarehousesQuery(baseOptions: Apollo.QueryHookOptions<GetWarehousesQuery, GetWarehousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehousesQuery, GetWarehousesQueryVariables>(GetWarehousesDocument, options);
      }
export function useGetWarehousesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehousesQuery, GetWarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehousesQuery, GetWarehousesQueryVariables>(GetWarehousesDocument, options);
        }
export type GetWarehousesQueryHookResult = ReturnType<typeof useGetWarehousesQuery>;
export type GetWarehousesLazyQueryHookResult = ReturnType<typeof useGetWarehousesLazyQuery>;
export type GetWarehousesQueryResult = Apollo.QueryResult<GetWarehousesQuery, GetWarehousesQueryVariables>;
export const CreateWarehouseDocument = gql`
    mutation CreateWarehouse($createWarehouseInput: CreateWarehouseInput!) {
  createWarehouse(createWarehouseInput: $createWarehouseInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      description
      address
    }
  }
}
    `;
export type CreateWarehouseMutationFn = Apollo.MutationFunction<CreateWarehouseMutation, CreateWarehouseMutationVariables>;

/**
 * __useCreateWarehouseMutation__
 *
 * To run a mutation, you first call `useCreateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWarehouseMutation, { data, loading, error }] = useCreateWarehouseMutation({
 *   variables: {
 *      createWarehouseInput: // value for 'createWarehouseInput'
 *   },
 * });
 */
export function useCreateWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<CreateWarehouseMutation, CreateWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWarehouseMutation, CreateWarehouseMutationVariables>(CreateWarehouseDocument, options);
      }
export type CreateWarehouseMutationHookResult = ReturnType<typeof useCreateWarehouseMutation>;
export type CreateWarehouseMutationResult = Apollo.MutationResult<CreateWarehouseMutation>;
export type CreateWarehouseMutationOptions = Apollo.BaseMutationOptions<CreateWarehouseMutation, CreateWarehouseMutationVariables>;
export const UpdateWarehouseDocument = gql`
    mutation UpdateWarehouse($updateWarehouseInput: UpdateWarehouseInput!) {
  updateWarehouse(updateWarehouseInput: $updateWarehouseInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      description
      address
    }
  }
}
    `;
export type UpdateWarehouseMutationFn = Apollo.MutationFunction<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;

/**
 * __useUpdateWarehouseMutation__
 *
 * To run a mutation, you first call `useUpdateWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWarehouseMutation, { data, loading, error }] = useUpdateWarehouseMutation({
 *   variables: {
 *      updateWarehouseInput: // value for 'updateWarehouseInput'
 *   },
 * });
 */
export function useUpdateWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>(UpdateWarehouseDocument, options);
      }
export type UpdateWarehouseMutationHookResult = ReturnType<typeof useUpdateWarehouseMutation>;
export type UpdateWarehouseMutationResult = Apollo.MutationResult<UpdateWarehouseMutation>;
export type UpdateWarehouseMutationOptions = Apollo.BaseMutationOptions<UpdateWarehouseMutation, UpdateWarehouseMutationVariables>;
export const DeleteWarehouseDocument = gql`
    mutation DeleteWarehouse($deleteWarehouseId: ObjectId!) {
  deleteWarehouse(id: $deleteWarehouseId) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      description
      address
    }
  }
}
    `;
export type DeleteWarehouseMutationFn = Apollo.MutationFunction<DeleteWarehouseMutation, DeleteWarehouseMutationVariables>;

/**
 * __useDeleteWarehouseMutation__
 *
 * To run a mutation, you first call `useDeleteWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWarehouseMutation, { data, loading, error }] = useDeleteWarehouseMutation({
 *   variables: {
 *      deleteWarehouseId: // value for 'deleteWarehouseId'
 *   },
 * });
 */
export function useDeleteWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWarehouseMutation, DeleteWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWarehouseMutation, DeleteWarehouseMutationVariables>(DeleteWarehouseDocument, options);
      }
export type DeleteWarehouseMutationHookResult = ReturnType<typeof useDeleteWarehouseMutation>;
export type DeleteWarehouseMutationResult = Apollo.MutationResult<DeleteWarehouseMutation>;
export type DeleteWarehouseMutationOptions = Apollo.BaseMutationOptions<DeleteWarehouseMutation, DeleteWarehouseMutationVariables>;
export const GetStocksPaginatedDocument = gql`
    query GetStocksPaginated($paginationInput: PaginationInput!) {
  getStocksPaginated(paginationInput: $paginationInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      productId
      warehouseId
      quantity
      securityStock
      units
      product {
        id
        name
        suggetedPrice
        code
        description
        cost
        image
        warehouses
      }
      warehouse {
        id
        name
        description
        address
      }
    }
    totalRecords
    totalPages
    rows
    currentPage
  }
}
    `;

/**
 * __useGetStocksPaginatedQuery__
 *
 * To run a query within a React component, call `useGetStocksPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStocksPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStocksPaginatedQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *   },
 * });
 */
export function useGetStocksPaginatedQuery(baseOptions: Apollo.QueryHookOptions<GetStocksPaginatedQuery, GetStocksPaginatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStocksPaginatedQuery, GetStocksPaginatedQueryVariables>(GetStocksPaginatedDocument, options);
      }
export function useGetStocksPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStocksPaginatedQuery, GetStocksPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStocksPaginatedQuery, GetStocksPaginatedQueryVariables>(GetStocksPaginatedDocument, options);
        }
export type GetStocksPaginatedQueryHookResult = ReturnType<typeof useGetStocksPaginatedQuery>;
export type GetStocksPaginatedLazyQueryHookResult = ReturnType<typeof useGetStocksPaginatedLazyQuery>;
export type GetStocksPaginatedQueryResult = Apollo.QueryResult<GetStocksPaginatedQuery, GetStocksPaginatedQueryVariables>;
export const GetStockByIdDocument = gql`
    query GetStockById($getStockByIdId: ObjectId!) {
  getStockById(id: $getStockByIdId) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      productId
      warehouseId
      quantity
      securityStock
      units
      product {
        id
        name
        suggetedPrice
        code
        description
        cost
        image
        warehouses
      }
      warehouse {
        id
        name
        description
        address
      }
    }
  }
}
    `;

/**
 * __useGetStockByIdQuery__
 *
 * To run a query within a React component, call `useGetStockByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockByIdQuery({
 *   variables: {
 *      getStockByIdId: // value for 'getStockByIdId'
 *   },
 * });
 */
export function useGetStockByIdQuery(baseOptions: Apollo.QueryHookOptions<GetStockByIdQuery, GetStockByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStockByIdQuery, GetStockByIdQueryVariables>(GetStockByIdDocument, options);
      }
export function useGetStockByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStockByIdQuery, GetStockByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStockByIdQuery, GetStockByIdQueryVariables>(GetStockByIdDocument, options);
        }
export type GetStockByIdQueryHookResult = ReturnType<typeof useGetStockByIdQuery>;
export type GetStockByIdLazyQueryHookResult = ReturnType<typeof useGetStockByIdLazyQuery>;
export type GetStockByIdQueryResult = Apollo.QueryResult<GetStockByIdQuery, GetStockByIdQueryVariables>;
export const GetWarehouseByIdDocument = gql`
    query GetWarehouseById($getWarehouseByIdId: ObjectId!) {
  getWarehouseById(id: $getWarehouseByIdId) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      description
      address
    }
  }
}
    `;

/**
 * __useGetWarehouseByIdQuery__
 *
 * To run a query within a React component, call `useGetWarehouseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehouseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehouseByIdQuery({
 *   variables: {
 *      getWarehouseByIdId: // value for 'getWarehouseByIdId'
 *   },
 * });
 */
export function useGetWarehouseByIdQuery(baseOptions: Apollo.QueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
      }
export function useGetWarehouseByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>(GetWarehouseByIdDocument, options);
        }
export type GetWarehouseByIdQueryHookResult = ReturnType<typeof useGetWarehouseByIdQuery>;
export type GetWarehouseByIdLazyQueryHookResult = ReturnType<typeof useGetWarehouseByIdLazyQuery>;
export type GetWarehouseByIdQueryResult = Apollo.QueryResult<GetWarehouseByIdQuery, GetWarehouseByIdQueryVariables>;