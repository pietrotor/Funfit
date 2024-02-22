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

export type Address = {
  __typename?: 'Address';
  customerId: Scalars['ObjectId']['output'];
  customerInfo?: Maybe<Customer>;
  detail: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
};

export type AddressResponse = ResponseBase & {
  __typename?: 'AddressResponse';
  data?: Maybe<Address>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type Branch = {
  __typename?: 'Branch';
  cash?: Maybe<Cash>;
  cashId: Scalars['ObjectId']['output'];
  city: Scalars['String']['output'];
  code: Scalars['String']['output'];
  direction: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
  nit?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  visibleOnWeb: Scalars['Boolean']['output'];
};

export type BranchProduct = {
  __typename?: 'BranchProduct';
  branch?: Maybe<Branch>;
  branchId: Scalars['ObjectId']['output'];
  id: Scalars['ObjectId']['output'];
  isVisibleOnMenu: Scalars['Boolean']['output'];
  isVisibleOnWeb: Scalars['Boolean']['output'];
  price: Scalars['Float']['output'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId']['output'];
  stock: Scalars['Float']['output'];
};

export type BranchProductResponse = ResponseBase & {
  __typename?: 'BranchProductResponse';
  data?: Maybe<BranchProduct>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type BranchProductsResponse = ResponseBase & {
  __typename?: 'BranchProductsResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<BranchProduct>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type BranchResponse = ResponseBase & {
  __typename?: 'BranchResponse';
  data?: Maybe<Branch>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type BranchsResponse = ResponseBase & {
  __typename?: 'BranchsResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Branch>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type CancelSaleInput = {
  reason: Scalars['String']['input'];
  returnCash?: InputMaybe<Scalars['Boolean']['input']>;
  returnStock: Scalars['Boolean']['input'];
  saleId: Scalars['ObjectId']['input'];
};

export type Cash = {
  __typename?: 'Cash';
  amount: Scalars['Float']['output'];
  branchId: Scalars['ObjectId']['output'];
  currentTurn?: Maybe<Turn>;
  currentTurnId?: Maybe<Scalars['ObjectId']['output']>;
  id: Scalars['ObjectId']['output'];
  isOpen: Scalars['Boolean']['output'];
};

export type CashResponse = ResponseBase & {
  __typename?: 'CashResponse';
  data?: Maybe<Cash>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type CashTurnMovementResponse = ResponseBase & {
  __typename?: 'CashTurnMovementResponse';
  data?: Maybe<TurnMovements>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type CashTurnMovementsResponse = ResponseBase & {
  __typename?: 'CashTurnMovementsResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<TurnMovements>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type CategoriesResponse = ResponseBase & {
  __typename?: 'CategoriesResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Category>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type Category = {
  __typename?: 'Category';
  code: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
};

export type CategoryResponse = ResponseBase & {
  __typename?: 'CategoryResponse';
  data?: Maybe<Category>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type CloseTurnInfo = {
  __typename?: 'CloseTurnInfo';
  amount: Scalars['Float']['output'];
  closeBy?: Maybe<Scalars['ObjectId']['output']>;
  closeByInfo?: Maybe<User>;
  date: Scalars['Date']['output'];
  difference: Scalars['Float']['output'];
  observation?: Maybe<Scalars['String']['output']>;
  physicialAmount: Scalars['Float']['output'];
};

export type CloseTurnInput = {
  amount: Scalars['Float']['input'];
  cashId: Scalars['ObjectId']['input'];
  difference: Scalars['Float']['input'];
  observation?: InputMaybe<Scalars['String']['input']>;
  physicialAmount: Scalars['Float']['input'];
  turnId: Scalars['ObjectId']['input'];
  updateToPhysicialAmount: Scalars['Boolean']['input'];
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

export type CreateAddressInput = {
  customerId: Scalars['ObjectId']['input'];
  detail: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
};

export type CreateBranchInput = {
  city: Scalars['String']['input'];
  code: Scalars['String']['input'];
  direction: Scalars['String']['input'];
  name: Scalars['String']['input'];
  nit?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  visibleOnWeb: Scalars['Boolean']['input'];
};

export type CreateBranchProductInput = {
  branchId: Scalars['ObjectId']['input'];
  isVisibleOnMenu: Scalars['Boolean']['input'];
  isVisibleOnWeb: Scalars['Boolean']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['ObjectId']['input'];
};

export type CreateBranchProductStockMovementInput = {
  branchId: Scalars['ObjectId']['input'];
  branchProductId: Scalars['ObjectId']['input'];
  date: Scalars['Date']['input'];
  observation?: InputMaybe<Scalars['String']['input']>;
  qty: Scalars['Float']['input'];
  stockId?: InputMaybe<Scalars['ObjectId']['input']>;
  type: StockMovementTypeEnum;
};

export type CreateCategoryInput = {
  name: Scalars['String']['input'];
};

export type CreateCustomerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateOrderInput = {
  addressId?: InputMaybe<Scalars['ObjectId']['input']>;
  branchId: Scalars['ObjectId']['input'];
  customerId: Scalars['ObjectId']['input'];
  deliveryMethod: DeliveryMethodEnum;
  discount: Scalars['Float']['input'];
  orderDetails?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: PaymentMethodEnum;
  pickUpInformation?: InputMaybe<Scalars['String']['input']>;
  products: Array<SaleItemInput>;
  subTotal: Scalars['Float']['input'];
  total: Scalars['Float']['input'];
};

export type CreateProductInput = {
  categoryId?: InputMaybe<Scalars['ObjectId']['input']>;
  code: Scalars['String']['input'];
  cost?: InputMaybe<Scalars['Float']['input']>;
  description: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  suggetedPrice: Scalars['Float']['input'];
};

export type CreateSaleInput = {
  amountRecibed: Scalars['Float']['input'];
  branchId: Scalars['ObjectId']['input'];
  change: Scalars['Float']['input'];
  client?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['Date']['input'];
  discount: Scalars['Float']['input'];
  observations?: InputMaybe<Scalars['String']['input']>;
  orderId?: InputMaybe<Scalars['ObjectId']['input']>;
  paymentMethod: PaymentMethodEnum;
  products: Array<SaleItemInput>;
  subTotal: Scalars['Float']['input'];
  total: Scalars['Float']['input'];
};

export type CreateStockInput = {
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

export type CreateTurnInput = {
  amount: Scalars['Float']['input'];
  cashId: Scalars['ObjectId']['input'];
  difference: Scalars['Float']['input'];
  observation?: InputMaybe<Scalars['String']['input']>;
  physicialAmount: Scalars['Float']['input'];
  updateToPhysicialAmount: Scalars['Boolean']['input'];
};

export type CreateTurnMovementInput = {
  amount: Scalars['Float']['input'];
  cashId: Scalars['ObjectId']['input'];
  concept?: InputMaybe<Scalars['String']['input']>;
  date: Scalars['Date']['input'];
  turnId: Scalars['ObjectId']['input'];
  type?: InputMaybe<TurnMovementTypeEnum>;
};

export type CreateWarehouseInput = {
  address: Scalars['String']['input'];
  description: Scalars['String']['input'];
  name: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  addressInfo?: Maybe<Address>;
  addressesIds: Array<Scalars['ObjectId']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ObjectId']['output'];
  lastName: Scalars['String']['output'];
  lastOrderDate?: Maybe<Scalars['Date']['output']>;
  name: Scalars['String']['output'];
  ordersIds: Array<Scalars['ObjectId']['output']>;
  phone: Scalars['String']['output'];
};

export type CustomerResponse = ResponseBase & {
  __typename?: 'CustomerResponse';
  data?: Maybe<Customer>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export enum DeliveryMethodEnum {
  DELIVERY = 'DELIVERY',
  PICKUP = 'PICKUP'
}

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
  rejectOrder?: Maybe<OrderResponse>;
  updateBranch?: Maybe<BranchResponse>;
  updateBranchProduct?: Maybe<BranchProductResponse>;
  updateCategory?: Maybe<CategoryResponse>;
  updateConfiguration?: Maybe<ConfigurationResponse>;
  updateProduct?: Maybe<ProductResponse>;
  updateUser?: Maybe<UserResponse>;
  updateWarehouse?: Maybe<WarehouseResponse>;
};


export type MutationAcceptOrderArgs = {
  orderId: Scalars['ObjectId']['input'];
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
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteBranchProductArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteCategoryArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteWarehouseArgs = {
  id: Scalars['ObjectId']['input'];
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


export type MutationRejectOrderArgs = {
  orderId: Scalars['ObjectId']['input'];
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
  deleteInput?: InputMaybe<Scalars['Boolean']['input']>;
  updateUserInput: UpdateUserInput;
};


export type MutationUpdateWarehouseArgs = {
  updateWarehouseInput: UpdateWarehouseInput;
};

export type OpenTurnInfo = {
  __typename?: 'OpenTurnInfo';
  amount: Scalars['Float']['output'];
  date: Scalars['Date']['output'];
  difference: Scalars['Float']['output'];
  observation?: Maybe<Scalars['String']['output']>;
  openBy?: Maybe<Scalars['ObjectId']['output']>;
  openByInfo?: Maybe<User>;
  physicialAmount: Scalars['Float']['output'];
};

export type Order = {
  __typename?: 'Order';
  addressId?: Maybe<Scalars['ObjectId']['output']>;
  addressInfo?: Maybe<Address>;
  branchId: Scalars['ObjectId']['output'];
  code: Scalars['String']['output'];
  customerId: Scalars['ObjectId']['output'];
  customerInfo?: Maybe<Customer>;
  date: Scalars['Date']['output'];
  deliveryMethod: DeliveryMethodEnum;
  discount: Scalars['Float']['output'];
  id: Scalars['ObjectId']['output'];
  isSold: Scalars['Boolean']['output'];
  orderAcepted?: Maybe<Scalars['Boolean']['output']>;
  orderAceptedAt?: Maybe<Scalars['Date']['output']>;
  orderAceptedBy?: Maybe<Scalars['ObjectId']['output']>;
  orderAceptedByInfo?: Maybe<User>;
  orderDetails?: Maybe<Scalars['String']['output']>;
  paymentMethod: PaymentMethodEnum;
  pickUpInformation?: Maybe<Scalars['String']['output']>;
  products: Array<SaleItem>;
  reason?: Maybe<Scalars['String']['output']>;
  rejected?: Maybe<Scalars['Boolean']['output']>;
  rejectedAt?: Maybe<Scalars['Date']['output']>;
  rejectedBy?: Maybe<Scalars['ObjectId']['output']>;
  rejectedByInfo?: Maybe<User>;
  saleId?: Maybe<Scalars['ObjectId']['output']>;
  subTotal: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type OrderPaginationInput = {
  branchId?: InputMaybe<Scalars['ObjectId']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  orderesAcepted?: InputMaybe<Scalars['Boolean']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  rows?: InputMaybe<Scalars['Int']['input']>;
};

export type OrderResponse = ResponseBase & {
  __typename?: 'OrderResponse';
  data?: Maybe<Order>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type OrdersResponse = ResponseBase & {
  __typename?: 'OrdersResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Order>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type PaginationInput = {
  filter?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  rows?: InputMaybe<Scalars['Int']['input']>;
};

export enum PaymentMethodEnum {
  CARD = 'CARD',
  CASH = 'CASH',
  QR_TRANSFER = 'QR_TRANSFER'
}

export type Product = {
  __typename?: 'Product';
  category?: Maybe<Category>;
  categoryId?: Maybe<Scalars['ObjectId']['output']>;
  code: Scalars['String']['output'];
  cost?: Maybe<Scalars['Float']['output']>;
  description: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  image?: Maybe<Scalars['String']['output']>;
  internalCode?: Maybe<Scalars['String']['output']>;
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
  id: Scalars['ObjectId']['input'];
};


export type QueryGetBranchProductByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetBranchProductsPaginatedArgs = {
  branchId: Scalars['ObjectId']['input'];
  paginationInput: PaginationInput;
};


export type QueryGetBranchesPaginatedArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetCashByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetCashTurnMovementsArgs = {
  paginationInput: PaginationInput;
  turnId: Scalars['ObjectId']['input'];
};


export type QueryGetCategoriesArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetOrderByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetOrdersPaginatedArgs = {
  orderPaginationInput: OrderPaginationInput;
};


export type QueryGetProductByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetProductStockArgs = {
  paginationInput: PaginationInput;
  productId: Scalars['ObjectId']['input'];
  warehouseId?: InputMaybe<Scalars['ObjectId']['input']>;
};


export type QueryGetProductsArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetProductsOutOfWarehouseArgs = {
  paginationInput: PaginationInput;
  warehouseId: Scalars['ObjectId']['input'];
};


export type QueryGetPublicCustomerByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetPublicProductsArgs = {
  branchId: Scalars['ObjectId']['input'];
  paginationInput: PaginationInput;
};


export type QueryGetRolesArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetSaleByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetSalesPaginatedArgs = {
  salesPaginationInput: SalesPaginationInput;
};


export type QueryGetSalesSummaryArgs = {
  salesSummaryInput: SalesSummaryInput;
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
  warehouseStockPaginationInput: WarehouseStockPaginationInput;
};


export type QueryGetWarehousesArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetWarehousesOfProductArgs = {
  paginationInput: PaginationInput;
  productId: Scalars['ObjectId']['input'];
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
  type: RoleTypeEnum;
};

export enum RoleTypeEnum {
  ADMINISTRATOR = 'ADMINISTRATOR',
  SALESMAN = 'SALESMAN'
}

export type RolesResponse = ResponseBase & {
  __typename?: 'RolesResponse';
  data?: Maybe<Array<Maybe<Role>>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type Sale = {
  __typename?: 'Sale';
  amountRecibed: Scalars['Float']['output'];
  branch?: Maybe<Branch>;
  branchId: Scalars['ObjectId']['output'];
  canceled?: Maybe<Scalars['Boolean']['output']>;
  canceledAt?: Maybe<Scalars['Date']['output']>;
  canceledBy?: Maybe<Scalars['ObjectId']['output']>;
  canceledByInfo?: Maybe<User>;
  change: Scalars['Float']['output'];
  client?: Maybe<Scalars['String']['output']>;
  code: Scalars['String']['output'];
  createdBy?: Maybe<Scalars['ObjectId']['output']>;
  createdByInfo?: Maybe<User>;
  date: Scalars['Date']['output'];
  discount: Scalars['Float']['output'];
  id: Scalars['ObjectId']['output'];
  observations?: Maybe<Scalars['String']['output']>;
  orderId?: Maybe<Scalars['ObjectId']['output']>;
  paymentMethod: PaymentMethodEnum;
  products: Array<SaleItem>;
  reason?: Maybe<Scalars['String']['output']>;
  subTotal: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
};

export type SaleItem = {
  __typename?: 'SaleItem';
  branchProductId: Scalars['ObjectId']['output'];
  price: Scalars['Float']['output'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId']['output'];
  qty: Scalars['Int']['output'];
  total: Scalars['Float']['output'];
};

export type SaleItemInput = {
  branchProductId: Scalars['ObjectId']['input'];
  price: Scalars['Float']['input'];
  productId: Scalars['ObjectId']['input'];
  qty: Scalars['Int']['input'];
  total: Scalars['Float']['input'];
};

export type SaleResponse = ResponseBase & {
  __typename?: 'SaleResponse';
  data?: Maybe<Sale>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type SalesByPaymentMethodSummary = {
  __typename?: 'SalesByPaymentMethodSummary';
  method?: Maybe<PaymentMethodEnum>;
  total: Scalars['Float']['output'];
};

export type SalesPaginationInput = {
  branchIds: Array<Scalars['ObjectId']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  initialDate?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  rows?: InputMaybe<Scalars['Int']['input']>;
  saleBy?: InputMaybe<Scalars['ObjectId']['input']>;
};

export type SalesResponse = ResponseBase & {
  __typename?: 'SalesResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Sale>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type SalesSummary = {
  __typename?: 'SalesSummary';
  paymentMethods: Array<SalesByPaymentMethodSummary>;
  total: Scalars['Float']['output'];
};

export type SalesSummaryInput = {
  branchIds: Array<Scalars['ObjectId']['input']>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  initialDate?: InputMaybe<Scalars['Date']['input']>;
  saleBy?: InputMaybe<Scalars['ObjectId']['input']>;
};

export type SalesSummaryResponse = ResponseBase & {
  __typename?: 'SalesSummaryResponse';
  data?: Maybe<SalesSummary>;
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

export type Turn = {
  __typename?: 'Turn';
  amountOfMovents: Scalars['Int']['output'];
  cashId: Scalars['ObjectId']['output'];
  closeInfo?: Maybe<CloseTurnInfo>;
  id: Scalars['ObjectId']['output'];
  isOpen: Scalars['Boolean']['output'];
  openInfo: OpenTurnInfo;
};

export enum TurnMovementTypeEnum {
  ADD = 'ADD',
  ADJUST = 'ADJUST',
  WITHDRAW = 'WITHDRAW'
}

export type TurnMovements = {
  __typename?: 'TurnMovements';
  amount: Scalars['Float']['output'];
  cashId: Scalars['ObjectId']['output'];
  concept?: Maybe<Scalars['String']['output']>;
  createdBy?: Maybe<Scalars['ObjectId']['output']>;
  createdByInfo?: Maybe<User>;
  date: Scalars['Date']['output'];
  id: Scalars['ObjectId']['output'];
  turnId: Scalars['ObjectId']['output'];
  type?: Maybe<TurnMovementTypeEnum>;
};

export type UpdateBranchInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  direction?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  nit?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  visibleOnWeb?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateBranchProductInput = {
  id: Scalars['ObjectId']['input'];
  isVisibleOnMenu?: InputMaybe<Scalars['Boolean']['input']>;
  isVisibleOnWeb?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateCategoryInput = {
  id: Scalars['ObjectId']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
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
  categoryId?: InputMaybe<Scalars['ObjectId']['input']>;
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
  ResponseBase: ( AddressResponse ) | ( BranchProductResponse ) | ( BranchProductsResponse ) | ( BranchResponse ) | ( BranchsResponse ) | ( CashResponse ) | ( CashTurnMovementResponse ) | ( CashTurnMovementsResponse ) | ( CategoriesResponse ) | ( CategoryResponse ) | ( ConfigurationResponse ) | ( CustomerResponse ) | ( LoginResponse ) | ( OrderResponse ) | ( OrdersResponse ) | ( ProductResponse ) | ( ProductsResponse ) | ( Response ) | ( RolesResponse ) | ( SaleResponse ) | ( SalesResponse ) | ( SalesSummaryResponse ) | ( StockResponse ) | ( StocksHistoryResponse ) | ( StocksResponse ) | ( UserResponse ) | ( UsersResponse ) | ( WarehouseResponse ) | ( WarehousesResponse );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  AddressResponse: ResolverTypeWrapper<AddressResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Branch: ResolverTypeWrapper<Branch>;
  BranchProduct: ResolverTypeWrapper<BranchProduct>;
  BranchProductResponse: ResolverTypeWrapper<BranchProductResponse>;
  BranchProductsResponse: ResolverTypeWrapper<BranchProductsResponse>;
  BranchResponse: ResolverTypeWrapper<BranchResponse>;
  BranchsResponse: ResolverTypeWrapper<BranchsResponse>;
  CancelSaleInput: CancelSaleInput;
  Cash: ResolverTypeWrapper<Cash>;
  CashResponse: ResolverTypeWrapper<CashResponse>;
  CashTurnMovementResponse: ResolverTypeWrapper<CashTurnMovementResponse>;
  CashTurnMovementsResponse: ResolverTypeWrapper<CashTurnMovementsResponse>;
  CategoriesResponse: ResolverTypeWrapper<CategoriesResponse>;
  Category: ResolverTypeWrapper<Category>;
  CategoryResponse: ResolverTypeWrapper<CategoryResponse>;
  CloseTurnInfo: ResolverTypeWrapper<CloseTurnInfo>;
  CloseTurnInput: CloseTurnInput;
  Configuration: ResolverTypeWrapper<Configuration>;
  ConfigurationResponse: ResolverTypeWrapper<ConfigurationResponse>;
  CreateAddressInput: CreateAddressInput;
  CreateBranchInput: CreateBranchInput;
  CreateBranchProductInput: CreateBranchProductInput;
  CreateBranchProductStockMovementInput: CreateBranchProductStockMovementInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateCustomerInput: CreateCustomerInput;
  CreateOrderInput: CreateOrderInput;
  CreateProductInput: CreateProductInput;
  CreateSaleInput: CreateSaleInput;
  CreateStockInput: CreateStockInput;
  CreateStockMovementInput: CreateStockMovementInput;
  CreateTurnInput: CreateTurnInput;
  CreateTurnMovementInput: CreateTurnMovementInput;
  CreateWarehouseInput: CreateWarehouseInput;
  Customer: ResolverTypeWrapper<Customer>;
  CustomerResponse: ResolverTypeWrapper<CustomerResponse>;
  Date: ResolverTypeWrapper<Scalars['Date']['output']>;
  DeliveryMethodEnum: DeliveryMethodEnum;
  ErrorInput: ResolverTypeWrapper<ErrorInput>;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  LoginInput: LoginInput;
  LoginResponse: ResolverTypeWrapper<LoginResponse>;
  MeasurementUnits: ResolverTypeWrapper<MeasurementUnits>;
  Mutation: ResolverTypeWrapper<{}>;
  ObjectId: ResolverTypeWrapper<Scalars['ObjectId']['output']>;
  OpenTurnInfo: ResolverTypeWrapper<OpenTurnInfo>;
  Order: ResolverTypeWrapper<Order>;
  OrderPaginationInput: OrderPaginationInput;
  OrderResponse: ResolverTypeWrapper<OrderResponse>;
  OrdersResponse: ResolverTypeWrapper<OrdersResponse>;
  PaginationInput: PaginationInput;
  PaymentMethodEnum: PaymentMethodEnum;
  Product: ResolverTypeWrapper<Product>;
  ProductResponse: ResolverTypeWrapper<ProductResponse>;
  ProductsResponse: ResolverTypeWrapper<ProductsResponse>;
  Query: ResolverTypeWrapper<{}>;
  Response: ResolverTypeWrapper<Response>;
  ResponseBase: ResolverTypeWrapper<ResolversInterfaceTypes<ResolversTypes>['ResponseBase']>;
  Role: ResolverTypeWrapper<Role>;
  RoleTypeEnum: RoleTypeEnum;
  RolesResponse: ResolverTypeWrapper<RolesResponse>;
  Sale: ResolverTypeWrapper<Sale>;
  SaleItem: ResolverTypeWrapper<SaleItem>;
  SaleItemInput: SaleItemInput;
  SaleResponse: ResolverTypeWrapper<SaleResponse>;
  SalesByPaymentMethodSummary: ResolverTypeWrapper<SalesByPaymentMethodSummary>;
  SalesPaginationInput: SalesPaginationInput;
  SalesResponse: ResolverTypeWrapper<SalesResponse>;
  SalesSummary: ResolverTypeWrapper<SalesSummary>;
  SalesSummaryInput: SalesSummaryInput;
  SalesSummaryResponse: ResolverTypeWrapper<SalesSummaryResponse>;
  StatusEnum: StatusEnum;
  Stock: ResolverTypeWrapper<Stock>;
  StockHistory: ResolverTypeWrapper<StockHistory>;
  StockMovementTypeEnum: StockMovementTypeEnum;
  StockResponse: ResolverTypeWrapper<StockResponse>;
  StocksHistoryResponse: ResolverTypeWrapper<StocksHistoryResponse>;
  StocksResponse: ResolverTypeWrapper<StocksResponse>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  Turn: ResolverTypeWrapper<Turn>;
  TurnMovementTypeEnum: TurnMovementTypeEnum;
  TurnMovements: ResolverTypeWrapper<TurnMovements>;
  UpdateBranchInput: UpdateBranchInput;
  UpdateBranchProductInput: UpdateBranchProductInput;
  UpdateCategoryInput: UpdateCategoryInput;
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
  WarehouseResponse: ResolverTypeWrapper<WarehouseResponse>;
  WarehouseStockPaginationInput: WarehouseStockPaginationInput;
  WarehousesResponse: ResolverTypeWrapper<WarehousesResponse>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Address: Address;
  AddressResponse: AddressResponse;
  Boolean: Scalars['Boolean']['output'];
  Branch: Branch;
  BranchProduct: BranchProduct;
  BranchProductResponse: BranchProductResponse;
  BranchProductsResponse: BranchProductsResponse;
  BranchResponse: BranchResponse;
  BranchsResponse: BranchsResponse;
  CancelSaleInput: CancelSaleInput;
  Cash: Cash;
  CashResponse: CashResponse;
  CashTurnMovementResponse: CashTurnMovementResponse;
  CashTurnMovementsResponse: CashTurnMovementsResponse;
  CategoriesResponse: CategoriesResponse;
  Category: Category;
  CategoryResponse: CategoryResponse;
  CloseTurnInfo: CloseTurnInfo;
  CloseTurnInput: CloseTurnInput;
  Configuration: Configuration;
  ConfigurationResponse: ConfigurationResponse;
  CreateAddressInput: CreateAddressInput;
  CreateBranchInput: CreateBranchInput;
  CreateBranchProductInput: CreateBranchProductInput;
  CreateBranchProductStockMovementInput: CreateBranchProductStockMovementInput;
  CreateCategoryInput: CreateCategoryInput;
  CreateCustomerInput: CreateCustomerInput;
  CreateOrderInput: CreateOrderInput;
  CreateProductInput: CreateProductInput;
  CreateSaleInput: CreateSaleInput;
  CreateStockInput: CreateStockInput;
  CreateStockMovementInput: CreateStockMovementInput;
  CreateTurnInput: CreateTurnInput;
  CreateTurnMovementInput: CreateTurnMovementInput;
  CreateWarehouseInput: CreateWarehouseInput;
  Customer: Customer;
  CustomerResponse: CustomerResponse;
  Date: Scalars['Date']['output'];
  ErrorInput: ErrorInput;
  Float: Scalars['Float']['output'];
  Int: Scalars['Int']['output'];
  LoginInput: LoginInput;
  LoginResponse: LoginResponse;
  MeasurementUnits: MeasurementUnits;
  Mutation: {};
  ObjectId: Scalars['ObjectId']['output'];
  OpenTurnInfo: OpenTurnInfo;
  Order: Order;
  OrderPaginationInput: OrderPaginationInput;
  OrderResponse: OrderResponse;
  OrdersResponse: OrdersResponse;
  PaginationInput: PaginationInput;
  Product: Product;
  ProductResponse: ProductResponse;
  ProductsResponse: ProductsResponse;
  Query: {};
  Response: Response;
  ResponseBase: ResolversInterfaceTypes<ResolversParentTypes>['ResponseBase'];
  Role: Role;
  RolesResponse: RolesResponse;
  Sale: Sale;
  SaleItem: SaleItem;
  SaleItemInput: SaleItemInput;
  SaleResponse: SaleResponse;
  SalesByPaymentMethodSummary: SalesByPaymentMethodSummary;
  SalesPaginationInput: SalesPaginationInput;
  SalesResponse: SalesResponse;
  SalesSummary: SalesSummary;
  SalesSummaryInput: SalesSummaryInput;
  SalesSummaryResponse: SalesSummaryResponse;
  Stock: Stock;
  StockHistory: StockHistory;
  StockResponse: StockResponse;
  StocksHistoryResponse: StocksHistoryResponse;
  StocksResponse: StocksResponse;
  String: Scalars['String']['output'];
  Time: Scalars['Time']['output'];
  Turn: Turn;
  TurnMovements: TurnMovements;
  UpdateBranchInput: UpdateBranchInput;
  UpdateBranchProductInput: UpdateBranchProductInput;
  UpdateCategoryInput: UpdateCategoryInput;
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
  WarehouseResponse: WarehouseResponse;
  WarehouseStockPaginationInput: WarehouseStockPaginationInput;
  WarehousesResponse: WarehousesResponse;
};

export type AddressResolvers<ContextType = any, ParentType extends ResolversParentTypes['Address'] = ResolversParentTypes['Address']> = {
  customerId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  customerInfo?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  detail?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AddressResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['AddressResponse'] = ResolversParentTypes['AddressResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchResolvers<ContextType = any, ParentType extends ResolversParentTypes['Branch'] = ResolversParentTypes['Branch']> = {
  cash?: Resolver<Maybe<ResolversTypes['Cash']>, ParentType, ContextType>;
  cashId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  city?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  direction?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visibleOnWeb?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchProduct'] = ResolversParentTypes['BranchProduct']> = {
  branch?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType>;
  branchId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  isVisibleOnMenu?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isVisibleOnWeb?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchProductResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchProductResponse'] = ResolversParentTypes['BranchProductResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['BranchProduct']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchProductsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchProductsResponse'] = ResolversParentTypes['BranchProductsResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['BranchProduct']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchResponse'] = ResolversParentTypes['BranchResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchsResponse'] = ResolversParentTypes['BranchsResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['Branch']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CashResolvers<ContextType = any, ParentType extends ResolversParentTypes['Cash'] = ResolversParentTypes['Cash']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  branchId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  currentTurn?: Resolver<Maybe<ResolversTypes['Turn']>, ParentType, ContextType>;
  currentTurnId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  isOpen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CashResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CashResponse'] = ResolversParentTypes['CashResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Cash']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CashTurnMovementResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CashTurnMovementResponse'] = ResolversParentTypes['CashTurnMovementResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['TurnMovements']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CashTurnMovementsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CashTurnMovementsResponse'] = ResolversParentTypes['CashTurnMovementsResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['TurnMovements']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoriesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoriesResponse'] = ResolversParentTypes['CategoriesResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['Category']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Category'] = ResolversParentTypes['Category']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CategoryResponse'] = ResolversParentTypes['CategoryResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CloseTurnInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['CloseTurnInfo'] = ResolversParentTypes['CloseTurnInfo']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  closeBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  closeByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  difference?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  observation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  physicialAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type CustomerResolvers<ContextType = any, ParentType extends ResolversParentTypes['Customer'] = ResolversParentTypes['Customer']> = {
  addressInfo?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  addressesIds?: Resolver<Array<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastOrderDate?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  ordersIds?: Resolver<Array<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CustomerResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['CustomerResponse'] = ResolversParentTypes['CustomerResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
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
  acceptOrder?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<MutationAcceptOrderArgs, 'orderId'>>;
  cancelSale?: Resolver<Maybe<ResolversTypes['SaleResponse']>, ParentType, ContextType, RequireFields<MutationCancelSaleArgs, 'cancelSaleInput'>>;
  closeCash?: Resolver<Maybe<ResolversTypes['CashResponse']>, ParentType, ContextType, RequireFields<MutationCloseCashArgs, 'closeTurnInput'>>;
  creatStockMovement?: Resolver<Maybe<ResolversTypes['StockResponse']>, ParentType, ContextType, RequireFields<MutationCreatStockMovementArgs, 'createStockMovementInput'>>;
  createBranch?: Resolver<Maybe<ResolversTypes['BranchResponse']>, ParentType, ContextType, RequireFields<MutationCreateBranchArgs, 'createBranchInput'>>;
  createBranchProduct?: Resolver<Maybe<ResolversTypes['BranchProductResponse']>, ParentType, ContextType, RequireFields<MutationCreateBranchProductArgs, 'createBranchProductInput'>>;
  createBranchProductStockMovement?: Resolver<Maybe<ResolversTypes['BranchProductResponse']>, ParentType, ContextType, RequireFields<MutationCreateBranchProductStockMovementArgs, 'createBranchProductStockMovementInput'>>;
  createCashMovement?: Resolver<Maybe<ResolversTypes['CashTurnMovementResponse']>, ParentType, ContextType, RequireFields<MutationCreateCashMovementArgs, 'createTurnMovementInput'>>;
  createCategory?: Resolver<Maybe<ResolversTypes['CategoryResponse']>, ParentType, ContextType, RequireFields<MutationCreateCategoryArgs, 'createCategoryInput'>>;
  createProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'createProductInput'>>;
  createSale?: Resolver<Maybe<ResolversTypes['SaleResponse']>, ParentType, ContextType, RequireFields<MutationCreateSaleArgs, 'createSaleInput'>>;
  createStock?: Resolver<Maybe<ResolversTypes['StockResponse']>, ParentType, ContextType, RequireFields<MutationCreateStockArgs, 'createStockInput'>>;
  createUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  createWarehouse?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<MutationCreateWarehouseArgs, 'createWarehouseInput'>>;
  deleteBranch?: Resolver<Maybe<ResolversTypes['BranchResponse']>, ParentType, ContextType, RequireFields<MutationDeleteBranchArgs, 'id'>>;
  deleteBranchProduct?: Resolver<Maybe<ResolversTypes['BranchProductResponse']>, ParentType, ContextType, RequireFields<MutationDeleteBranchProductArgs, 'id'>>;
  deleteCategory?: Resolver<Maybe<ResolversTypes['CategoryResponse']>, ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  deleteProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteWarehouse?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<MutationDeleteWarehouseArgs, 'id'>>;
  openCash?: Resolver<Maybe<ResolversTypes['CashResponse']>, ParentType, ContextType, RequireFields<MutationOpenCashArgs, 'createTurnInput'>>;
  publicCreateAddress?: Resolver<Maybe<ResolversTypes['AddressResponse']>, ParentType, ContextType, RequireFields<MutationPublicCreateAddressArgs, 'createAddressInput'>>;
  publicCreateCustomer?: Resolver<Maybe<ResolversTypes['CustomerResponse']>, ParentType, ContextType, RequireFields<MutationPublicCreateCustomerArgs, 'createCustomerInput'>>;
  publicCreateOrder?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<MutationPublicCreateOrderArgs, 'createOrderInput'>>;
  rejectOrder?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<MutationRejectOrderArgs, 'orderId'>>;
  updateBranch?: Resolver<Maybe<ResolversTypes['BranchResponse']>, ParentType, ContextType, RequireFields<MutationUpdateBranchArgs, 'updateBranchInput'>>;
  updateBranchProduct?: Resolver<Maybe<ResolversTypes['BranchProductResponse']>, ParentType, ContextType, RequireFields<MutationUpdateBranchProductArgs, 'updateBranchProductInput'>>;
  updateCategory?: Resolver<Maybe<ResolversTypes['CategoryResponse']>, ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'updateCategoryInput'>>;
  updateConfiguration?: Resolver<Maybe<ResolversTypes['ConfigurationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateConfigurationArgs, 'updateConfigurationInput'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'updateProductInput'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'deleteInput' | 'updateUserInput'>>;
  updateWarehouse?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<MutationUpdateWarehouseArgs, 'updateWarehouseInput'>>;
};

export interface ObjectIdScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['ObjectId'], any> {
  name: 'ObjectId';
}

export type OpenTurnInfoResolvers<ContextType = any, ParentType extends ResolversParentTypes['OpenTurnInfo'] = ResolversParentTypes['OpenTurnInfo']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  difference?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  observation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  openBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  openByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  physicialAmount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResolvers<ContextType = any, ParentType extends ResolversParentTypes['Order'] = ResolversParentTypes['Order']> = {
  addressId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  addressInfo?: Resolver<Maybe<ResolversTypes['Address']>, ParentType, ContextType>;
  branchId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  customerId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  customerInfo?: Resolver<Maybe<ResolversTypes['Customer']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  deliveryMethod?: Resolver<ResolversTypes['DeliveryMethodEnum'], ParentType, ContextType>;
  discount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  isSold?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  orderAcepted?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  orderAceptedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  orderAceptedBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  orderAceptedByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  orderDetails?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentMethod?: Resolver<ResolversTypes['PaymentMethodEnum'], ParentType, ContextType>;
  pickUpInformation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['SaleItem']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rejected?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  rejectedAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  rejectedBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  rejectedByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  saleId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  subTotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrderResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrderResponse'] = ResolversParentTypes['OrderResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Order']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type OrdersResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['OrdersResponse'] = ResolversParentTypes['OrdersResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['Order']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  category?: Resolver<Maybe<ResolversTypes['Category']>, ParentType, ContextType>;
  categoryId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  cost?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  internalCode?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
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
  getBranchById?: Resolver<Maybe<ResolversTypes['BranchResponse']>, ParentType, ContextType, RequireFields<QueryGetBranchByIdArgs, 'id'>>;
  getBranchProductById?: Resolver<Maybe<ResolversTypes['BranchProductResponse']>, ParentType, ContextType, RequireFields<QueryGetBranchProductByIdArgs, 'id'>>;
  getBranchProductsPaginated?: Resolver<Maybe<ResolversTypes['BranchProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetBranchProductsPaginatedArgs, 'branchId' | 'paginationInput'>>;
  getBranchesPaginated?: Resolver<Maybe<ResolversTypes['BranchsResponse']>, ParentType, ContextType, RequireFields<QueryGetBranchesPaginatedArgs, 'paginationInput'>>;
  getCashById?: Resolver<Maybe<ResolversTypes['CashResponse']>, ParentType, ContextType, RequireFields<QueryGetCashByIdArgs, 'id'>>;
  getCashTurnMovements?: Resolver<Maybe<ResolversTypes['CashTurnMovementsResponse']>, ParentType, ContextType, RequireFields<QueryGetCashTurnMovementsArgs, 'paginationInput' | 'turnId'>>;
  getCategories?: Resolver<Maybe<ResolversTypes['CategoriesResponse']>, ParentType, ContextType, RequireFields<QueryGetCategoriesArgs, 'paginationInput'>>;
  getCategoryById?: Resolver<Maybe<ResolversTypes['CategoryResponse']>, ParentType, ContextType, RequireFields<QueryGetCategoryByIdArgs, 'id'>>;
  getConfiguration?: Resolver<Maybe<ResolversTypes['ConfigurationResponse']>, ParentType, ContextType>;
  getOrderById?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<QueryGetOrderByIdArgs, 'id'>>;
  getOrdersPaginated?: Resolver<Maybe<ResolversTypes['OrdersResponse']>, ParentType, ContextType, RequireFields<QueryGetOrdersPaginatedArgs, 'orderPaginationInput'>>;
  getProductById?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<QueryGetProductByIdArgs, 'id'>>;
  getProductStock?: Resolver<Maybe<ResolversTypes['StocksResponse']>, ParentType, ContextType, RequireFields<QueryGetProductStockArgs, 'paginationInput' | 'productId'>>;
  getProducts?: Resolver<Maybe<ResolversTypes['ProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetProductsArgs, 'paginationInput'>>;
  getProductsOutOfWarehouse?: Resolver<Maybe<ResolversTypes['ProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetProductsOutOfWarehouseArgs, 'paginationInput' | 'warehouseId'>>;
  getPublicCustomerById?: Resolver<Maybe<ResolversTypes['CustomerResponse']>, ParentType, ContextType, RequireFields<QueryGetPublicCustomerByIdArgs, 'id'>>;
  getPublicProducts?: Resolver<Maybe<ResolversTypes['BranchProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetPublicProductsArgs, 'branchId' | 'paginationInput'>>;
  getRoles?: Resolver<Maybe<ResolversTypes['RolesResponse']>, ParentType, ContextType, RequireFields<QueryGetRolesArgs, 'paginationInput'>>;
  getSaleById?: Resolver<Maybe<ResolversTypes['SaleResponse']>, ParentType, ContextType, RequireFields<QueryGetSaleByIdArgs, 'id'>>;
  getSalesPaginated?: Resolver<Maybe<ResolversTypes['SalesResponse']>, ParentType, ContextType, RequireFields<QueryGetSalesPaginatedArgs, 'salesPaginationInput'>>;
  getSalesSummary?: Resolver<Maybe<ResolversTypes['SalesSummaryResponse']>, ParentType, ContextType, RequireFields<QueryGetSalesSummaryArgs, 'salesSummaryInput'>>;
  getStockById?: Resolver<Maybe<ResolversTypes['StockResponse']>, ParentType, ContextType, RequireFields<QueryGetStockByIdArgs, 'id'>>;
  getStockHistory?: Resolver<Maybe<ResolversTypes['StocksHistoryResponse']>, ParentType, ContextType, RequireFields<QueryGetStockHistoryArgs, 'paginationInput' | 'stockId'>>;
  getStocksPaginated?: Resolver<Maybe<ResolversTypes['StocksResponse']>, ParentType, ContextType, RequireFields<QueryGetStocksPaginatedArgs, 'paginationInput'>>;
  getUserById?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<QueryGetUserByIdArgs, 'id'>>;
  getUsers?: Resolver<Maybe<ResolversTypes['UsersResponse']>, ParentType, ContextType, RequireFields<QueryGetUsersArgs, 'paginationInput'>>;
  getWarehouseById?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<QueryGetWarehouseByIdArgs, 'id'>>;
  getWarehouseHistory?: Resolver<Maybe<ResolversTypes['StocksHistoryResponse']>, ParentType, ContextType, RequireFields<QueryGetWarehouseHistoryArgs, 'paginationInput' | 'warehouseId'>>;
  getWarehouseStock?: Resolver<Maybe<ResolversTypes['StocksResponse']>, ParentType, ContextType, RequireFields<QueryGetWarehouseStockArgs, 'warehouseStockPaginationInput'>>;
  getWarehouses?: Resolver<Maybe<ResolversTypes['WarehousesResponse']>, ParentType, ContextType, RequireFields<QueryGetWarehousesArgs, 'paginationInput'>>;
  getWarehousesOfProduct?: Resolver<Maybe<ResolversTypes['WarehousesResponse']>, ParentType, ContextType, RequireFields<QueryGetWarehousesOfProductArgs, 'paginationInput' | 'productId'>>;
  login?: Resolver<Maybe<ResolversTypes['LoginResponse']>, ParentType, ContextType, RequireFields<QueryLoginArgs, 'loginInput'>>;
};

export type ResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['Response'] = ResolversParentTypes['Response']> = {
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ResponseBaseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ResponseBase'] = ResolversParentTypes['ResponseBase']> = {
  __resolveType: TypeResolveFn<'AddressResponse' | 'BranchProductResponse' | 'BranchProductsResponse' | 'BranchResponse' | 'BranchsResponse' | 'CashResponse' | 'CashTurnMovementResponse' | 'CashTurnMovementsResponse' | 'CategoriesResponse' | 'CategoryResponse' | 'ConfigurationResponse' | 'CustomerResponse' | 'LoginResponse' | 'OrderResponse' | 'OrdersResponse' | 'ProductResponse' | 'ProductsResponse' | 'Response' | 'RolesResponse' | 'SaleResponse' | 'SalesResponse' | 'SalesSummaryResponse' | 'StockResponse' | 'StocksHistoryResponse' | 'StocksResponse' | 'UserResponse' | 'UsersResponse' | 'WarehouseResponse' | 'WarehousesResponse', ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
};

export type RoleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Role'] = ResolversParentTypes['Role']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  status?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['RoleTypeEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type RolesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['RolesResponse'] = ResolversParentTypes['RolesResponse']> = {
  data?: Resolver<Maybe<Array<Maybe<ResolversTypes['Role']>>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Sale'] = ResolversParentTypes['Sale']> = {
  amountRecibed?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  branch?: Resolver<Maybe<ResolversTypes['Branch']>, ParentType, ContextType>;
  branchId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  canceled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canceledAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  canceledBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  canceledByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  change?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  client?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  createdByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  discount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  observations?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  orderId?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  paymentMethod?: Resolver<ResolversTypes['PaymentMethodEnum'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['SaleItem']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subTotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleItem'] = ResolversParentTypes['SaleItem']> = {
  branchProductId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  qty?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SaleResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SaleResponse'] = ResolversParentTypes['SaleResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Sale']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SalesByPaymentMethodSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['SalesByPaymentMethodSummary'] = ResolversParentTypes['SalesByPaymentMethodSummary']> = {
  method?: Resolver<Maybe<ResolversTypes['PaymentMethodEnum']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SalesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SalesResponse'] = ResolversParentTypes['SalesResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['Sale']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SalesSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['SalesSummary'] = ResolversParentTypes['SalesSummary']> = {
  paymentMethods?: Resolver<Array<ResolversTypes['SalesByPaymentMethodSummary']>, ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SalesSummaryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['SalesSummaryResponse'] = ResolversParentTypes['SalesSummaryResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['SalesSummary']>, ParentType, ContextType>;
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

export type TurnResolvers<ContextType = any, ParentType extends ResolversParentTypes['Turn'] = ResolversParentTypes['Turn']> = {
  amountOfMovents?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  cashId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  closeInfo?: Resolver<Maybe<ResolversTypes['CloseTurnInfo']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  isOpen?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  openInfo?: Resolver<ResolversTypes['OpenTurnInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TurnMovementsResolvers<ContextType = any, ParentType extends ResolversParentTypes['TurnMovements'] = ResolversParentTypes['TurnMovements']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  cashId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  concept?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  createdByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  turnId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  type?: Resolver<Maybe<ResolversTypes['TurnMovementTypeEnum']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  Address?: AddressResolvers<ContextType>;
  AddressResponse?: AddressResponseResolvers<ContextType>;
  Branch?: BranchResolvers<ContextType>;
  BranchProduct?: BranchProductResolvers<ContextType>;
  BranchProductResponse?: BranchProductResponseResolvers<ContextType>;
  BranchProductsResponse?: BranchProductsResponseResolvers<ContextType>;
  BranchResponse?: BranchResponseResolvers<ContextType>;
  BranchsResponse?: BranchsResponseResolvers<ContextType>;
  Cash?: CashResolvers<ContextType>;
  CashResponse?: CashResponseResolvers<ContextType>;
  CashTurnMovementResponse?: CashTurnMovementResponseResolvers<ContextType>;
  CashTurnMovementsResponse?: CashTurnMovementsResponseResolvers<ContextType>;
  CategoriesResponse?: CategoriesResponseResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  CategoryResponse?: CategoryResponseResolvers<ContextType>;
  CloseTurnInfo?: CloseTurnInfoResolvers<ContextType>;
  Configuration?: ConfigurationResolvers<ContextType>;
  ConfigurationResponse?: ConfigurationResponseResolvers<ContextType>;
  Customer?: CustomerResolvers<ContextType>;
  CustomerResponse?: CustomerResponseResolvers<ContextType>;
  Date?: GraphQLScalarType;
  ErrorInput?: ErrorInputResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  MeasurementUnits?: MeasurementUnitsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  OpenTurnInfo?: OpenTurnInfoResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderResponse?: OrderResponseResolvers<ContextType>;
  OrdersResponse?: OrdersResponseResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductResponse?: ProductResponseResolvers<ContextType>;
  ProductsResponse?: ProductsResponseResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Response?: ResponseResolvers<ContextType>;
  ResponseBase?: ResponseBaseResolvers<ContextType>;
  Role?: RoleResolvers<ContextType>;
  RolesResponse?: RolesResponseResolvers<ContextType>;
  Sale?: SaleResolvers<ContextType>;
  SaleItem?: SaleItemResolvers<ContextType>;
  SaleResponse?: SaleResponseResolvers<ContextType>;
  SalesByPaymentMethodSummary?: SalesByPaymentMethodSummaryResolvers<ContextType>;
  SalesResponse?: SalesResponseResolvers<ContextType>;
  SalesSummary?: SalesSummaryResolvers<ContextType>;
  SalesSummaryResponse?: SalesSummaryResponseResolvers<ContextType>;
  Stock?: StockResolvers<ContextType>;
  StockHistory?: StockHistoryResolvers<ContextType>;
  StockResponse?: StockResponseResolvers<ContextType>;
  StocksHistoryResponse?: StocksHistoryResponseResolvers<ContextType>;
  StocksResponse?: StocksResponseResolvers<ContextType>;
  Time?: GraphQLScalarType;
  Turn?: TurnResolvers<ContextType>;
  TurnMovements?: TurnMovementsResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UsersResponse?: UsersResponseResolvers<ContextType>;
  Warehouse?: WarehouseResolvers<ContextType>;
  WarehouseResponse?: WarehouseResponseResolvers<ContextType>;
  WarehousesResponse?: WarehousesResponseResolvers<ContextType>;
};

