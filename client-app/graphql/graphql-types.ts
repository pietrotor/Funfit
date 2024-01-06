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

export type Branch = {
  __typename?: 'Branch';
  cash?: Maybe<Cash>;
  cashId: Scalars['ObjectId'];
  city: Scalars['String'];
  code: Scalars['String'];
  direction: Scalars['String'];
  id: Scalars['ObjectId'];
  name: Scalars['String'];
  nit?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
};

export type BranchProduct = {
  __typename?: 'BranchProduct';
  branch?: Maybe<Branch>;
  branchId: Scalars['ObjectId'];
  id: Scalars['ObjectId'];
  isVisibleOnMenu: Scalars['Boolean'];
  isVisibleOnWeb: Scalars['Boolean'];
  price: Scalars['Float'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId'];
};

export type BranchProductResponse = ResponseBase & {
  __typename?: 'BranchProductResponse';
  data?: Maybe<BranchProduct>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type BranchProductsResponse = ResponseBase & {
  __typename?: 'BranchProductsResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<BranchProduct>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
};

export type BranchResponse = ResponseBase & {
  __typename?: 'BranchResponse';
  data?: Maybe<Branch>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type BranchsResponse = ResponseBase & {
  __typename?: 'BranchsResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Branch>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
};

export type Cash = {
  __typename?: 'Cash';
  amount: Scalars['Float'];
  branchId: Scalars['ObjectId'];
  currentTurn?: Maybe<Turn>;
  currentTurnId?: Maybe<Scalars['ObjectId']>;
  id: Scalars['ObjectId'];
  isOpen: Scalars['Boolean'];
};

export type CashResponse = ResponseBase & {
  __typename?: 'CashResponse';
  data?: Maybe<Cash>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type CloseTurnInfo = {
  __typename?: 'CloseTurnInfo';
  amount: Scalars['Float'];
  closeBy: Scalars['ObjectId'];
  closeByInfo?: Maybe<User>;
  date: Scalars['Date'];
  difference: Scalars['Float'];
  observation?: Maybe<Scalars['String']>;
  physicialAmount: Scalars['Float'];
};

export type CloseTurnInput = {
  amount: Scalars['Float'];
  cashId: Scalars['ObjectId'];
  difference: Scalars['Float'];
  observation?: InputMaybe<Scalars['String']>;
  physicialAmount: Scalars['Float'];
  turnId: Scalars['ObjectId'];
  updateToPhysicialAmount: Scalars['Boolean'];
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

export type CreateBranchInput = {
  city: Scalars['String'];
  code: Scalars['String'];
  direction: Scalars['String'];
  name: Scalars['String'];
  nit?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type CreateBranchProductInput = {
  branchId: Scalars['ObjectId'];
  isVisibleOnMenu: Scalars['Boolean'];
  isVisibleOnWeb: Scalars['Boolean'];
  price: Scalars['Float'];
  productId: Scalars['ObjectId'];
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

export type CreateTurnInput = {
  amount: Scalars['Float'];
  cashId: Scalars['ObjectId'];
  difference: Scalars['Float'];
  observation?: InputMaybe<Scalars['String']>;
  physicialAmount: Scalars['Float'];
  updateToPhysicialAmount: Scalars['Boolean'];
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
  closeCash?: Maybe<CashResponse>;
  creatStockMovement?: Maybe<StockResponse>;
  createBranch?: Maybe<BranchResponse>;
  createBranchProduct?: Maybe<BranchProductResponse>;
  createProduct?: Maybe<ProductResponse>;
  createStock?: Maybe<StockResponse>;
  createUser?: Maybe<UserResponse>;
  createWarehouse?: Maybe<WarehouseResponse>;
  deleteBranch?: Maybe<BranchResponse>;
  deleteBranchProduct?: Maybe<BranchProductResponse>;
  deleteProduct?: Maybe<ProductResponse>;
  deleteWarehouse?: Maybe<WarehouseResponse>;
  openCash?: Maybe<CashResponse>;
  updateBranch?: Maybe<BranchResponse>;
  updateBranchProduct?: Maybe<BranchProductResponse>;
  updateConfiguration?: Maybe<ConfigurationResponse>;
  updateProduct?: Maybe<ProductResponse>;
  updateUser?: Maybe<UserResponse>;
  updateWarehouse?: Maybe<WarehouseResponse>;
};


export type MutationCloseCashArgs = {
  closeTurnInput: CloseTurnInput;
};


export type MutationCreatStockMovementArgs = {
  createStockMovementInput: CreateStockMovementInput;
};


export type MutationCreateBranchArgs = {
  createBranchInput: CreateBranchInput;
};


export type MutationCreateBranchProductArgs = {
  createBranchProductInput: CreateBranchProductInput;
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


export type MutationDeleteBranchArgs = {
  id: Scalars['ObjectId'];
};


export type MutationDeleteBranchProductArgs = {
  id: Scalars['ObjectId'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ObjectId'];
};


export type MutationDeleteWarehouseArgs = {
  id: Scalars['ObjectId'];
};


export type MutationOpenCashArgs = {
  createTurnInput: CreateTurnInput;
};


export type MutationUpdateBranchArgs = {
  updateBranchInput: UpdateBranchInput;
};


export type MutationUpdateBranchProductArgs = {
  updateBranchProductInput: UpdateBranchProductInput;
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

export type OpenTurnInfo = {
  __typename?: 'OpenTurnInfo';
  amount: Scalars['Float'];
  date: Scalars['Date'];
  difference: Scalars['Float'];
  observation?: Maybe<Scalars['String']>;
  openBy: Scalars['ObjectId'];
  openByInfo?: Maybe<User>;
  physicialAmount: Scalars['Float'];
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
  internalCode: Scalars['String'];
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
  getBranchById?: Maybe<BranchResponse>;
  getBranchProductById?: Maybe<BranchProductResponse>;
  getBranchProductsPaginated?: Maybe<BranchProductsResponse>;
  getBranchesPaginated?: Maybe<BranchsResponse>;
  getCashById?: Maybe<CashResponse>;
  getConfiguration?: Maybe<ConfigurationResponse>;
  getProductById?: Maybe<ProductResponse>;
  getProductStock?: Maybe<StocksResponse>;
  getProducts?: Maybe<ProductsResponse>;
  getProductsOutOfWarehouse?: Maybe<ProductsResponse>;
  getPublicProducts?: Maybe<ProductsResponse>;
  getRoles?: Maybe<RolesResponse>;
  getStockById?: Maybe<StockResponse>;
  getStockHistory?: Maybe<StocksHistoryResponse>;
  getStocksPaginated?: Maybe<StocksResponse>;
  getUserById?: Maybe<UserResponse>;
  getUsers?: Maybe<UsersResponse>;
  getWarehouseById?: Maybe<WarehouseResponse>;
  getWarehouseHistory?: Maybe<StocksHistoryResponse>;
  getWarehouseStock?: Maybe<StocksResponse>;
  getWarehouses?: Maybe<WarehousesResponse>;
  login?: Maybe<LoginResponse>;
};


export type QueryGetBranchByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetBranchProductByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetBranchProductsPaginatedArgs = {
  branchId: Scalars['ObjectId'];
  paginationInput: PaginationInput;
};


export type QueryGetBranchesPaginatedArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetCashByIdArgs = {
  id: Scalars['ObjectId'];
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
  paginationInput: PaginationInput;
  warehouseId: Scalars['ObjectId'];
};


export type QueryGetPublicProductsArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetRolesArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetStockByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetStockHistoryArgs = {
  paginationInput: PaginationInput;
  stockId: Scalars['ObjectId'];
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


export type QueryGetWarehouseHistoryArgs = {
  paginationInput: PaginationInput;
  warehouseId: Scalars['ObjectId'];
};


export type QueryGetWarehouseStockArgs = {
  warehouseStockPaginationInput: WarehouseStockPaginationInput;
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

export type StockHistory = {
  __typename?: 'StockHistory';
  createdBy?: Maybe<Scalars['ObjectId']>;
  createdByInfo?: Maybe<User>;
  date: Scalars['Date'];
  id: Scalars['ObjectId'];
  quantity: Scalars['Int'];
  stock?: Maybe<Stock>;
  stockBefore: Scalars['Int'];
  stockId: Scalars['ObjectId'];
  stockLater: Scalars['Int'];
  type: StockMovementTypeEnum;
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

export type StocksHistoryResponse = ResponseBase & {
  __typename?: 'StocksHistoryResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<StockHistory>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
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

export type Turn = {
  __typename?: 'Turn';
  cashId: Scalars['ObjectId'];
  closeInfo?: Maybe<CloseTurnInfo>;
  id: Scalars['ObjectId'];
  isOpen: Scalars['Boolean'];
  openInfo: OpenTurnInfo;
};

export type UpdateBranchInput = {
  city?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectId'];
  name?: InputMaybe<Scalars['String']>;
  nit?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
};

export type UpdateBranchProductInput = {
  id: Scalars['ObjectId'];
  isVisibleOnMenu?: InputMaybe<Scalars['Boolean']>;
  isVisibleOnWeb?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Float']>;
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


export type CreateStockMutation = { __typename?: 'Mutation', createStock?: { __typename?: 'StockResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, lastStockEntry: number, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null } | null };

export type CreatStockMovementMutationVariables = Exact<{
  createStockMovementInput: CreateStockMovementInput;
}>;


export type CreatStockMovementMutation = { __typename?: 'Mutation', creatStockMovement?: { __typename?: 'StockResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null } | null };

export type CreateBranchMutationVariables = Exact<{
  createBranchInput: CreateBranchInput;
}>;


export type CreateBranchMutation = { __typename?: 'Mutation', createBranch?: { __typename?: 'BranchResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Branch', id: any, name: string, code: string, city: string, direction: string, phone?: string | null, nit?: string | null, cashId: any, cash?: { __typename?: 'Cash', id: any } | null } | null } | null };

export type UpdateBranchMutationVariables = Exact<{
  updateBranchInput: UpdateBranchInput;
}>;


export type UpdateBranchMutation = { __typename?: 'Mutation', updateBranch?: { __typename?: 'BranchResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Branch', id: any, name: string, code: string, city: string, direction: string, phone?: string | null, nit?: string | null, cashId: any, cash?: { __typename?: 'Cash', id: any } | null } | null } | null };

export type DeleteBranchMutationVariables = Exact<{
  deleteBranchId: Scalars['ObjectId'];
}>;


export type DeleteBranchMutation = { __typename?: 'Mutation', deleteBranch?: { __typename?: 'BranchResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Branch', id: any, name: string, code: string, city: string, direction: string, phone?: string | null, nit?: string | null, cashId: any, cash?: { __typename?: 'Cash', id: any } | null } | null } | null };

export type CreateBranchProductMutationVariables = Exact<{
  createBranchProductInput: CreateBranchProductInput;
}>;


export type CreateBranchProductMutation = { __typename?: 'Mutation', createBranchProduct?: { __typename?: 'BranchProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'BranchProduct', id: any, branchId: any, productId: any, price: number, isVisibleOnWeb: boolean, isVisibleOnMenu: boolean, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, branch?: { __typename?: 'Branch', id: any, name: string, code: string, city: string, direction: string, phone?: string | null, nit?: string | null, cashId: any, cash?: { __typename?: 'Cash', id: any } | null } | null } | null } | null };

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

export type GetWarehouseByIdQueryVariables = Exact<{
  getWarehouseByIdId: Scalars['ObjectId'];
}>;


export type GetWarehouseByIdQuery = { __typename?: 'Query', getWarehouseById?: { __typename?: 'WarehouseResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null };

export type GetWarehouseHistoryQueryVariables = Exact<{
  paginationInput: PaginationInput;
  warehouseId: Scalars['ObjectId'];
}>;


export type GetWarehouseHistoryQuery = { __typename?: 'Query', getWarehouseHistory?: { __typename?: 'StocksHistoryResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'StockHistory', id: any, stockId: any, warehouseId: any, quantity: number, type: StockMovementTypeEnum, date: any, stockBefore: number, stockLater: number, createdBy?: any | null, stock?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, lastStockEntry: number, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null, createdByInfo?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null }> | null } | null };

export type GetStockHistoryQueryVariables = Exact<{
  paginationInput: PaginationInput;
  stockId: Scalars['ObjectId'];
}>;


export type GetStockHistoryQuery = { __typename?: 'Query', getStockHistory?: { __typename?: 'StocksHistoryResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'StockHistory', id: any, stockId: any, warehouseId: any, quantity: number, type: StockMovementTypeEnum, date: any, stockBefore: number, stockLater: number, createdBy?: any | null, stock?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, lastStockEntry: number, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null, createdByInfo?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null }> | null } | null };

export type GetStockByIdQueryVariables = Exact<{
  getStockByIdId: Scalars['ObjectId'];
}>;


export type GetStockByIdQuery = { __typename?: 'Query', getStockById?: { __typename?: 'StockResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null } | null };

export type GetProductsOutOfWarehouseQueryVariables = Exact<{
  paginationInput: PaginationInput;
  warehouseId: Scalars['ObjectId'];
}>;


export type GetProductsOutOfWarehouseQuery = { __typename?: 'Query', getProductsOutOfWarehouse?: { __typename?: 'ProductsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> }> | null } | null };

export type GetWarehouseStockQueryVariables = Exact<{
  warehouseStockPaginationInput: WarehouseStockPaginationInput;
}>;


export type GetWarehouseStockQuery = { __typename?: 'Query', getWarehouseStock?: { __typename?: 'StocksResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, lastStockEntry: number, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null }> | null } | null };

export type GetProductByIdQueryVariables = Exact<{
  getProductByIdId: Scalars['ObjectId'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById?: { __typename?: 'ProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null } | null };

export type GetPublicProductsQueryVariables = Exact<{
  paginationInput: PaginationInput;
}>;


export type GetPublicProductsQuery = { __typename?: 'Query', getPublicProducts?: { __typename?: 'ProductsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> }> | null } | null };

export type GetBranchProductsPaginatedQueryVariables = Exact<{
  paginationInput: PaginationInput;
  branchId: Scalars['ObjectId'];
}>;


export type GetBranchProductsPaginatedQuery = { __typename?: 'Query', getBranchProductsPaginated?: { __typename?: 'BranchProductsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'BranchProduct', id: any, branchId: any, productId: any, price: number, isVisibleOnWeb: boolean, isVisibleOnMenu: boolean, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, branch?: { __typename?: 'Branch', id: any, name: string, code: string, city: string, direction: string, phone?: string | null, nit?: string | null, cashId: any, cash?: { __typename?: 'Cash', id: any } | null } | null }> | null } | null };

export type GetBranchesPaginatedQueryVariables = Exact<{
  paginationInput: PaginationInput;
}>;


export type GetBranchesPaginatedQuery = { __typename?: 'Query', getBranchesPaginated?: { __typename?: 'BranchsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Branch', id: any, name: string, code: string, city: string, direction: string, phone?: string | null, nit?: string | null, cash?: { __typename?: 'Cash', id: any } | null }> | null } | null };

export type GetBranchByIdQueryVariables = Exact<{
  getBranchByIdId: Scalars['ObjectId'];
}>;


export type GetBranchByIdQuery = { __typename?: 'Query', getBranchById?: { __typename?: 'BranchResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Branch', id: any, name: string, code: string, city: string, direction: string, phone?: string | null, nit?: string | null, cashId: any, cash?: { __typename?: 'Cash', id: any } | null } | null } | null };

export type UpdateBranchProductMutationVariables = Exact<{
  updateBranchProductInput: UpdateBranchProductInput;
}>;


export type UpdateBranchProductMutation = { __typename?: 'Mutation', updateBranchProduct?: { __typename?: 'BranchProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'BranchProduct', id: any, branchId: any, productId: any, price: number, isVisibleOnWeb: boolean, isVisibleOnMenu: boolean, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, branch?: { __typename?: 'Branch', id: any, name: string, code: string, city: string, direction: string, phone?: string | null, nit?: string | null, cashId: any, cash?: { __typename?: 'Cash', id: any } | null } | null } | null } | null };

export type OpenCashMutationVariables = Exact<{
  createTurnInput: CreateTurnInput;
}>;


export type OpenCashMutation = { __typename?: 'Mutation', openCash?: { __typename?: 'CashResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Cash', id: any, branchId: any, amount: number, currentTurnId?: any | null, isOpen: boolean, currentTurn?: { __typename?: 'Turn', id: any, cashId: any, isOpen: boolean, openInfo: { __typename?: 'OpenTurnInfo', amount: number, physicialAmount: number, difference: number, date: any, observation?: string | null, openBy: any, openByInfo?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null }, closeInfo?: { __typename?: 'CloseTurnInfo', amount: number, physicialAmount: number, difference: number, date: any, observation?: string | null, closeBy: any, closeByInfo?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null } | null } | null } | null } | null };

export type MutationMutationVariables = Exact<{
  closeTurnInput: CloseTurnInput;
}>;


export type MutationMutation = { __typename?: 'Mutation', closeCash?: { __typename?: 'CashResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Cash', id: any, branchId: any, amount: number, currentTurnId?: any | null, isOpen: boolean, currentTurn?: { __typename?: 'Turn', id: any, cashId: any, isOpen: boolean, openInfo: { __typename?: 'OpenTurnInfo', amount: number, physicialAmount: number, difference: number, date: any, observation?: string | null, openBy: any, openByInfo?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null }, closeInfo?: { __typename?: 'CloseTurnInfo', amount: number, physicialAmount: number, difference: number, date: any, observation?: string | null, closeBy: any, closeByInfo?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null } | null } | null } | null } | null };

export type GetCashByIdQueryVariables = Exact<{
  getCashByIdId: Scalars['ObjectId'];
}>;


export type GetCashByIdQuery = { __typename?: 'Query', getCashById?: { __typename?: 'CashResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Cash', id: any, branchId: any, amount: number, currentTurnId?: any | null, isOpen: boolean, currentTurn?: { __typename?: 'Turn', id: any, cashId: any, isOpen: boolean, openInfo: { __typename?: 'OpenTurnInfo', amount: number, physicialAmount: number, difference: number, date: any, observation?: string | null, openBy: any, openByInfo?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null }, closeInfo?: { __typename?: 'CloseTurnInfo', amount: number, physicialAmount: number, difference: number, date: any, observation?: string | null, closeBy: any, closeByInfo?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null } | null } | null } | null } | null };


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
      lastStockEntry
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
export const CreateBranchDocument = gql`
    mutation CreateBranch($createBranchInput: CreateBranchInput!) {
  createBranch(createBranchInput: $createBranchInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      code
      city
      direction
      phone
      nit
      cashId
      cash {
        id
      }
    }
  }
}
    `;
export type CreateBranchMutationFn = Apollo.MutationFunction<CreateBranchMutation, CreateBranchMutationVariables>;

/**
 * __useCreateBranchMutation__
 *
 * To run a mutation, you first call `useCreateBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBranchMutation, { data, loading, error }] = useCreateBranchMutation({
 *   variables: {
 *      createBranchInput: // value for 'createBranchInput'
 *   },
 * });
 */
export function useCreateBranchMutation(baseOptions?: Apollo.MutationHookOptions<CreateBranchMutation, CreateBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBranchMutation, CreateBranchMutationVariables>(CreateBranchDocument, options);
      }
export type CreateBranchMutationHookResult = ReturnType<typeof useCreateBranchMutation>;
export type CreateBranchMutationResult = Apollo.MutationResult<CreateBranchMutation>;
export type CreateBranchMutationOptions = Apollo.BaseMutationOptions<CreateBranchMutation, CreateBranchMutationVariables>;
export const UpdateBranchDocument = gql`
    mutation UpdateBranch($updateBranchInput: UpdateBranchInput!) {
  updateBranch(updateBranchInput: $updateBranchInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      code
      city
      direction
      phone
      nit
      cashId
      cash {
        id
      }
    }
  }
}
    `;
export type UpdateBranchMutationFn = Apollo.MutationFunction<UpdateBranchMutation, UpdateBranchMutationVariables>;

/**
 * __useUpdateBranchMutation__
 *
 * To run a mutation, you first call `useUpdateBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBranchMutation, { data, loading, error }] = useUpdateBranchMutation({
 *   variables: {
 *      updateBranchInput: // value for 'updateBranchInput'
 *   },
 * });
 */
export function useUpdateBranchMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBranchMutation, UpdateBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBranchMutation, UpdateBranchMutationVariables>(UpdateBranchDocument, options);
      }
export type UpdateBranchMutationHookResult = ReturnType<typeof useUpdateBranchMutation>;
export type UpdateBranchMutationResult = Apollo.MutationResult<UpdateBranchMutation>;
export type UpdateBranchMutationOptions = Apollo.BaseMutationOptions<UpdateBranchMutation, UpdateBranchMutationVariables>;
export const DeleteBranchDocument = gql`
    mutation DeleteBranch($deleteBranchId: ObjectId!) {
  deleteBranch(id: $deleteBranchId) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      code
      city
      direction
      phone
      nit
      cashId
      cash {
        id
      }
    }
  }
}
    `;
export type DeleteBranchMutationFn = Apollo.MutationFunction<DeleteBranchMutation, DeleteBranchMutationVariables>;

/**
 * __useDeleteBranchMutation__
 *
 * To run a mutation, you first call `useDeleteBranchMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteBranchMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteBranchMutation, { data, loading, error }] = useDeleteBranchMutation({
 *   variables: {
 *      deleteBranchId: // value for 'deleteBranchId'
 *   },
 * });
 */
export function useDeleteBranchMutation(baseOptions?: Apollo.MutationHookOptions<DeleteBranchMutation, DeleteBranchMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteBranchMutation, DeleteBranchMutationVariables>(DeleteBranchDocument, options);
      }
export type DeleteBranchMutationHookResult = ReturnType<typeof useDeleteBranchMutation>;
export type DeleteBranchMutationResult = Apollo.MutationResult<DeleteBranchMutation>;
export type DeleteBranchMutationOptions = Apollo.BaseMutationOptions<DeleteBranchMutation, DeleteBranchMutationVariables>;
export const CreateBranchProductDocument = gql`
    mutation CreateBranchProduct($createBranchProductInput: CreateBranchProductInput!) {
  createBranchProduct(createBranchProductInput: $createBranchProductInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      branchId
      productId
      price
      isVisibleOnWeb
      isVisibleOnMenu
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
      branch {
        id
        name
        code
        city
        direction
        phone
        nit
        cashId
        cash {
          id
        }
      }
    }
  }
}
    `;
export type CreateBranchProductMutationFn = Apollo.MutationFunction<CreateBranchProductMutation, CreateBranchProductMutationVariables>;

/**
 * __useCreateBranchProductMutation__
 *
 * To run a mutation, you first call `useCreateBranchProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBranchProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBranchProductMutation, { data, loading, error }] = useCreateBranchProductMutation({
 *   variables: {
 *      createBranchProductInput: // value for 'createBranchProductInput'
 *   },
 * });
 */
export function useCreateBranchProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateBranchProductMutation, CreateBranchProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBranchProductMutation, CreateBranchProductMutationVariables>(CreateBranchProductDocument, options);
      }
export type CreateBranchProductMutationHookResult = ReturnType<typeof useCreateBranchProductMutation>;
export type CreateBranchProductMutationResult = Apollo.MutationResult<CreateBranchProductMutation>;
export type CreateBranchProductMutationOptions = Apollo.BaseMutationOptions<CreateBranchProductMutation, CreateBranchProductMutationVariables>;
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
export const GetWarehouseHistoryDocument = gql`
    query GetWarehouseHistory($paginationInput: PaginationInput!, $warehouseId: ObjectId!) {
  getWarehouseHistory(
    paginationInput: $paginationInput
    warehouseId: $warehouseId
  ) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      stockId
      warehouseId
      quantity
      type
      date
      stockBefore
      stockLater
      createdBy
      stock {
        id
        productId
        warehouseId
        quantity
        securityStock
        lastStockEntry
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
      warehouse {
        id
        name
        description
        address
      }
      createdByInfo {
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
    totalRecords
    totalPages
    rows
    currentPage
  }
}
    `;

/**
 * __useGetWarehouseHistoryQuery__
 *
 * To run a query within a React component, call `useGetWarehouseHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehouseHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehouseHistoryQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *      warehouseId: // value for 'warehouseId'
 *   },
 * });
 */
export function useGetWarehouseHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetWarehouseHistoryQuery, GetWarehouseHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehouseHistoryQuery, GetWarehouseHistoryQueryVariables>(GetWarehouseHistoryDocument, options);
      }
export function useGetWarehouseHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehouseHistoryQuery, GetWarehouseHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehouseHistoryQuery, GetWarehouseHistoryQueryVariables>(GetWarehouseHistoryDocument, options);
        }
export type GetWarehouseHistoryQueryHookResult = ReturnType<typeof useGetWarehouseHistoryQuery>;
export type GetWarehouseHistoryLazyQueryHookResult = ReturnType<typeof useGetWarehouseHistoryLazyQuery>;
export type GetWarehouseHistoryQueryResult = Apollo.QueryResult<GetWarehouseHistoryQuery, GetWarehouseHistoryQueryVariables>;
export const GetStockHistoryDocument = gql`
    query GetStockHistory($paginationInput: PaginationInput!, $stockId: ObjectId!) {
  getStockHistory(paginationInput: $paginationInput, stockId: $stockId) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      stockId
      warehouseId
      quantity
      type
      date
      stockBefore
      stockLater
      createdBy
      stock {
        id
        productId
        warehouseId
        quantity
        securityStock
        lastStockEntry
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
      warehouse {
        id
        name
        description
        address
      }
      createdByInfo {
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
    totalRecords
    totalPages
    rows
    currentPage
  }
}
    `;

/**
 * __useGetStockHistoryQuery__
 *
 * To run a query within a React component, call `useGetStockHistoryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStockHistoryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStockHistoryQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *      stockId: // value for 'stockId'
 *   },
 * });
 */
export function useGetStockHistoryQuery(baseOptions: Apollo.QueryHookOptions<GetStockHistoryQuery, GetStockHistoryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStockHistoryQuery, GetStockHistoryQueryVariables>(GetStockHistoryDocument, options);
      }
export function useGetStockHistoryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStockHistoryQuery, GetStockHistoryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStockHistoryQuery, GetStockHistoryQueryVariables>(GetStockHistoryDocument, options);
        }
export type GetStockHistoryQueryHookResult = ReturnType<typeof useGetStockHistoryQuery>;
export type GetStockHistoryLazyQueryHookResult = ReturnType<typeof useGetStockHistoryLazyQuery>;
export type GetStockHistoryQueryResult = Apollo.QueryResult<GetStockHistoryQuery, GetStockHistoryQueryVariables>;
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
export const GetProductsOutOfWarehouseDocument = gql`
    query GetProductsOutOfWarehouse($paginationInput: PaginationInput!, $warehouseId: ObjectId!) {
  getProductsOutOfWarehouse(
    paginationInput: $paginationInput
    warehouseId: $warehouseId
  ) {
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
 * __useGetProductsOutOfWarehouseQuery__
 *
 * To run a query within a React component, call `useGetProductsOutOfWarehouseQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductsOutOfWarehouseQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductsOutOfWarehouseQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *      warehouseId: // value for 'warehouseId'
 *   },
 * });
 */
export function useGetProductsOutOfWarehouseQuery(baseOptions: Apollo.QueryHookOptions<GetProductsOutOfWarehouseQuery, GetProductsOutOfWarehouseQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductsOutOfWarehouseQuery, GetProductsOutOfWarehouseQueryVariables>(GetProductsOutOfWarehouseDocument, options);
      }
export function useGetProductsOutOfWarehouseLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductsOutOfWarehouseQuery, GetProductsOutOfWarehouseQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductsOutOfWarehouseQuery, GetProductsOutOfWarehouseQueryVariables>(GetProductsOutOfWarehouseDocument, options);
        }
export type GetProductsOutOfWarehouseQueryHookResult = ReturnType<typeof useGetProductsOutOfWarehouseQuery>;
export type GetProductsOutOfWarehouseLazyQueryHookResult = ReturnType<typeof useGetProductsOutOfWarehouseLazyQuery>;
export type GetProductsOutOfWarehouseQueryResult = Apollo.QueryResult<GetProductsOutOfWarehouseQuery, GetProductsOutOfWarehouseQueryVariables>;
export const GetWarehouseStockDocument = gql`
    query GetWarehouseStock($warehouseStockPaginationInput: WarehouseStockPaginationInput!) {
  getWarehouseStock(warehouseStockPaginationInput: $warehouseStockPaginationInput) {
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
      lastStockEntry
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
 * __useGetWarehouseStockQuery__
 *
 * To run a query within a React component, call `useGetWarehouseStockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehouseStockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehouseStockQuery({
 *   variables: {
 *      warehouseStockPaginationInput: // value for 'warehouseStockPaginationInput'
 *   },
 * });
 */
export function useGetWarehouseStockQuery(baseOptions: Apollo.QueryHookOptions<GetWarehouseStockQuery, GetWarehouseStockQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehouseStockQuery, GetWarehouseStockQueryVariables>(GetWarehouseStockDocument, options);
      }
export function useGetWarehouseStockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehouseStockQuery, GetWarehouseStockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehouseStockQuery, GetWarehouseStockQueryVariables>(GetWarehouseStockDocument, options);
        }
export type GetWarehouseStockQueryHookResult = ReturnType<typeof useGetWarehouseStockQuery>;
export type GetWarehouseStockLazyQueryHookResult = ReturnType<typeof useGetWarehouseStockLazyQuery>;
export type GetWarehouseStockQueryResult = Apollo.QueryResult<GetWarehouseStockQuery, GetWarehouseStockQueryVariables>;
export const GetProductByIdDocument = gql`
    query GetProductById($getProductByIdId: ObjectId!) {
  getProductById(id: $getProductByIdId) {
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
  }
}
    `;

/**
 * __useGetProductByIdQuery__
 *
 * To run a query within a React component, call `useGetProductByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductByIdQuery({
 *   variables: {
 *      getProductByIdId: // value for 'getProductByIdId'
 *   },
 * });
 */
export function useGetProductByIdQuery(baseOptions: Apollo.QueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
      }
export function useGetProductByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductByIdQuery, GetProductByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductByIdQuery, GetProductByIdQueryVariables>(GetProductByIdDocument, options);
        }
export type GetProductByIdQueryHookResult = ReturnType<typeof useGetProductByIdQuery>;
export type GetProductByIdLazyQueryHookResult = ReturnType<typeof useGetProductByIdLazyQuery>;
export type GetProductByIdQueryResult = Apollo.QueryResult<GetProductByIdQuery, GetProductByIdQueryVariables>;
export const GetPublicProductsDocument = gql`
    query GetPublicProducts($paginationInput: PaginationInput!) {
  getPublicProducts(paginationInput: $paginationInput) {
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
 * __useGetPublicProductsQuery__
 *
 * To run a query within a React component, call `useGetPublicProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicProductsQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *   },
 * });
 */
export function useGetPublicProductsQuery(baseOptions: Apollo.QueryHookOptions<GetPublicProductsQuery, GetPublicProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublicProductsQuery, GetPublicProductsQueryVariables>(GetPublicProductsDocument, options);
      }
export function useGetPublicProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicProductsQuery, GetPublicProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublicProductsQuery, GetPublicProductsQueryVariables>(GetPublicProductsDocument, options);
        }
export type GetPublicProductsQueryHookResult = ReturnType<typeof useGetPublicProductsQuery>;
export type GetPublicProductsLazyQueryHookResult = ReturnType<typeof useGetPublicProductsLazyQuery>;
export type GetPublicProductsQueryResult = Apollo.QueryResult<GetPublicProductsQuery, GetPublicProductsQueryVariables>;
export const GetBranchProductsPaginatedDocument = gql`
    query GetBranchProductsPaginated($paginationInput: PaginationInput!, $branchId: ObjectId!) {
  getBranchProductsPaginated(
    paginationInput: $paginationInput
    branchId: $branchId
  ) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      branchId
      productId
      price
      isVisibleOnWeb
      isVisibleOnMenu
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
      branch {
        id
        name
        code
        city
        direction
        phone
        nit
        cashId
        cash {
          id
        }
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
 * __useGetBranchProductsPaginatedQuery__
 *
 * To run a query within a React component, call `useGetBranchProductsPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBranchProductsPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBranchProductsPaginatedQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *      branchId: // value for 'branchId'
 *   },
 * });
 */
export function useGetBranchProductsPaginatedQuery(baseOptions: Apollo.QueryHookOptions<GetBranchProductsPaginatedQuery, GetBranchProductsPaginatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBranchProductsPaginatedQuery, GetBranchProductsPaginatedQueryVariables>(GetBranchProductsPaginatedDocument, options);
      }
export function useGetBranchProductsPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBranchProductsPaginatedQuery, GetBranchProductsPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBranchProductsPaginatedQuery, GetBranchProductsPaginatedQueryVariables>(GetBranchProductsPaginatedDocument, options);
        }
export type GetBranchProductsPaginatedQueryHookResult = ReturnType<typeof useGetBranchProductsPaginatedQuery>;
export type GetBranchProductsPaginatedLazyQueryHookResult = ReturnType<typeof useGetBranchProductsPaginatedLazyQuery>;
export type GetBranchProductsPaginatedQueryResult = Apollo.QueryResult<GetBranchProductsPaginatedQuery, GetBranchProductsPaginatedQueryVariables>;
export const GetBranchesPaginatedDocument = gql`
    query GetBranchesPaginated($paginationInput: PaginationInput!) {
  getBranchesPaginated(paginationInput: $paginationInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      code
      city
      direction
      phone
      nit
      cash {
        id
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
 * __useGetBranchesPaginatedQuery__
 *
 * To run a query within a React component, call `useGetBranchesPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBranchesPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBranchesPaginatedQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *   },
 * });
 */
export function useGetBranchesPaginatedQuery(baseOptions: Apollo.QueryHookOptions<GetBranchesPaginatedQuery, GetBranchesPaginatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBranchesPaginatedQuery, GetBranchesPaginatedQueryVariables>(GetBranchesPaginatedDocument, options);
      }
export function useGetBranchesPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBranchesPaginatedQuery, GetBranchesPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBranchesPaginatedQuery, GetBranchesPaginatedQueryVariables>(GetBranchesPaginatedDocument, options);
        }
export type GetBranchesPaginatedQueryHookResult = ReturnType<typeof useGetBranchesPaginatedQuery>;
export type GetBranchesPaginatedLazyQueryHookResult = ReturnType<typeof useGetBranchesPaginatedLazyQuery>;
export type GetBranchesPaginatedQueryResult = Apollo.QueryResult<GetBranchesPaginatedQuery, GetBranchesPaginatedQueryVariables>;
export const GetBranchByIdDocument = gql`
    query GetBranchById($getBranchByIdId: ObjectId!) {
  getBranchById(id: $getBranchByIdId) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
      code
      city
      direction
      phone
      nit
      cashId
      cash {
        id
      }
    }
  }
}
    `;

/**
 * __useGetBranchByIdQuery__
 *
 * To run a query within a React component, call `useGetBranchByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBranchByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBranchByIdQuery({
 *   variables: {
 *      getBranchByIdId: // value for 'getBranchByIdId'
 *   },
 * });
 */
export function useGetBranchByIdQuery(baseOptions: Apollo.QueryHookOptions<GetBranchByIdQuery, GetBranchByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBranchByIdQuery, GetBranchByIdQueryVariables>(GetBranchByIdDocument, options);
      }
export function useGetBranchByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBranchByIdQuery, GetBranchByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBranchByIdQuery, GetBranchByIdQueryVariables>(GetBranchByIdDocument, options);
        }
export type GetBranchByIdQueryHookResult = ReturnType<typeof useGetBranchByIdQuery>;
export type GetBranchByIdLazyQueryHookResult = ReturnType<typeof useGetBranchByIdLazyQuery>;
export type GetBranchByIdQueryResult = Apollo.QueryResult<GetBranchByIdQuery, GetBranchByIdQueryVariables>;
export const UpdateBranchProductDocument = gql`
    mutation UpdateBranchProduct($updateBranchProductInput: UpdateBranchProductInput!) {
  updateBranchProduct(updateBranchProductInput: $updateBranchProductInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      branchId
      productId
      price
      isVisibleOnWeb
      isVisibleOnMenu
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
      branch {
        id
        name
        code
        city
        direction
        phone
        nit
        cashId
        cash {
          id
        }
      }
    }
  }
}
    `;
export type UpdateBranchProductMutationFn = Apollo.MutationFunction<UpdateBranchProductMutation, UpdateBranchProductMutationVariables>;

/**
 * __useUpdateBranchProductMutation__
 *
 * To run a mutation, you first call `useUpdateBranchProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBranchProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBranchProductMutation, { data, loading, error }] = useUpdateBranchProductMutation({
 *   variables: {
 *      updateBranchProductInput: // value for 'updateBranchProductInput'
 *   },
 * });
 */
export function useUpdateBranchProductMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBranchProductMutation, UpdateBranchProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBranchProductMutation, UpdateBranchProductMutationVariables>(UpdateBranchProductDocument, options);
      }
export type UpdateBranchProductMutationHookResult = ReturnType<typeof useUpdateBranchProductMutation>;
export type UpdateBranchProductMutationResult = Apollo.MutationResult<UpdateBranchProductMutation>;
export type UpdateBranchProductMutationOptions = Apollo.BaseMutationOptions<UpdateBranchProductMutation, UpdateBranchProductMutationVariables>;
export const OpenCashDocument = gql`
    mutation OpenCash($createTurnInput: CreateTurnInput!) {
  openCash(createTurnInput: $createTurnInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      branchId
      amount
      currentTurnId
      isOpen
      currentTurn {
        id
        cashId
        isOpen
        openInfo {
          amount
          physicialAmount
          difference
          date
          observation
          openBy
          openByInfo {
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
        closeInfo {
          amount
          physicialAmount
          difference
          date
          observation
          closeBy
          closeByInfo {
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
    }
  }
}
    `;
export type OpenCashMutationFn = Apollo.MutationFunction<OpenCashMutation, OpenCashMutationVariables>;

/**
 * __useOpenCashMutation__
 *
 * To run a mutation, you first call `useOpenCashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenCashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openCashMutation, { data, loading, error }] = useOpenCashMutation({
 *   variables: {
 *      createTurnInput: // value for 'createTurnInput'
 *   },
 * });
 */
export function useOpenCashMutation(baseOptions?: Apollo.MutationHookOptions<OpenCashMutation, OpenCashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<OpenCashMutation, OpenCashMutationVariables>(OpenCashDocument, options);
      }
export type OpenCashMutationHookResult = ReturnType<typeof useOpenCashMutation>;
export type OpenCashMutationResult = Apollo.MutationResult<OpenCashMutation>;
export type OpenCashMutationOptions = Apollo.BaseMutationOptions<OpenCashMutation, OpenCashMutationVariables>;
export const MutationDocument = gql`
    mutation Mutation($closeTurnInput: CloseTurnInput!) {
  closeCash(closeTurnInput: $closeTurnInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      branchId
      amount
      currentTurnId
      isOpen
      currentTurn {
        id
        cashId
        isOpen
        openInfo {
          amount
          physicialAmount
          difference
          date
          observation
          openBy
          openByInfo {
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
        closeInfo {
          amount
          physicialAmount
          difference
          date
          observation
          closeBy
          closeByInfo {
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
    }
  }
}
    `;
export type MutationMutationFn = Apollo.MutationFunction<MutationMutation, MutationMutationVariables>;

/**
 * __useMutationMutation__
 *
 * To run a mutation, you first call `useMutationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useMutationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [mutationMutation, { data, loading, error }] = useMutationMutation({
 *   variables: {
 *      closeTurnInput: // value for 'closeTurnInput'
 *   },
 * });
 */
export function useMutationMutation(baseOptions?: Apollo.MutationHookOptions<MutationMutation, MutationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<MutationMutation, MutationMutationVariables>(MutationDocument, options);
      }
export type MutationMutationHookResult = ReturnType<typeof useMutationMutation>;
export type MutationMutationResult = Apollo.MutationResult<MutationMutation>;
export type MutationMutationOptions = Apollo.BaseMutationOptions<MutationMutation, MutationMutationVariables>;
export const GetCashByIdDocument = gql`
    query GetCashById($getCashByIdId: ObjectId!) {
  getCashById(id: $getCashByIdId) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      branchId
      amount
      currentTurnId
      isOpen
      currentTurn {
        id
        cashId
        isOpen
        openInfo {
          amount
          physicialAmount
          difference
          date
          observation
          openBy
          openByInfo {
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
        closeInfo {
          amount
          physicialAmount
          difference
          date
          observation
          closeBy
          closeByInfo {
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
    }
  }
}
    `;

/**
 * __useGetCashByIdQuery__
 *
 * To run a query within a React component, call `useGetCashByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCashByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCashByIdQuery({
 *   variables: {
 *      getCashByIdId: // value for 'getCashByIdId'
 *   },
 * });
 */
export function useGetCashByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCashByIdQuery, GetCashByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCashByIdQuery, GetCashByIdQueryVariables>(GetCashByIdDocument, options);
      }
export function useGetCashByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCashByIdQuery, GetCashByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCashByIdQuery, GetCashByIdQueryVariables>(GetCashByIdDocument, options);
        }
export type GetCashByIdQueryHookResult = ReturnType<typeof useGetCashByIdQuery>;
export type GetCashByIdLazyQueryHookResult = ReturnType<typeof useGetCashByIdLazyQuery>;
export type GetCashByIdQueryResult = Apollo.QueryResult<GetCashByIdQuery, GetCashByIdQueryVariables>;