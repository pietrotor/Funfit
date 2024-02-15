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

export type Address = {
  __typename?: 'Address';
  customerId: Scalars['ObjectId'];
  customerInfo?: Maybe<Customer>;
  detail: Scalars['String'];
  id: Scalars['ObjectId'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type AddressResponse = ResponseBase & {
  __typename?: 'AddressResponse';
  data?: Maybe<Address>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
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
  visibleOnWeb: Scalars['Boolean'];
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
  stock: Scalars['Float'];
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

export type CancelSaleInput = {
  reason: Scalars['String'];
  returnCash?: InputMaybe<Scalars['Boolean']>;
  returnStock: Scalars['Boolean'];
  saleId: Scalars['ObjectId'];
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

export type CashTurnMovementResponse = ResponseBase & {
  __typename?: 'CashTurnMovementResponse';
  data?: Maybe<TurnMovements>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type CashTurnMovementsResponse = ResponseBase & {
  __typename?: 'CashTurnMovementsResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<TurnMovements>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
};

export type CategoriesResponse = ResponseBase & {
  __typename?: 'CategoriesResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Category>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
};

export type Category = {
  __typename?: 'Category';
  code: Scalars['String'];
  id: Scalars['ObjectId'];
  name: Scalars['String'];
};

export type CategoryResponse = ResponseBase & {
  __typename?: 'CategoryResponse';
  data?: Maybe<Category>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type CloseTurnInfo = {
  __typename?: 'CloseTurnInfo';
  amount: Scalars['Float'];
  closeBy?: Maybe<Scalars['ObjectId']>;
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

export type CreateAddressInput = {
  customerId: Scalars['ObjectId'];
  detail: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type CreateBranchInput = {
  city: Scalars['String'];
  code: Scalars['String'];
  direction: Scalars['String'];
  name: Scalars['String'];
  nit?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  visibleOnWeb: Scalars['Boolean'];
};

export type CreateBranchProductInput = {
  branchId: Scalars['ObjectId'];
  isVisibleOnMenu: Scalars['Boolean'];
  isVisibleOnWeb: Scalars['Boolean'];
  price: Scalars['Float'];
  productId: Scalars['ObjectId'];
};

export type CreateBranchProductStockMovementInput = {
  branchId: Scalars['ObjectId'];
  branchProductId: Scalars['ObjectId'];
  date: Scalars['Date'];
  observation?: InputMaybe<Scalars['String']>;
  qty: Scalars['Float'];
  stockId?: InputMaybe<Scalars['ObjectId']>;
  type: StockMovementTypeEnum;
};

export type CreateCategoryInput = {
  name: Scalars['String'];
};

export type CreateCustomerInput = {
  email?: InputMaybe<Scalars['String']>;
  lastName: Scalars['String'];
  name: Scalars['String'];
  phone: Scalars['String'];
};

export type CreateOrderInput = {
  addressId?: InputMaybe<Scalars['ObjectId']>;
  branchId: Scalars['ObjectId'];
  customerId: Scalars['ObjectId'];
  deliveryMethod: DeliveryMethodEnum;
  discount: Scalars['Float'];
  orderDetails?: InputMaybe<Scalars['String']>;
  paymentMethod: PaymentMethodEnum;
  pickUpInformation?: InputMaybe<Scalars['String']>;
  products: Array<SaleItemInput>;
  subTotal: Scalars['Float'];
  total: Scalars['Float'];
};

export type CreateProductInput = {
  categoryId?: InputMaybe<Scalars['ObjectId']>;
  code: Scalars['String'];
  cost?: InputMaybe<Scalars['Float']>;
  description: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  suggetedPrice: Scalars['Float'];
};

export type CreateSaleInput = {
  amountRecibed: Scalars['Float'];
  branchId: Scalars['ObjectId'];
  change: Scalars['Float'];
  client?: InputMaybe<Scalars['String']>;
  date: Scalars['Date'];
  discount: Scalars['Float'];
  observations?: InputMaybe<Scalars['String']>;
  orderId?: InputMaybe<Scalars['ObjectId']>;
  paymentMethod: PaymentMethodEnum;
  products: Array<SaleItemInput>;
  subTotal: Scalars['Float'];
  total: Scalars['Float'];
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

export type CreateTurnMovementInput = {
  amount: Scalars['Float'];
  cashId: Scalars['ObjectId'];
  concept?: InputMaybe<Scalars['String']>;
  date: Scalars['Date'];
  turnId: Scalars['ObjectId'];
  type?: InputMaybe<TurnMovementTypeEnum>;
};

export type CreateWarehouseInput = {
  address: Scalars['String'];
  description: Scalars['String'];
  name: Scalars['String'];
};

export type Customer = {
  __typename?: 'Customer';
  addressInfo: Array<Address>;
  addressesIds: Array<Scalars['ObjectId']>;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ObjectId'];
  lastName: Scalars['String'];
  lastOrderDate?: Maybe<Scalars['Date']>;
  name: Scalars['String'];
  ordersIds: Array<Scalars['ObjectId']>;
  phone: Scalars['String'];
};

export type CustomerResponse = ResponseBase & {
  __typename?: 'CustomerResponse';
  data?: Maybe<Customer>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export enum DeliveryMethodEnum {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP'
}

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
  acceptOrder?: Maybe<OrderResponse>;
  cancelSale?: Maybe<SaleResponse>;
  closeCash?: Maybe<CashResponse>;
  creatStockMovement?: Maybe<StockResponse>;
  createBranch?: Maybe<BranchResponse>;
  createBranchProduct?: Maybe<BranchProductResponse>;
  createBranchProductStockMovement?: Maybe<BranchProductResponse>;
  createCashMovement?: Maybe<CashTurnMovementResponse>;
  createCategory?: Maybe<CategoryResponse>;
  createProduct?: Maybe<ProductResponse>;
  createSale?: Maybe<SaleResponse>;
  createStock?: Maybe<StockResponse>;
  createUser?: Maybe<UserResponse>;
  createWarehouse?: Maybe<WarehouseResponse>;
  deleteBranch?: Maybe<BranchResponse>;
  deleteBranchProduct?: Maybe<BranchProductResponse>;
  deleteCategory?: Maybe<CategoryResponse>;
  deleteProduct?: Maybe<ProductResponse>;
  deleteWarehouse?: Maybe<WarehouseResponse>;
  openCash?: Maybe<CashResponse>;
  publicCreateAddress?: Maybe<AddressResponse>;
  publicCreateCustomer?: Maybe<CustomerResponse>;
  publicCreateOrder?: Maybe<OrderResponse>;
  updateBranch?: Maybe<BranchResponse>;
  updateBranchProduct?: Maybe<BranchProductResponse>;
  updateCategory?: Maybe<CategoryResponse>;
  updateConfiguration?: Maybe<ConfigurationResponse>;
  updateProduct?: Maybe<ProductResponse>;
  updateUser?: Maybe<UserResponse>;
  updateWarehouse?: Maybe<WarehouseResponse>;
};


export type MutationAcceptOrderArgs = {
  orderId: Scalars['ObjectId'];
};


export type MutationCancelSaleArgs = {
  cancelSaleInput: CancelSaleInput;
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


export type MutationCreateBranchProductStockMovementArgs = {
  createBranchProductStockMovementInput: CreateBranchProductStockMovementInput;
};


export type MutationCreateCashMovementArgs = {
  createTurnMovementInput: CreateTurnMovementInput;
};


export type MutationCreateCategoryArgs = {
  createCategoryInput: CreateCategoryInput;
};


export type MutationCreateProductArgs = {
  createProductInput: CreateProductInput;
};


export type MutationCreateSaleArgs = {
  createSaleInput: CreateSaleInput;
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


export type MutationDeleteCategoryArgs = {
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


export type MutationPublicCreateAddressArgs = {
  createAddressInput: CreateAddressInput;
};


export type MutationPublicCreateCustomerArgs = {
  createCustomerInput: CreateCustomerInput;
};


export type MutationPublicCreateOrderArgs = {
  createOrderInput: CreateOrderInput;
};


export type MutationUpdateBranchArgs = {
  updateBranchInput: UpdateBranchInput;
};


export type MutationUpdateBranchProductArgs = {
  updateBranchProductInput: UpdateBranchProductInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryInput: UpdateCategoryInput;
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
  openBy?: Maybe<Scalars['ObjectId']>;
  openByInfo?: Maybe<User>;
  physicialAmount: Scalars['Float'];
};

export type Order = {
  __typename?: 'Order';
  addressId?: Maybe<Scalars['ObjectId']>;
  addressInfo?: Maybe<Address>;
  branchId: Scalars['ObjectId'];
  code: Scalars['String'];
  customerId: Scalars['ObjectId'];
  customerInfo?: Maybe<Customer>;
  date: Scalars['Date'];
  deliveryMethod: DeliveryMethodEnum;
  discount: Scalars['Float'];
  id: Scalars['ObjectId'];
  isSold: Scalars['Boolean'];
  orderAcepted?: Maybe<Scalars['Boolean']>;
  orderAceptedAt?: Maybe<Scalars['Date']>;
  orderAceptedBy?: Maybe<Scalars['ObjectId']>;
  orderAceptedByInfo?: Maybe<User>;
  orderDetails?: Maybe<Scalars['String']>;
  paymentMethod: PaymentMethodEnum;
  pickUpInformation?: Maybe<Scalars['String']>;
  products: Array<SaleItem>;
  reason?: Maybe<Scalars['String']>;
  rejected?: Maybe<Scalars['Boolean']>;
  rejectedAt?: Maybe<Scalars['Date']>;
  rejectedBy?: Maybe<Scalars['ObjectId']>;
  rejectedByInfo?: Maybe<User>;
  saleId?: Maybe<Scalars['ObjectId']>;
  subTotal: Scalars['Float'];
  total: Scalars['Float'];
};

export type OrderPaginationInput = {
  branchId?: InputMaybe<Scalars['ObjectId']>;
  filter?: InputMaybe<Scalars['String']>;
  orderesAcepted?: InputMaybe<Scalars['Boolean']>;
  page?: InputMaybe<Scalars['Int']>;
  rows?: InputMaybe<Scalars['Int']>;
};

export type OrderResponse = ResponseBase & {
  __typename?: 'OrderResponse';
  data?: Maybe<Order>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type OrdersResponse = ResponseBase & {
  __typename?: 'OrdersResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Order>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
};

export type PaginationInput = {
  filter?: InputMaybe<Scalars['String']>;
  page?: InputMaybe<Scalars['Int']>;
  rows?: InputMaybe<Scalars['Int']>;
};

export enum PaymentMethodEnum {
  CARD = 'CARD',
  CASH = 'CASH',
  QR_TRANSFER = 'QR_TRANSFER'
}

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['ObjectId']>;
  code: Scalars['String'];
  cost?: Maybe<Scalars['Float']>;
  description: Scalars['String'];
  id: Scalars['ObjectId'];
  image?: Maybe<Scalars['String']>;
  internalCode?: Maybe<Scalars['String']>;
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
  getCashTurnMovements?: Maybe<CashTurnMovementsResponse>;
  getCategories?: Maybe<CategoriesResponse>;
  getCategoryById?: Maybe<CategoryResponse>;
  getConfiguration?: Maybe<ConfigurationResponse>;
  getOrderById?: Maybe<OrderResponse>;
  getOrdersPaginated?: Maybe<OrdersResponse>;
  getProductById?: Maybe<ProductResponse>;
  getProductStock?: Maybe<StocksResponse>;
  getProducts?: Maybe<ProductsResponse>;
  getProductsOutOfWarehouse?: Maybe<ProductsResponse>;
  getPublicCustomerById?: Maybe<CustomerResponse>;
  getPublicProducts?: Maybe<BranchProductsResponse>;
  getRoles?: Maybe<RolesResponse>;
  getSaleById?: Maybe<SaleResponse>;
  getSalesPaginated?: Maybe<SalesResponse>;
  getSalesSummary?: Maybe<SalesSummaryResponse>;
  getStockById?: Maybe<StockResponse>;
  getStockHistory?: Maybe<StocksHistoryResponse>;
  getStocksPaginated?: Maybe<StocksResponse>;
  getUserById?: Maybe<UserResponse>;
  getUsers?: Maybe<UsersResponse>;
  getWarehouseById?: Maybe<WarehouseResponse>;
  getWarehouseHistory?: Maybe<StocksHistoryResponse>;
  getWarehouseStock?: Maybe<StocksResponse>;
  getWarehouses?: Maybe<WarehousesResponse>;
  getWarehousesOfProduct?: Maybe<WarehousesResponse>;
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


export type QueryGetCashTurnMovementsArgs = {
  paginationInput: PaginationInput;
  turnId: Scalars['ObjectId'];
};


export type QueryGetCategoriesArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetOrderByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetOrdersPaginatedArgs = {
  orderPaginationInput: OrderPaginationInput;
};


export type QueryGetProductByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetProductStockArgs = {
  paginationInput: PaginationInput;
  productId: Scalars['ObjectId'];
  warehouseId?: InputMaybe<Scalars['ObjectId']>;
};


export type QueryGetProductsArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetProductsOutOfWarehouseArgs = {
  paginationInput: PaginationInput;
  warehouseId: Scalars['ObjectId'];
};


export type QueryGetPublicCustomerByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetPublicProductsArgs = {
  branchId: Scalars['ObjectId'];
  paginationInput: PaginationInput;
};


export type QueryGetRolesArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetSaleByIdArgs = {
  id: Scalars['ObjectId'];
};


export type QueryGetSalesPaginatedArgs = {
  salesPaginationInput: SalesPaginationInput;
};


export type QueryGetSalesSummaryArgs = {
  salesSummaryInput: SalesSummaryInput;
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


export type QueryGetWarehousesOfProductArgs = {
  paginationInput: PaginationInput;
  productId: Scalars['ObjectId'];
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

export type Sale = {
  __typename?: 'Sale';
  amountRecibed: Scalars['Float'];
  branch?: Maybe<Branch>;
  branchId: Scalars['ObjectId'];
  canceled?: Maybe<Scalars['Boolean']>;
  canceledAt?: Maybe<Scalars['Date']>;
  canceledBy?: Maybe<Scalars['ObjectId']>;
  canceledByInfo?: Maybe<User>;
  change: Scalars['Float'];
  client?: Maybe<Scalars['String']>;
  code: Scalars['String'];
  createdBy?: Maybe<Scalars['ObjectId']>;
  createdByInfo?: Maybe<User>;
  date: Scalars['Date'];
  discount: Scalars['Float'];
  id: Scalars['ObjectId'];
  observations?: Maybe<Scalars['String']>;
  orderId?: Maybe<Scalars['ObjectId']>;
  paymentMethod: PaymentMethodEnum;
  products: Array<SaleItem>;
  reason?: Maybe<Scalars['String']>;
  subTotal: Scalars['Float'];
  total: Scalars['Float'];
};

export type SaleItem = {
  __typename?: 'SaleItem';
  branchProductId: Scalars['ObjectId'];
  price: Scalars['Float'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId'];
  qty: Scalars['Int'];
  total: Scalars['Float'];
};

export type SaleItemInput = {
  branchProductId: Scalars['ObjectId'];
  price: Scalars['Float'];
  productId: Scalars['ObjectId'];
  qty: Scalars['Int'];
  total: Scalars['Float'];
};

export type SaleResponse = ResponseBase & {
  __typename?: 'SaleResponse';
  data?: Maybe<Sale>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  status: StatusEnum;
};

export type SalesByPaymentMethodSummary = {
  __typename?: 'SalesByPaymentMethodSummary';
  method?: Maybe<PaymentMethodEnum>;
  total: Scalars['Float'];
};

export type SalesPaginationInput = {
  branchIds: Array<Scalars['ObjectId']>;
  endDate?: InputMaybe<Scalars['Date']>;
  filter?: InputMaybe<Scalars['String']>;
  initialDate?: InputMaybe<Scalars['Date']>;
  page?: InputMaybe<Scalars['Int']>;
  rows?: InputMaybe<Scalars['Int']>;
  saleBy?: InputMaybe<Scalars['ObjectId']>;
};

export type SalesResponse = ResponseBase & {
  __typename?: 'SalesResponse';
  currentPage?: Maybe<Scalars['Int']>;
  data?: Maybe<Array<Sale>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']>;
  rows?: Maybe<Scalars['Int']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']>;
  totalRecords?: Maybe<Scalars['Int']>;
};

export type SalesSummary = {
  __typename?: 'SalesSummary';
  paymentMethods: Array<SalesByPaymentMethodSummary>;
  total: Scalars['Float'];
};

export type SalesSummaryInput = {
  branchIds: Array<Scalars['ObjectId']>;
  endDate?: InputMaybe<Scalars['Date']>;
  initialDate?: InputMaybe<Scalars['Date']>;
  saleBy?: InputMaybe<Scalars['ObjectId']>;
};

export type SalesSummaryResponse = ResponseBase & {
  __typename?: 'SalesSummaryResponse';
  data?: Maybe<SalesSummary>;
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
  amountOfMovents: Scalars['Int'];
  cashId: Scalars['ObjectId'];
  closeInfo?: Maybe<CloseTurnInfo>;
  id: Scalars['ObjectId'];
  isOpen: Scalars['Boolean'];
  openInfo: OpenTurnInfo;
};

export enum TurnMovementTypeEnum {
  ADD = 'ADD',
  ADJUST = 'ADJUST',
  WITHDRAW = 'WITHDRAW'
}

export type TurnMovements = {
  __typename?: 'TurnMovements';
  amount: Scalars['Float'];
  cashId: Scalars['ObjectId'];
  concept?: Maybe<Scalars['String']>;
  createdBy?: Maybe<Scalars['ObjectId']>;
  createdByInfo?: Maybe<User>;
  date: Scalars['Date'];
  id: Scalars['ObjectId'];
  turnId: Scalars['ObjectId'];
  type?: Maybe<TurnMovementTypeEnum>;
};

export type UpdateBranchInput = {
  city?: InputMaybe<Scalars['String']>;
  code?: InputMaybe<Scalars['String']>;
  direction?: InputMaybe<Scalars['String']>;
  id: Scalars['ObjectId'];
  name?: InputMaybe<Scalars['String']>;
  nit?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  visibleOnWeb?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateBranchProductInput = {
  id: Scalars['ObjectId'];
  isVisibleOnMenu?: InputMaybe<Scalars['Boolean']>;
  isVisibleOnWeb?: InputMaybe<Scalars['Boolean']>;
  price?: InputMaybe<Scalars['Float']>;
};

export type UpdateCategoryInput = {
  id: Scalars['ObjectId'];
  name?: InputMaybe<Scalars['String']>;
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
  categoryId?: InputMaybe<Scalars['ObjectId']>;
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


export type CreateProductMutation = { __typename?: 'Mutation', createProduct?: { __typename?: 'ProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type UpdateProductMutationVariables = Exact<{
  updateProductInput: UpdateProductInput;
}>;


export type UpdateProductMutation = { __typename?: 'Mutation', updateProduct?: { __typename?: 'ProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type DeleteProductMutationVariables = Exact<{
  deleteProductId: Scalars['ObjectId'];
}>;


export type DeleteProductMutation = { __typename?: 'Mutation', deleteProduct?: { __typename?: 'ProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CreateStockMutationVariables = Exact<{
  createStockInput: CreateStockInput;
}>;


export type CreateStockMutation = { __typename?: 'Mutation', createStock?: { __typename?: 'StockResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CreatStockMovementMutationVariables = Exact<{
  createStockMovementInput: CreateStockMovementInput;
}>;


export type CreatStockMovementMutation = { __typename?: 'Mutation', creatStockMovement?: { __typename?: 'StockResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CreateBranchMutationVariables = Exact<{
  createBranchInput: CreateBranchInput;
}>;


export type CreateBranchMutation = { __typename?: 'Mutation', createBranch?: { __typename?: 'BranchResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type UpdateBranchMutationVariables = Exact<{
  updateBranchInput: UpdateBranchInput;
}>;


export type UpdateBranchMutation = { __typename?: 'Mutation', updateBranch?: { __typename?: 'BranchResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type DeleteBranchMutationVariables = Exact<{
  deleteBranchId: Scalars['ObjectId'];
}>;


export type DeleteBranchMutation = { __typename?: 'Mutation', deleteBranch?: { __typename?: 'BranchResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CreateBranchProductMutationVariables = Exact<{
  createBranchProductInput: CreateBranchProductInput;
}>;


export type CreateBranchProductMutation = { __typename?: 'Mutation', createBranchProduct?: { __typename?: 'BranchProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type UpdateBranchProductMutationVariables = Exact<{
  updateBranchProductInput: UpdateBranchProductInput;
}>;


export type UpdateBranchProductMutation = { __typename?: 'Mutation', updateBranchProduct?: { __typename?: 'BranchProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type OpenCashMutationVariables = Exact<{
  createTurnInput: CreateTurnInput;
}>;


export type OpenCashMutation = { __typename?: 'Mutation', openCash?: { __typename?: 'CashResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CloseCashMutationVariables = Exact<{
  closeTurnInput: CloseTurnInput;
}>;


export type CloseCashMutation = { __typename?: 'Mutation', closeCash?: { __typename?: 'CashResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CreateCashMovementMutationVariables = Exact<{
  createTurnMovementInput: CreateTurnMovementInput;
}>;


export type CreateCashMovementMutation = { __typename?: 'Mutation', createCashMovement?: { __typename?: 'CashTurnMovementResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CreateSaleMutationVariables = Exact<{
  createSaleInput: CreateSaleInput;
}>;


export type CreateSaleMutation = { __typename?: 'Mutation', createSale?: { __typename?: 'SaleResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CreateBranchProductStockMovementMutationVariables = Exact<{
  createBranchProductStockMovementInput: CreateBranchProductStockMovementInput;
}>;


export type CreateBranchProductStockMovementMutation = { __typename?: 'Mutation', createBranchProductStockMovement?: { __typename?: 'BranchProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CreateCategoryMutationVariables = Exact<{
  createCategoryInput: CreateCategoryInput;
}>;


export type CreateCategoryMutation = { __typename?: 'Mutation', createCategory?: { __typename?: 'CategoryResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type UpdateCategoryMutationVariables = Exact<{
  updateCategoryInput: UpdateCategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory?: { __typename?: 'CategoryResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type DeleteCategoryMutationVariables = Exact<{
  deleteCategoryId: Scalars['ObjectId'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory?: { __typename?: 'CategoryResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type CancelSaleMutationVariables = Exact<{
  cancelSaleInput: CancelSaleInput;
}>;


export type CancelSaleMutation = { __typename?: 'Mutation', cancelSale?: { __typename?: 'SaleResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

export type PublicCreateCustomerMutationVariables = Exact<{
  createCustomerInput: CreateCustomerInput;
}>;


export type PublicCreateCustomerMutation = { __typename?: 'Mutation', publicCreateCustomer?: { __typename?: 'CustomerResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Customer', id: any, name: string, lastName: string, email?: string | null, phone: string, ordersIds: Array<any> } | null } | null };

export type PublicCreateOrderMutationVariables = Exact<{
  createOrderInput: CreateOrderInput;
}>;


export type PublicCreateOrderMutation = { __typename?: 'Mutation', publicCreateOrder?: { __typename?: 'OrderResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null } | null };

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


export type GetProductsQuery = { __typename?: 'Query', getProducts?: { __typename?: 'ProductsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, categoryId?: any | null, cost?: number | null, image?: string | null, warehouses: Array<any>, category?: { __typename?: 'Category', id: any, name: string, code: string } | null }> | null } | null };

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


export type GetWarehouseHistoryQuery = { __typename?: 'Query', getWarehouseHistory?: { __typename?: 'StocksHistoryResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'StockHistory', id: any, warehouseId: any, type: StockMovementTypeEnum, date: any, stockBefore: number, stockLater: number, stock?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, lastStockEntry: number, units: string, product?: { __typename?: 'Product', id: any, name: string } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null }> | null } | null };

export type GetStockHistoryQueryVariables = Exact<{
  paginationInput: PaginationInput;
  stockId: Scalars['ObjectId'];
}>;


export type GetStockHistoryQuery = { __typename?: 'Query', getStockHistory?: { __typename?: 'StocksHistoryResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'StockHistory', id: any, stockId: any, warehouseId: any, type: StockMovementTypeEnum, date: any, stockBefore: number, stockLater: number, stock?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, lastStockEntry: number, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null } | null } | null }> | null } | null };

export type GetStockByIdQueryVariables = Exact<{
  getStockByIdId: Scalars['ObjectId'];
}>;


export type GetStockByIdQuery = { __typename?: 'Query', getStockById?: { __typename?: 'StockResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, securityStock?: number | null, units: string, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string, cost?: number | null, image?: string | null, warehouses: Array<any> } | null, warehouse?: { __typename?: 'Warehouse', id: any, name: string, description: string, address: string } | null } | null } | null };

export type GetProductsOutOfWarehouseQueryVariables = Exact<{
  paginationInput: PaginationInput;
  warehouseId: Scalars['ObjectId'];
}>;


export type GetProductsOutOfWarehouseQuery = { __typename?: 'Query', getProductsOutOfWarehouse?: { __typename?: 'ProductsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, description: string }> | null } | null };

export type GetWarehouseStockQueryVariables = Exact<{
  warehouseStockPaginationInput: WarehouseStockPaginationInput;
}>;


export type GetWarehouseStockQuery = { __typename?: 'Query', getWarehouseStock?: { __typename?: 'StocksResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, lastStockEntry: number, units: string, product?: { __typename?: 'Product', id: any, name: string } | null, warehouse?: { __typename?: 'Warehouse', id: any } | null }> | null } | null };

export type GetProductByIdQueryVariables = Exact<{
  getProductByIdId: Scalars['ObjectId'];
}>;


export type GetProductByIdQuery = { __typename?: 'Query', getProductById?: { __typename?: 'ProductResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, image?: string | null, description: string } | null } | null };

export type GetBranchProductsPaginatedQueryVariables = Exact<{
  paginationInput: PaginationInput;
  branchId: Scalars['ObjectId'];
}>;


export type GetBranchProductsPaginatedQuery = { __typename?: 'Query', getBranchProductsPaginated?: { __typename?: 'BranchProductsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'BranchProduct', id: any, branchId: any, productId: any, price: number, stock: number, isVisibleOnWeb: boolean, isVisibleOnMenu: boolean, product?: { __typename?: 'Product', id: any, name: string } | null }> | null } | null };

export type GetBranchesPaginatedQueryVariables = Exact<{
  paginationInput: PaginationInput;
}>;


export type GetBranchesPaginatedQuery = { __typename?: 'Query', getBranchesPaginated?: { __typename?: 'BranchsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Branch', id: any, name: string, code: string, city: string, direction: string, phone?: string | null, nit?: string | null, visibleOnWeb: boolean, cashId: any }> | null } | null };

export type GetBranchByIdQueryVariables = Exact<{
  getBranchByIdId: Scalars['ObjectId'];
}>;


export type GetBranchByIdQuery = { __typename?: 'Query', getBranchById?: { __typename?: 'BranchResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Branch', id: any, name: string, code: string, city: string, direction: string, phone?: string | null, nit?: string | null, visibleOnWeb: boolean, cashId: any, cash?: { __typename?: 'Cash', id: any, branchId: any, amount: number, currentTurnId?: any | null, isOpen: boolean, currentTurn?: { __typename?: 'Turn', id: any, cashId: any, isOpen: boolean, amountOfMovents: number, openInfo: { __typename?: 'OpenTurnInfo', amount: number, physicialAmount: number, difference: number, date: any, observation?: string | null, openBy?: any | null, openByInfo?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null }, closeInfo?: { __typename?: 'CloseTurnInfo', amount: number, physicialAmount: number, difference: number, date: any, observation?: string | null, closeBy?: any | null, closeByInfo?: { __typename?: 'User', id: any, name: string, lastName: string, email: string, phone: string, lastLogin?: any | null, status: boolean, createdBy?: any | null, roleId: any, roleInfo?: { __typename?: 'Role', id: any, name: string, code: string, status: boolean } | null } | null } | null } | null } | null } | null } | null };

export type GetCashByIdQueryVariables = Exact<{
  getCashByIdId: Scalars['ObjectId'];
}>;


export type GetCashByIdQuery = { __typename?: 'Query', getCashById?: { __typename?: 'CashResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Cash', id: any, branchId: any, amount: number, currentTurnId?: any | null, isOpen: boolean, currentTurn?: { __typename?: 'Turn', id: any, cashId: any, isOpen: boolean, amountOfMovents: number } | null } | null } | null };

export type GetCashTurnMovementsQueryVariables = Exact<{
  paginationInput: PaginationInput;
  turnId: Scalars['ObjectId'];
}>;


export type GetCashTurnMovementsQuery = { __typename?: 'Query', getCashTurnMovements?: { __typename?: 'CashTurnMovementsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'TurnMovements', id: any, turnId: any, cashId: any, amount: number, date: any, concept?: string | null, createdByInfo?: { __typename?: 'User', id: any, name: string, lastName: string } | null }> | null } | null };

export type GetSalesPaginatedQueryVariables = Exact<{
  salesPaginationInput: SalesPaginationInput;
}>;


export type GetSalesPaginatedQuery = { __typename?: 'Query', getSalesPaginated?: { __typename?: 'SalesResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Sale', id: any, branchId: any, total: number, discount: number, date: any, code: string, canceled?: boolean | null, products: Array<{ __typename?: 'SaleItem', productId: any, product?: { __typename?: 'Product', id: any, name: string } | null }>, createdByInfo?: { __typename?: 'User', id: any, name: string, lastName: string } | null }> | null } | null };

export type GetSalesSummaryQueryVariables = Exact<{
  salesSummaryInput: SalesSummaryInput;
}>;


export type GetSalesSummaryQuery = { __typename?: 'Query', getSalesSummary?: { __typename?: 'SalesSummaryResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', field?: string | null, message: string }> | null, data?: { __typename?: 'SalesSummary', total: number, paymentMethods: Array<{ __typename?: 'SalesByPaymentMethodSummary', method?: PaymentMethodEnum | null, total: number }> } | null } | null };

export type GetSaleByIdQueryVariables = Exact<{
  getSaleByIdId: Scalars['ObjectId'];
}>;


export type GetSaleByIdQuery = { __typename?: 'Query', getSaleById?: { __typename?: 'SaleResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Sale', id: any, branchId: any, code: string, total: number, products: Array<{ __typename?: 'SaleItem', productId: any, qty: number, total: number, product?: { __typename?: 'Product', id: any, name: string, code: string, image?: string | null } | null }> } | null } | null };

export type GetCategoriesQueryVariables = Exact<{
  paginationInput: PaginationInput;
}>;


export type GetCategoriesQuery = { __typename?: 'Query', getCategories?: { __typename?: 'CategoriesResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Category', id: any, name: string, code: string }> | null } | null };

export type GetCategoryByIdQueryVariables = Exact<{
  getCategoryByIdId: Scalars['ObjectId'];
}>;


export type GetCategoryByIdQuery = { __typename?: 'Query', getCategoryById?: { __typename?: 'CategoryResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Category', id: any, name: string, code: string } | null } | null };

export type GetWarehousesOfProductQueryVariables = Exact<{
  paginationInput: PaginationInput;
  productId: Scalars['ObjectId'];
}>;


export type GetWarehousesOfProductQuery = { __typename?: 'Query', getWarehousesOfProduct?: { __typename?: 'WarehousesResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Warehouse', id: any, name: string }> | null } | null };

export type GetProductStockQueryVariables = Exact<{
  paginationInput: PaginationInput;
  productId: Scalars['ObjectId'];
  warehouseId?: InputMaybe<Scalars['ObjectId']>;
}>;


export type GetProductStockQuery = { __typename?: 'Query', getProductStock?: { __typename?: 'StocksResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'Stock', id: any, productId: any, warehouseId: any, quantity: number, units: string }> | null } | null };

export type GetPublicProductsQueryVariables = Exact<{
  paginationInput: PaginationInput;
  branchId: Scalars['ObjectId'];
}>;


export type GetPublicProductsQuery = { __typename?: 'Query', getPublicProducts?: { __typename?: 'BranchProductsResponse', status: StatusEnum, message?: string | null, totalRecords?: number | null, totalPages?: number | null, rows?: number | null, currentPage?: number | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: Array<{ __typename?: 'BranchProduct', id: any, branchId: any, productId: any, price: number, stock: number, isVisibleOnWeb: boolean, isVisibleOnMenu: boolean, product?: { __typename?: 'Product', id: any, name: string, suggetedPrice: number, code: string, internalCode?: string | null, description: string, categoryId?: any | null, cost?: number | null, image?: string | null, warehouses: Array<any> } | null }> | null } | null };

export type GetPublicCustomerByIdQueryVariables = Exact<{
  getPublicCustomerByIdId: Scalars['ObjectId'];
}>;


export type GetPublicCustomerByIdQuery = { __typename?: 'Query', getPublicCustomerById?: { __typename?: 'CustomerResponse', status: StatusEnum, message?: string | null, errorInput?: Array<{ __typename?: 'ErrorInput', message: string, field?: string | null }> | null, data?: { __typename?: 'Customer', id: any, name: string, lastName: string, email?: string | null, phone: string, lastOrderDate?: any | null, ordersIds: Array<any>, addressInfo: Array<{ __typename?: 'Address', id: any, latitude: number, longitude: number, detail: string }> } | null } | null };


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
      message
      field
    }
    status
    message
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
    status
    message
    errorInput {
      message
      field
    }
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
    errorInput {
      message
      field
    }
    status
    message
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
export const UpdateBranchProductDocument = gql`
    mutation UpdateBranchProduct($updateBranchProductInput: UpdateBranchProductInput!) {
  updateBranchProduct(updateBranchProductInput: $updateBranchProductInput) {
    errorInput {
      message
      field
    }
    status
    message
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
export const CloseCashDocument = gql`
    mutation CloseCash($closeTurnInput: CloseTurnInput!) {
  closeCash(closeTurnInput: $closeTurnInput) {
    errorInput {
      message
      field
    }
    status
    message
  }
}
    `;
export type CloseCashMutationFn = Apollo.MutationFunction<CloseCashMutation, CloseCashMutationVariables>;

/**
 * __useCloseCashMutation__
 *
 * To run a mutation, you first call `useCloseCashMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseCashMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeCashMutation, { data, loading, error }] = useCloseCashMutation({
 *   variables: {
 *      closeTurnInput: // value for 'closeTurnInput'
 *   },
 * });
 */
export function useCloseCashMutation(baseOptions?: Apollo.MutationHookOptions<CloseCashMutation, CloseCashMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CloseCashMutation, CloseCashMutationVariables>(CloseCashDocument, options);
      }
export type CloseCashMutationHookResult = ReturnType<typeof useCloseCashMutation>;
export type CloseCashMutationResult = Apollo.MutationResult<CloseCashMutation>;
export type CloseCashMutationOptions = Apollo.BaseMutationOptions<CloseCashMutation, CloseCashMutationVariables>;
export const CreateCashMovementDocument = gql`
    mutation CreateCashMovement($createTurnMovementInput: CreateTurnMovementInput!) {
  createCashMovement(createTurnMovementInput: $createTurnMovementInput) {
    errorInput {
      message
      field
    }
    status
    message
  }
}
    `;
export type CreateCashMovementMutationFn = Apollo.MutationFunction<CreateCashMovementMutation, CreateCashMovementMutationVariables>;

/**
 * __useCreateCashMovementMutation__
 *
 * To run a mutation, you first call `useCreateCashMovementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCashMovementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCashMovementMutation, { data, loading, error }] = useCreateCashMovementMutation({
 *   variables: {
 *      createTurnMovementInput: // value for 'createTurnMovementInput'
 *   },
 * });
 */
export function useCreateCashMovementMutation(baseOptions?: Apollo.MutationHookOptions<CreateCashMovementMutation, CreateCashMovementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCashMovementMutation, CreateCashMovementMutationVariables>(CreateCashMovementDocument, options);
      }
export type CreateCashMovementMutationHookResult = ReturnType<typeof useCreateCashMovementMutation>;
export type CreateCashMovementMutationResult = Apollo.MutationResult<CreateCashMovementMutation>;
export type CreateCashMovementMutationOptions = Apollo.BaseMutationOptions<CreateCashMovementMutation, CreateCashMovementMutationVariables>;
export const CreateSaleDocument = gql`
    mutation CreateSale($createSaleInput: CreateSaleInput!) {
  createSale(createSaleInput: $createSaleInput) {
    errorInput {
      message
      field
    }
    status
    message
  }
}
    `;
export type CreateSaleMutationFn = Apollo.MutationFunction<CreateSaleMutation, CreateSaleMutationVariables>;

/**
 * __useCreateSaleMutation__
 *
 * To run a mutation, you first call `useCreateSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSaleMutation, { data, loading, error }] = useCreateSaleMutation({
 *   variables: {
 *      createSaleInput: // value for 'createSaleInput'
 *   },
 * });
 */
export function useCreateSaleMutation(baseOptions?: Apollo.MutationHookOptions<CreateSaleMutation, CreateSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateSaleMutation, CreateSaleMutationVariables>(CreateSaleDocument, options);
      }
export type CreateSaleMutationHookResult = ReturnType<typeof useCreateSaleMutation>;
export type CreateSaleMutationResult = Apollo.MutationResult<CreateSaleMutation>;
export type CreateSaleMutationOptions = Apollo.BaseMutationOptions<CreateSaleMutation, CreateSaleMutationVariables>;
export const CreateBranchProductStockMovementDocument = gql`
    mutation CreateBranchProductStockMovement($createBranchProductStockMovementInput: CreateBranchProductStockMovementInput!) {
  createBranchProductStockMovement(
    createBranchProductStockMovementInput: $createBranchProductStockMovementInput
  ) {
    errorInput {
      message
      field
    }
    status
    message
  }
}
    `;
export type CreateBranchProductStockMovementMutationFn = Apollo.MutationFunction<CreateBranchProductStockMovementMutation, CreateBranchProductStockMovementMutationVariables>;

/**
 * __useCreateBranchProductStockMovementMutation__
 *
 * To run a mutation, you first call `useCreateBranchProductStockMovementMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBranchProductStockMovementMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBranchProductStockMovementMutation, { data, loading, error }] = useCreateBranchProductStockMovementMutation({
 *   variables: {
 *      createBranchProductStockMovementInput: // value for 'createBranchProductStockMovementInput'
 *   },
 * });
 */
export function useCreateBranchProductStockMovementMutation(baseOptions?: Apollo.MutationHookOptions<CreateBranchProductStockMovementMutation, CreateBranchProductStockMovementMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBranchProductStockMovementMutation, CreateBranchProductStockMovementMutationVariables>(CreateBranchProductStockMovementDocument, options);
      }
export type CreateBranchProductStockMovementMutationHookResult = ReturnType<typeof useCreateBranchProductStockMovementMutation>;
export type CreateBranchProductStockMovementMutationResult = Apollo.MutationResult<CreateBranchProductStockMovementMutation>;
export type CreateBranchProductStockMovementMutationOptions = Apollo.BaseMutationOptions<CreateBranchProductStockMovementMutation, CreateBranchProductStockMovementMutationVariables>;
export const CreateCategoryDocument = gql`
    mutation CreateCategory($createCategoryInput: CreateCategoryInput!) {
  createCategory(createCategoryInput: $createCategoryInput) {
    errorInput {
      message
      field
    }
    status
    message
  }
}
    `;
export type CreateCategoryMutationFn = Apollo.MutationFunction<CreateCategoryMutation, CreateCategoryMutationVariables>;

/**
 * __useCreateCategoryMutation__
 *
 * To run a mutation, you first call `useCreateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCategoryMutation, { data, loading, error }] = useCreateCategoryMutation({
 *   variables: {
 *      createCategoryInput: // value for 'createCategoryInput'
 *   },
 * });
 */
export function useCreateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<CreateCategoryMutation, CreateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCategoryMutation, CreateCategoryMutationVariables>(CreateCategoryDocument, options);
      }
export type CreateCategoryMutationHookResult = ReturnType<typeof useCreateCategoryMutation>;
export type CreateCategoryMutationResult = Apollo.MutationResult<CreateCategoryMutation>;
export type CreateCategoryMutationOptions = Apollo.BaseMutationOptions<CreateCategoryMutation, CreateCategoryMutationVariables>;
export const UpdateCategoryDocument = gql`
    mutation UpdateCategory($updateCategoryInput: UpdateCategoryInput!) {
  updateCategory(updateCategoryInput: $updateCategoryInput) {
    errorInput {
      message
      field
    }
    status
    message
  }
}
    `;
export type UpdateCategoryMutationFn = Apollo.MutationFunction<UpdateCategoryMutation, UpdateCategoryMutationVariables>;

/**
 * __useUpdateCategoryMutation__
 *
 * To run a mutation, you first call `useUpdateCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCategoryMutation, { data, loading, error }] = useUpdateCategoryMutation({
 *   variables: {
 *      updateCategoryInput: // value for 'updateCategoryInput'
 *   },
 * });
 */
export function useUpdateCategoryMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCategoryMutation, UpdateCategoryMutationVariables>(UpdateCategoryDocument, options);
      }
export type UpdateCategoryMutationHookResult = ReturnType<typeof useUpdateCategoryMutation>;
export type UpdateCategoryMutationResult = Apollo.MutationResult<UpdateCategoryMutation>;
export type UpdateCategoryMutationOptions = Apollo.BaseMutationOptions<UpdateCategoryMutation, UpdateCategoryMutationVariables>;
export const DeleteCategoryDocument = gql`
    mutation DeleteCategory($deleteCategoryId: ObjectId!) {
  deleteCategory(id: $deleteCategoryId) {
    errorInput {
      message
      field
    }
    status
    message
  }
}
    `;
export type DeleteCategoryMutationFn = Apollo.MutationFunction<DeleteCategoryMutation, DeleteCategoryMutationVariables>;

/**
 * __useDeleteCategoryMutation__
 *
 * To run a mutation, you first call `useDeleteCategoryMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCategoryMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCategoryMutation, { data, loading, error }] = useDeleteCategoryMutation({
 *   variables: {
 *      deleteCategoryId: // value for 'deleteCategoryId'
 *   },
 * });
 */
export function useDeleteCategoryMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCategoryMutation, DeleteCategoryMutationVariables>(DeleteCategoryDocument, options);
      }
export type DeleteCategoryMutationHookResult = ReturnType<typeof useDeleteCategoryMutation>;
export type DeleteCategoryMutationResult = Apollo.MutationResult<DeleteCategoryMutation>;
export type DeleteCategoryMutationOptions = Apollo.BaseMutationOptions<DeleteCategoryMutation, DeleteCategoryMutationVariables>;
export const CancelSaleDocument = gql`
    mutation CancelSale($cancelSaleInput: CancelSaleInput!) {
  cancelSale(cancelSaleInput: $cancelSaleInput) {
    errorInput {
      message
      field
    }
    status
    message
  }
}
    `;
export type CancelSaleMutationFn = Apollo.MutationFunction<CancelSaleMutation, CancelSaleMutationVariables>;

/**
 * __useCancelSaleMutation__
 *
 * To run a mutation, you first call `useCancelSaleMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCancelSaleMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [cancelSaleMutation, { data, loading, error }] = useCancelSaleMutation({
 *   variables: {
 *      cancelSaleInput: // value for 'cancelSaleInput'
 *   },
 * });
 */
export function useCancelSaleMutation(baseOptions?: Apollo.MutationHookOptions<CancelSaleMutation, CancelSaleMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CancelSaleMutation, CancelSaleMutationVariables>(CancelSaleDocument, options);
      }
export type CancelSaleMutationHookResult = ReturnType<typeof useCancelSaleMutation>;
export type CancelSaleMutationResult = Apollo.MutationResult<CancelSaleMutation>;
export type CancelSaleMutationOptions = Apollo.BaseMutationOptions<CancelSaleMutation, CancelSaleMutationVariables>;
export const PublicCreateCustomerDocument = gql`
    mutation PublicCreateCustomer($createCustomerInput: CreateCustomerInput!) {
  publicCreateCustomer(createCustomerInput: $createCustomerInput) {
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
      ordersIds
    }
  }
}
    `;
export type PublicCreateCustomerMutationFn = Apollo.MutationFunction<PublicCreateCustomerMutation, PublicCreateCustomerMutationVariables>;

/**
 * __usePublicCreateCustomerMutation__
 *
 * To run a mutation, you first call `usePublicCreateCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublicCreateCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publicCreateCustomerMutation, { data, loading, error }] = usePublicCreateCustomerMutation({
 *   variables: {
 *      createCustomerInput: // value for 'createCustomerInput'
 *   },
 * });
 */
export function usePublicCreateCustomerMutation(baseOptions?: Apollo.MutationHookOptions<PublicCreateCustomerMutation, PublicCreateCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublicCreateCustomerMutation, PublicCreateCustomerMutationVariables>(PublicCreateCustomerDocument, options);
      }
export type PublicCreateCustomerMutationHookResult = ReturnType<typeof usePublicCreateCustomerMutation>;
export type PublicCreateCustomerMutationResult = Apollo.MutationResult<PublicCreateCustomerMutation>;
export type PublicCreateCustomerMutationOptions = Apollo.BaseMutationOptions<PublicCreateCustomerMutation, PublicCreateCustomerMutationVariables>;
export const PublicCreateOrderDocument = gql`
    mutation PublicCreateOrder($createOrderInput: CreateOrderInput!) {
  publicCreateOrder(createOrderInput: $createOrderInput) {
    errorInput {
      message
      field
    }
    status
    message
  }
}
    `;
export type PublicCreateOrderMutationFn = Apollo.MutationFunction<PublicCreateOrderMutation, PublicCreateOrderMutationVariables>;

/**
 * __usePublicCreateOrderMutation__
 *
 * To run a mutation, you first call `usePublicCreateOrderMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePublicCreateOrderMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [publicCreateOrderMutation, { data, loading, error }] = usePublicCreateOrderMutation({
 *   variables: {
 *      createOrderInput: // value for 'createOrderInput'
 *   },
 * });
 */
export function usePublicCreateOrderMutation(baseOptions?: Apollo.MutationHookOptions<PublicCreateOrderMutation, PublicCreateOrderMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<PublicCreateOrderMutation, PublicCreateOrderMutationVariables>(PublicCreateOrderDocument, options);
      }
export type PublicCreateOrderMutationHookResult = ReturnType<typeof usePublicCreateOrderMutation>;
export type PublicCreateOrderMutationResult = Apollo.MutationResult<PublicCreateOrderMutation>;
export type PublicCreateOrderMutationOptions = Apollo.BaseMutationOptions<PublicCreateOrderMutation, PublicCreateOrderMutationVariables>;
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
      categoryId
      cost
      image
      warehouses
      category {
        id
        name
        code
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
      warehouseId
      type
      date
      stockBefore
      stockLater
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
        }
        warehouse {
          id
          name
          description
          address
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
      type
      date
      stockBefore
      stockLater
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
      lastStockEntry
      units
      product {
        id
        name
      }
      warehouse {
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
      image
      description
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
      stock
      isVisibleOnWeb
      isVisibleOnMenu
      product {
        id
        name
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
      visibleOnWeb
      cashId
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
      visibleOnWeb
      cashId
      cash {
        id
        branchId
        amount
        currentTurnId
        isOpen
        currentTurn {
          id
          cashId
          isOpen
          amountOfMovents
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
        amountOfMovents
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
export const GetCashTurnMovementsDocument = gql`
    query GetCashTurnMovements($paginationInput: PaginationInput!, $turnId: ObjectId!) {
  getCashTurnMovements(paginationInput: $paginationInput, turnId: $turnId) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      turnId
      cashId
      amount
      date
      concept
      createdByInfo {
        id
        name
        lastName
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
 * __useGetCashTurnMovementsQuery__
 *
 * To run a query within a React component, call `useGetCashTurnMovementsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCashTurnMovementsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCashTurnMovementsQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *      turnId: // value for 'turnId'
 *   },
 * });
 */
export function useGetCashTurnMovementsQuery(baseOptions: Apollo.QueryHookOptions<GetCashTurnMovementsQuery, GetCashTurnMovementsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCashTurnMovementsQuery, GetCashTurnMovementsQueryVariables>(GetCashTurnMovementsDocument, options);
      }
export function useGetCashTurnMovementsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCashTurnMovementsQuery, GetCashTurnMovementsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCashTurnMovementsQuery, GetCashTurnMovementsQueryVariables>(GetCashTurnMovementsDocument, options);
        }
export type GetCashTurnMovementsQueryHookResult = ReturnType<typeof useGetCashTurnMovementsQuery>;
export type GetCashTurnMovementsLazyQueryHookResult = ReturnType<typeof useGetCashTurnMovementsLazyQuery>;
export type GetCashTurnMovementsQueryResult = Apollo.QueryResult<GetCashTurnMovementsQuery, GetCashTurnMovementsQueryVariables>;
export const GetSalesPaginatedDocument = gql`
    query GetSalesPaginated($salesPaginationInput: SalesPaginationInput!) {
  getSalesPaginated(salesPaginationInput: $salesPaginationInput) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      branchId
      products {
        productId
        product {
          id
          name
        }
      }
      total
      discount
      date
      code
      canceled
      createdByInfo {
        id
        name
        lastName
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
 * __useGetSalesPaginatedQuery__
 *
 * To run a query within a React component, call `useGetSalesPaginatedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesPaginatedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesPaginatedQuery({
 *   variables: {
 *      salesPaginationInput: // value for 'salesPaginationInput'
 *   },
 * });
 */
export function useGetSalesPaginatedQuery(baseOptions: Apollo.QueryHookOptions<GetSalesPaginatedQuery, GetSalesPaginatedQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSalesPaginatedQuery, GetSalesPaginatedQueryVariables>(GetSalesPaginatedDocument, options);
      }
export function useGetSalesPaginatedLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSalesPaginatedQuery, GetSalesPaginatedQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSalesPaginatedQuery, GetSalesPaginatedQueryVariables>(GetSalesPaginatedDocument, options);
        }
export type GetSalesPaginatedQueryHookResult = ReturnType<typeof useGetSalesPaginatedQuery>;
export type GetSalesPaginatedLazyQueryHookResult = ReturnType<typeof useGetSalesPaginatedLazyQuery>;
export type GetSalesPaginatedQueryResult = Apollo.QueryResult<GetSalesPaginatedQuery, GetSalesPaginatedQueryVariables>;
export const GetSalesSummaryDocument = gql`
    query GetSalesSummary($salesSummaryInput: SalesSummaryInput!) {
  getSalesSummary(salesSummaryInput: $salesSummaryInput) {
    errorInput {
      field
      message
    }
    status
    message
    data {
      paymentMethods {
        method
        total
      }
      total
    }
  }
}
    `;

/**
 * __useGetSalesSummaryQuery__
 *
 * To run a query within a React component, call `useGetSalesSummaryQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSalesSummaryQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSalesSummaryQuery({
 *   variables: {
 *      salesSummaryInput: // value for 'salesSummaryInput'
 *   },
 * });
 */
export function useGetSalesSummaryQuery(baseOptions: Apollo.QueryHookOptions<GetSalesSummaryQuery, GetSalesSummaryQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSalesSummaryQuery, GetSalesSummaryQueryVariables>(GetSalesSummaryDocument, options);
      }
export function useGetSalesSummaryLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSalesSummaryQuery, GetSalesSummaryQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSalesSummaryQuery, GetSalesSummaryQueryVariables>(GetSalesSummaryDocument, options);
        }
export type GetSalesSummaryQueryHookResult = ReturnType<typeof useGetSalesSummaryQuery>;
export type GetSalesSummaryLazyQueryHookResult = ReturnType<typeof useGetSalesSummaryLazyQuery>;
export type GetSalesSummaryQueryResult = Apollo.QueryResult<GetSalesSummaryQuery, GetSalesSummaryQueryVariables>;
export const GetSaleByIdDocument = gql`
    query GetSaleById($getSaleByIdId: ObjectId!) {
  getSaleById(id: $getSaleByIdId) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      branchId
      products {
        productId
        qty
        total
        product {
          id
          name
          code
          image
        }
      }
      code
      total
    }
  }
}
    `;

/**
 * __useGetSaleByIdQuery__
 *
 * To run a query within a React component, call `useGetSaleByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSaleByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSaleByIdQuery({
 *   variables: {
 *      getSaleByIdId: // value for 'getSaleByIdId'
 *   },
 * });
 */
export function useGetSaleByIdQuery(baseOptions: Apollo.QueryHookOptions<GetSaleByIdQuery, GetSaleByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSaleByIdQuery, GetSaleByIdQueryVariables>(GetSaleByIdDocument, options);
      }
export function useGetSaleByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSaleByIdQuery, GetSaleByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSaleByIdQuery, GetSaleByIdQueryVariables>(GetSaleByIdDocument, options);
        }
export type GetSaleByIdQueryHookResult = ReturnType<typeof useGetSaleByIdQuery>;
export type GetSaleByIdLazyQueryHookResult = ReturnType<typeof useGetSaleByIdLazyQuery>;
export type GetSaleByIdQueryResult = Apollo.QueryResult<GetSaleByIdQuery, GetSaleByIdQueryVariables>;
export const GetCategoriesDocument = gql`
    query GetCategories($paginationInput: PaginationInput!) {
  getCategories(paginationInput: $paginationInput) {
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
    }
    totalRecords
    totalPages
    rows
    currentPage
  }
}
    `;

/**
 * __useGetCategoriesQuery__
 *
 * To run a query within a React component, call `useGetCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoriesQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *   },
 * });
 */
export function useGetCategoriesQuery(baseOptions: Apollo.QueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
      }
export function useGetCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoriesQuery, GetCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoriesQuery, GetCategoriesQueryVariables>(GetCategoriesDocument, options);
        }
export type GetCategoriesQueryHookResult = ReturnType<typeof useGetCategoriesQuery>;
export type GetCategoriesLazyQueryHookResult = ReturnType<typeof useGetCategoriesLazyQuery>;
export type GetCategoriesQueryResult = Apollo.QueryResult<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryByIdDocument = gql`
    query GetCategoryById($getCategoryByIdId: ObjectId!) {
  getCategoryById(id: $getCategoryByIdId) {
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
    }
  }
}
    `;

/**
 * __useGetCategoryByIdQuery__
 *
 * To run a query within a React component, call `useGetCategoryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCategoryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCategoryByIdQuery({
 *   variables: {
 *      getCategoryByIdId: // value for 'getCategoryByIdId'
 *   },
 * });
 */
export function useGetCategoryByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
      }
export function useGetCategoryByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>(GetCategoryByIdDocument, options);
        }
export type GetCategoryByIdQueryHookResult = ReturnType<typeof useGetCategoryByIdQuery>;
export type GetCategoryByIdLazyQueryHookResult = ReturnType<typeof useGetCategoryByIdLazyQuery>;
export type GetCategoryByIdQueryResult = Apollo.QueryResult<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>;
export const GetWarehousesOfProductDocument = gql`
    query GetWarehousesOfProduct($paginationInput: PaginationInput!, $productId: ObjectId!) {
  getWarehousesOfProduct(paginationInput: $paginationInput, productId: $productId) {
    errorInput {
      message
      field
    }
    status
    message
    data {
      id
      name
    }
    totalRecords
    totalPages
    rows
    currentPage
  }
}
    `;

/**
 * __useGetWarehousesOfProductQuery__
 *
 * To run a query within a React component, call `useGetWarehousesOfProductQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetWarehousesOfProductQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetWarehousesOfProductQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *      productId: // value for 'productId'
 *   },
 * });
 */
export function useGetWarehousesOfProductQuery(baseOptions: Apollo.QueryHookOptions<GetWarehousesOfProductQuery, GetWarehousesOfProductQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetWarehousesOfProductQuery, GetWarehousesOfProductQueryVariables>(GetWarehousesOfProductDocument, options);
      }
export function useGetWarehousesOfProductLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetWarehousesOfProductQuery, GetWarehousesOfProductQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetWarehousesOfProductQuery, GetWarehousesOfProductQueryVariables>(GetWarehousesOfProductDocument, options);
        }
export type GetWarehousesOfProductQueryHookResult = ReturnType<typeof useGetWarehousesOfProductQuery>;
export type GetWarehousesOfProductLazyQueryHookResult = ReturnType<typeof useGetWarehousesOfProductLazyQuery>;
export type GetWarehousesOfProductQueryResult = Apollo.QueryResult<GetWarehousesOfProductQuery, GetWarehousesOfProductQueryVariables>;
export const GetProductStockDocument = gql`
    query GetProductStock($paginationInput: PaginationInput!, $productId: ObjectId!, $warehouseId: ObjectId) {
  getProductStock(
    paginationInput: $paginationInput
    productId: $productId
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
      productId
      warehouseId
      quantity
      units
    }
    totalRecords
    totalPages
    rows
    currentPage
  }
}
    `;

/**
 * __useGetProductStockQuery__
 *
 * To run a query within a React component, call `useGetProductStockQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProductStockQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProductStockQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *      productId: // value for 'productId'
 *      warehouseId: // value for 'warehouseId'
 *   },
 * });
 */
export function useGetProductStockQuery(baseOptions: Apollo.QueryHookOptions<GetProductStockQuery, GetProductStockQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProductStockQuery, GetProductStockQueryVariables>(GetProductStockDocument, options);
      }
export function useGetProductStockLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProductStockQuery, GetProductStockQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProductStockQuery, GetProductStockQueryVariables>(GetProductStockDocument, options);
        }
export type GetProductStockQueryHookResult = ReturnType<typeof useGetProductStockQuery>;
export type GetProductStockLazyQueryHookResult = ReturnType<typeof useGetProductStockLazyQuery>;
export type GetProductStockQueryResult = Apollo.QueryResult<GetProductStockQuery, GetProductStockQueryVariables>;
export const GetPublicProductsDocument = gql`
    query GetPublicProducts($paginationInput: PaginationInput!, $branchId: ObjectId!) {
  getPublicProducts(paginationInput: $paginationInput, branchId: $branchId) {
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
      stock
      isVisibleOnWeb
      isVisibleOnMenu
      product {
        id
        name
        suggetedPrice
        code
        internalCode
        description
        categoryId
        cost
        image
        warehouses
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
 *      branchId: // value for 'branchId'
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
export const GetPublicCustomerByIdDocument = gql`
    query GetPublicCustomerById($getPublicCustomerByIdId: ObjectId!) {
  getPublicCustomerById(id: $getPublicCustomerByIdId) {
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
      lastOrderDate
      ordersIds
      addressInfo {
        id
        latitude
        longitude
        detail
      }
    }
  }
}
    `;

/**
 * __useGetPublicCustomerByIdQuery__
 *
 * To run a query within a React component, call `useGetPublicCustomerByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicCustomerByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicCustomerByIdQuery({
 *   variables: {
 *      getPublicCustomerByIdId: // value for 'getPublicCustomerByIdId'
 *   },
 * });
 */
export function useGetPublicCustomerByIdQuery(baseOptions: Apollo.QueryHookOptions<GetPublicCustomerByIdQuery, GetPublicCustomerByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPublicCustomerByIdQuery, GetPublicCustomerByIdQueryVariables>(GetPublicCustomerByIdDocument, options);
      }
export function useGetPublicCustomerByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicCustomerByIdQuery, GetPublicCustomerByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPublicCustomerByIdQuery, GetPublicCustomerByIdQueryVariables>(GetPublicCustomerByIdDocument, options);
        }
export type GetPublicCustomerByIdQueryHookResult = ReturnType<typeof useGetPublicCustomerByIdQuery>;
export type GetPublicCustomerByIdLazyQueryHookResult = ReturnType<typeof useGetPublicCustomerByIdLazyQuery>;
export type GetPublicCustomerByIdQueryResult = Apollo.QueryResult<GetPublicCustomerByIdQuery, GetPublicCustomerByIdQueryVariables>;