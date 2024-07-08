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
  Upload: { input: any; output: any; }
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
  lastStockEntry?: Maybe<Scalars['Float']['output']>;
  price: Scalars['Float']['output'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId']['output'];
  stock: Scalars['Float']['output'];
};

export type BranchProductCategorized = {
  __typename?: 'BranchProductCategorized';
  code: Scalars['String']['output'];
  id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
  products?: Maybe<Array<BranchProduct>>;
};

export type BranchProductResponse = ResponseBase & {
  __typename?: 'BranchProductResponse';
  data?: Maybe<BranchProduct>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type BranchProductStockResponse = ResponseBase & {
  __typename?: 'BranchProductStockResponse';
  data?: Maybe<Scalars['Int']['output']>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type BranchProductsCategorizedResponse = ResponseBase & {
  __typename?: 'BranchProductsCategorizedResponse';
  data?: Maybe<Array<BranchProductCategorized>>;
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

export type BranchSales = {
  __typename?: 'BranchSales';
  id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
  total: Scalars['Float']['output'];
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

export type BusinessBalance = {
  __typename?: 'BusinessBalance';
  balance: Scalars['Float']['output'];
  result: Scalars['Float']['output'];
  salesByBranch: Array<BranchSales>;
  totalEarnings: Scalars['Float']['output'];
  totalExpenses: Scalars['Float']['output'];
  totalPaid: Scalars['Float']['output'];
};

export type BusinessBalanceResponse = ResponseBase & {
  __typename?: 'BusinessBalanceResponse';
  data?: Maybe<BusinessBalance>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type CancelSaleInput = {
  cashBack: Scalars['Boolean']['input'];
  id: Scalars['ObjectId']['input'];
  reason: Scalars['String']['input'];
  stockReturn: Scalars['Boolean']['input'];
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

export type CreateComboInput = {
  categoryId?: InputMaybe<Scalars['ObjectId']['input']>;
  code: Scalars['String']['input'];
  cost?: InputMaybe<Scalars['Float']['input']>;
  description: Scalars['String']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  subProducts: Array<SubProductInput>;
  suggetedPrice: Scalars['Float']['input'];
};

export type CreateCustomerInput = {
  email?: InputMaybe<Scalars['String']['input']>;
  lastName: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateDistrbutorOwnerInformationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDistributorInput = {
  address: Scalars['String']['input'];
  code: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  nit?: InputMaybe<Scalars['String']['input']>;
  ownerInformation: CreateDistrbutorOwnerInformationInput;
  phone: Scalars['String']['input'];
  socialReason?: InputMaybe<Scalars['String']['input']>;
};

export type CreateDistributorSaleInput = {
  balance: Scalars['Float']['input'];
  date: Scalars['Date']['input'];
  discount: Scalars['Float']['input'];
  distributorId: Scalars['ObjectId']['input'];
  observations?: InputMaybe<Scalars['String']['input']>;
  paymentMethod: DistributorSalePaymentMethod;
  priceListId: Scalars['ObjectId']['input'];
  products: Array<DistributorSaleItemInput>;
  subTotal: Scalars['Float']['input'];
  total: Scalars['Float']['input'];
  totalPaid: Scalars['Float']['input'];
  warehouseId: Scalars['ObjectId']['input'];
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

export type CreatePaymentInput = {
  amount: Scalars['Float']['input'];
  balance: Scalars['Float']['input'];
  date: Scalars['Date']['input'];
  distributorId: Scalars['ObjectId']['input'];
  distributorSaleId: Scalars['ObjectId']['input'];
  observation?: InputMaybe<Scalars['String']['input']>;
  totalPaid: Scalars['Float']['input'];
};

export type CreatePriceInput = {
  price: Scalars['Float']['input'];
  priceListId: Scalars['ObjectId']['input'];
  productId: Scalars['ObjectId']['input'];
};

export type CreatePriceListInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
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
  addressInfo?: Maybe<Array<Address>>;
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

export type Distributor = {
  __typename?: 'Distributor';
  address: Scalars['String']['output'];
  code: Scalars['String']['output'];
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
  nit?: Maybe<Scalars['String']['output']>;
  ownerInformation: DistributorOwnerInformation;
  phone: Scalars['String']['output'];
  socialReason?: Maybe<Scalars['String']['output']>;
};

export type DistributorOwnerInformation = {
  __typename?: 'DistributorOwnerInformation';
  address?: Maybe<Scalars['String']['output']>;
  lastName?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

export type DistributorResponse = ResponseBase & {
  __typename?: 'DistributorResponse';
  data?: Maybe<Distributor>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type DistributorSale = {
  __typename?: 'DistributorSale';
  balance: Scalars['Float']['output'];
  canceled?: Maybe<Scalars['Boolean']['output']>;
  canceledAt?: Maybe<Scalars['Date']['output']>;
  canceledBy?: Maybe<Scalars['ObjectId']['output']>;
  canceledByInfo?: Maybe<User>;
  code: Scalars['String']['output'];
  createdBy?: Maybe<Scalars['ObjectId']['output']>;
  createdByInfo?: Maybe<User>;
  date: Scalars['Date']['output'];
  discount: Scalars['Float']['output'];
  distributor?: Maybe<Distributor>;
  distributorId: Scalars['ObjectId']['output'];
  id: Scalars['ObjectId']['output'];
  observations?: Maybe<Scalars['String']['output']>;
  paymentMethod: DistributorSalePaymentMethod;
  priceList?: Maybe<PriceList>;
  priceListId: Scalars['ObjectId']['output'];
  products: Array<DistributorSaleItem>;
  reason?: Maybe<Scalars['String']['output']>;
  subTotal: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPaid: Scalars['Float']['output'];
  warehouse?: Maybe<Warehouse>;
  warehouseId: Scalars['ObjectId']['output'];
};

export type DistributorSaleItem = {
  __typename?: 'DistributorSaleItem';
  price: Scalars['Float']['output'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId']['output'];
  qty: Scalars['Int']['output'];
  total: Scalars['Float']['output'];
};

export type DistributorSaleItemInput = {
  price: Scalars['Float']['input'];
  productId: Scalars['ObjectId']['input'];
  qty: Scalars['Int']['input'];
  stockId: Scalars['ObjectId']['input'];
  total: Scalars['Float']['input'];
};

export type DistributorSalePaginationInput = {
  distributorsIds?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  initialDate?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  rows?: InputMaybe<Scalars['Int']['input']>;
  saleBy?: InputMaybe<Scalars['ObjectId']['input']>;
};

export enum DistributorSalePaymentMethod {
  CASH = 'CASH',
  CREDIT = 'CREDIT',
  MIXED = 'MIXED'
}

export type DistributorSalePaymentsResponse = ResponseBase & {
  __typename?: 'DistributorSalePaymentsResponse';
  data?: Maybe<Array<Payment>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type DistributorSaleProduct = {
  __typename?: 'DistributorSaleProduct';
  price: Scalars['Float']['output'];
  priceId: Scalars['ObjectId']['output'];
  priceListId: Scalars['ObjectId']['output'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId']['output'];
  stock: Scalars['Float']['output'];
  stockId: Scalars['ObjectId']['output'];
  warehouseId: Scalars['ObjectId']['output'];
};

export type DistributorSaleProductsResponse = ResponseBase & {
  __typename?: 'DistributorSaleProductsResponse';
  data?: Maybe<Array<DistributorSaleProduct>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type DistributorSaleResponse = ResponseBase & {
  __typename?: 'DistributorSaleResponse';
  data?: Maybe<DistributorSale>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type DistributorSalesResponse = ResponseBase & {
  __typename?: 'DistributorSalesResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<DistributorSale>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type DistributorsResponse = ResponseBase & {
  __typename?: 'DistributorsResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Distributor>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type DistributorsSalesSummary = {
  __typename?: 'DistributorsSalesSummary';
  balance: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  totalPaid: Scalars['Float']['output'];
};

export type DistributorsSalesSummaryResponse = ResponseBase & {
  __typename?: 'DistributorsSalesSummaryResponse';
  data?: Maybe<DistributorsSalesSummary>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type ErrorInput = {
  __typename?: 'ErrorInput';
  field?: Maybe<Scalars['String']['output']>;
  message: Scalars['String']['output'];
};

export type FileInput = {
  file: Scalars['Upload']['input'];
  productId: Scalars['ObjectId']['input'];
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
  createCombo?: Maybe<ProductResponse>;
  createDistributor?: Maybe<DistributorResponse>;
  createDistributorSale?: Maybe<DistributorSaleResponse>;
  createPayment?: Maybe<PaymentResponse>;
  createPrice?: Maybe<PriceResponse>;
  createPriceList?: Maybe<PriceListResponse>;
  createProduct?: Maybe<ProductResponse>;
  createSale?: Maybe<SaleResponse>;
  createStock?: Maybe<StockResponse>;
  createUser?: Maybe<UserResponse>;
  createWarehouse?: Maybe<WarehouseResponse>;
  deleteBranch?: Maybe<BranchResponse>;
  deleteBranchProduct?: Maybe<BranchProductResponse>;
  deleteCategory?: Maybe<CategoryResponse>;
  deletePrice?: Maybe<PriceResponse>;
  deletePriceList?: Maybe<PriceListResponse>;
  deleteProduct?: Maybe<ProductResponse>;
  deleteWarehouse?: Maybe<WarehouseResponse>;
  deliverOrder?: Maybe<OrderResponse>;
  openCash?: Maybe<CashResponse>;
  publicCreateAddress?: Maybe<AddressResponse>;
  publicCreateCustomer?: Maybe<CustomerResponse>;
  publicCreateOrder?: Maybe<OrderResponse>;
  rejectOrder?: Maybe<OrderResponse>;
  updateBranch?: Maybe<BranchResponse>;
  updateBranchProduct?: Maybe<BranchProductResponse>;
  updateCategory?: Maybe<CategoryResponse>;
  updateCombo?: Maybe<ProductResponse>;
  updateConfiguration?: Maybe<ConfigurationResponse>;
  updateDistributor?: Maybe<DistributorResponse>;
  updatePrice?: Maybe<PriceResponse>;
  updatePriceList?: Maybe<PriceListResponse>;
  updateProduct?: Maybe<ProductResponse>;
  updateUser?: Maybe<UserResponse>;
  updateWarehouse?: Maybe<WarehouseResponse>;
  uploadFile?: Maybe<ProductImageResponse>;
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


export type MutationCreateComboArgs = {
  createComboInput: CreateComboInput;
};


export type MutationCreateDistributorArgs = {
  createDistributorInput: CreateDistributorInput;
};


export type MutationCreateDistributorSaleArgs = {
  createDistributorSaleInput: CreateDistributorSaleInput;
};


export type MutationCreatePaymentArgs = {
  createPaymentInput: CreatePaymentInput;
};


export type MutationCreatePriceArgs = {
  createPriceInput: CreatePriceInput;
};


export type MutationCreatePriceListArgs = {
  createPriceListInput: CreatePriceListInput;
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


export type MutationDeletePriceArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeletePriceListArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteProductArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeleteWarehouseArgs = {
  id: Scalars['ObjectId']['input'];
};


export type MutationDeliverOrderArgs = {
  orderId: Scalars['ObjectId']['input'];
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


export type MutationUpdateComboArgs = {
  updateComboInput: UpdateComboInput;
};


export type MutationUpdateConfigurationArgs = {
  updateConfigurationInput: UpdateConfigurationInput;
};


export type MutationUpdateDistributorArgs = {
  updateDistributorInput: UpdateDistributorInput;
};


export type MutationUpdatePriceArgs = {
  updatePriceInput: UpdatePriceInput;
};


export type MutationUpdatePriceListArgs = {
  updatePriceListInput: UpdatePriceListInput;
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


export type MutationUploadFileArgs = {
  fileInput: FileInput;
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
  orderStatus: OrderStatusEnum;
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
  status?: InputMaybe<OrderStatusEnum>;
};

export type OrderResponse = ResponseBase & {
  __typename?: 'OrderResponse';
  data?: Maybe<Order>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export enum OrderStatusEnum {
  ACEPTED = 'ACEPTED',
  DELIVERED = 'DELIVERED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
  SOLD = 'SOLD'
}

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

export type Payment = {
  __typename?: 'Payment';
  amount: Scalars['Float']['output'];
  balance: Scalars['Float']['output'];
  createdBy?: Maybe<Scalars['ObjectId']['output']>;
  createdByInfo?: Maybe<User>;
  date: Scalars['Date']['output'];
  distributor?: Maybe<Distributor>;
  distributorId: Scalars['ObjectId']['output'];
  distributorSale?: Maybe<DistributorSale>;
  distributorSaleId: Scalars['ObjectId']['output'];
  id: Scalars['ObjectId']['output'];
  observation?: Maybe<Scalars['String']['output']>;
  totalPaid: Scalars['Float']['output'];
};

export enum PaymentMethodEnum {
  CARD = 'CARD',
  CASH = 'CASH',
  QR_TRANSFER = 'QR_TRANSFER'
}

export type PaymentPaginationInput = {
  distributorsIds?: InputMaybe<Array<Scalars['ObjectId']['input']>>;
  endDate?: InputMaybe<Scalars['Date']['input']>;
  filter?: InputMaybe<Scalars['String']['input']>;
  initialDate?: InputMaybe<Scalars['Date']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  rows?: InputMaybe<Scalars['Int']['input']>;
  saleBy?: InputMaybe<Scalars['ObjectId']['input']>;
};

export type PaymentResponse = ResponseBase & {
  __typename?: 'PaymentResponse';
  data?: Maybe<Payment>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type Price = {
  __typename?: 'Price';
  id: Scalars['ObjectId']['output'];
  price: Scalars['Float']['output'];
  priceList?: Maybe<PriceList>;
  priceListId: Scalars['ObjectId']['output'];
  product?: Maybe<Product>;
  productId: Scalars['ObjectId']['output'];
};

export type PriceList = {
  __typename?: 'PriceList';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ObjectId']['output'];
  name: Scalars['String']['output'];
  productsIds: Array<Scalars['ObjectId']['output']>;
};

export type PriceListResponse = ResponseBase & {
  __typename?: 'PriceListResponse';
  data?: Maybe<PriceList>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type PriceListsResponse = ResponseBase & {
  __typename?: 'PriceListsResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<PriceList>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

export type PricePaginationInput = {
  filter?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['Int']['input']>;
  priceListId: Scalars['ObjectId']['input'];
  rows?: InputMaybe<Scalars['Int']['input']>;
};

export type PriceResponse = ResponseBase & {
  __typename?: 'PriceResponse';
  data?: Maybe<Price>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type PricesResponse = ResponseBase & {
  __typename?: 'PricesResponse';
  currentPage?: Maybe<Scalars['Int']['output']>;
  data?: Maybe<Array<Price>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  rows?: Maybe<Scalars['Int']['output']>;
  status: StatusEnum;
  totalPages?: Maybe<Scalars['Int']['output']>;
  totalRecords?: Maybe<Scalars['Int']['output']>;
};

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
  subProducts?: Maybe<Array<SubProducts>>;
  suggetedPrice: Scalars['Float']['output'];
  type: ProductTypeEnum;
  warehouses: Array<Scalars['ObjectId']['output']>;
};

export type ProductImageResponse = ResponseBase & {
  __typename?: 'ProductImageResponse';
  data?: Maybe<Scalars['String']['output']>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type ProductResponse = ResponseBase & {
  __typename?: 'ProductResponse';
  data?: Maybe<Product>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export enum ProductTypeEnum {
  COMBO = 'COMBO',
  SIMPLE = 'SIMPLE'
}

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

export type PublicCategoriesResponse = ResponseBase & {
  __typename?: 'PublicCategoriesResponse';
  data?: Maybe<Array<Category>>;
  errorInput?: Maybe<Array<ErrorInput>>;
  message?: Maybe<Scalars['String']['output']>;
  status: StatusEnum;
};

export type Query = {
  __typename?: 'Query';
  currentUser?: Maybe<UserResponse>;
  getBranchById?: Maybe<BranchResponse>;
  getBranchProductById?: Maybe<BranchProductResponse>;
  getBranchProductStock?: Maybe<BranchProductStockResponse>;
  getBranchProductsPaginated?: Maybe<BranchProductsResponse>;
  getBranchesPaginated?: Maybe<BranchsResponse>;
  getBusinessBalance?: Maybe<BusinessBalanceResponse>;
  getCashById?: Maybe<CashResponse>;
  getCashTurnMovements?: Maybe<CashTurnMovementsResponse>;
  getCategories?: Maybe<CategoriesResponse>;
  getCategoryById?: Maybe<CategoryResponse>;
  getConfiguration?: Maybe<ConfigurationResponse>;
  getDistributorById?: Maybe<DistributorResponse>;
  getDistributorSale?: Maybe<DistributorSaleResponse>;
  getDistributorSalePayments?: Maybe<DistributorSalePaymentsResponse>;
  getDistributorSaleProducts?: Maybe<DistributorSaleProductsResponse>;
  getDistributorSalesPaginated?: Maybe<DistributorSalesResponse>;
  getDistributorsPaginated?: Maybe<DistributorsResponse>;
  getDistributorsSalesSummary?: Maybe<DistributorsSalesSummaryResponse>;
  getOrderById?: Maybe<OrderResponse>;
  getOrdersPaginated?: Maybe<OrdersResponse>;
  getPriceById?: Maybe<PriceResponse>;
  getPriceListById?: Maybe<PriceListResponse>;
  getPriceListsPaginated?: Maybe<PriceListsResponse>;
  getPricesPaginated?: Maybe<PricesResponse>;
  getProductById?: Maybe<ProductResponse>;
  getProductStock?: Maybe<StocksResponse>;
  getProducts?: Maybe<ProductsResponse>;
  getProductsOutOfPriceList?: Maybe<ProductsResponse>;
  getProductsOutOfWarehouse?: Maybe<ProductsResponse>;
  getPublicCategories?: Maybe<PublicCategoriesResponse>;
  getPublicCustomerById?: Maybe<CustomerResponse>;
  getPublicProducts?: Maybe<BranchProductsCategorizedResponse>;
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


export type QueryGetBranchProductStockArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetBranchProductsPaginatedArgs = {
  branchId: Scalars['ObjectId']['input'];
  paginationInput: PaginationInput;
  posMenu?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetBranchesPaginatedArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetBusinessBalanceArgs = {
  endDate: Scalars['Date']['input'];
  initialDate: Scalars['Date']['input'];
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


export type QueryGetDistributorByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetDistributorSaleArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetDistributorSalePaymentsArgs = {
  distibutorSaleId: Scalars['ObjectId']['input'];
};


export type QueryGetDistributorSaleProductsArgs = {
  priceListId: Scalars['ObjectId']['input'];
  warehouseId: Scalars['ObjectId']['input'];
};


export type QueryGetDistributorSalesPaginatedArgs = {
  distributorSalePaginationInput: DistributorSalePaginationInput;
};


export type QueryGetDistributorsPaginatedArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetDistributorsSalesSummaryArgs = {
  distributorSalePaginationInput: DistributorSalePaginationInput;
};


export type QueryGetOrderByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetOrdersPaginatedArgs = {
  orderPaginationInput: OrderPaginationInput;
};


export type QueryGetPriceByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetPriceListByIdArgs = {
  id: Scalars['ObjectId']['input'];
};


export type QueryGetPriceListsPaginatedArgs = {
  paginationInput: PaginationInput;
};


export type QueryGetPricesPaginatedArgs = {
  pricePaginationInput: PricePaginationInput;
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
  type?: InputMaybe<ProductTypeEnum>;
};


export type QueryGetProductsOutOfPriceListArgs = {
  paginationInput: PaginationInput;
  priceListId: Scalars['ObjectId']['input'];
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

export type SubProductInput = {
  productId: Scalars['ObjectId']['input'];
  stockRequirement: Scalars['Int']['input'];
};

export type SubProducts = {
  __typename?: 'SubProducts';
  product?: Maybe<Product>;
  productId: Scalars['ObjectId']['output'];
  stockRequirement: Scalars['Int']['output'];
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

export type UpdateComboInput = {
  categoryId?: InputMaybe<Scalars['ObjectId']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  cost?: InputMaybe<Scalars['Float']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
  image?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  subProducts?: InputMaybe<Array<SubProductInput>>;
  suggetedPrice?: InputMaybe<Scalars['Float']['input']>;
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

export type UpdateDistrbutorOwnerInformationInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  lastName?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateDistributorInput = {
  address?: InputMaybe<Scalars['String']['input']>;
  code?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  nit?: InputMaybe<Scalars['String']['input']>;
  ownerInformation?: InputMaybe<UpdateDistrbutorOwnerInformationInput>;
  phone?: InputMaybe<Scalars['String']['input']>;
  socialReason?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateMeasurementUnitsInput = {
  name: Scalars['String']['input'];
  shortName: Scalars['String']['input'];
};

export type UpdatePriceInput = {
  id: Scalars['ObjectId']['input'];
  price?: InputMaybe<Scalars['Float']['input']>;
  productId?: InputMaybe<Scalars['ObjectId']['input']>;
};

export type UpdatePriceListInput = {
  description?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ObjectId']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
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
  ResponseBase: ( AddressResponse ) | ( BranchProductResponse ) | ( BranchProductStockResponse ) | ( BranchProductsCategorizedResponse ) | ( BranchProductsResponse ) | ( BranchResponse ) | ( BranchsResponse ) | ( BusinessBalanceResponse ) | ( CashResponse ) | ( CashTurnMovementResponse ) | ( CashTurnMovementsResponse ) | ( CategoriesResponse ) | ( CategoryResponse ) | ( ConfigurationResponse ) | ( CustomerResponse ) | ( DistributorResponse ) | ( DistributorSalePaymentsResponse ) | ( DistributorSaleProductsResponse ) | ( DistributorSaleResponse ) | ( DistributorSalesResponse ) | ( DistributorsResponse ) | ( DistributorsSalesSummaryResponse ) | ( LoginResponse ) | ( OrderResponse ) | ( OrdersResponse ) | ( PaymentResponse ) | ( PriceListResponse ) | ( PriceListsResponse ) | ( PriceResponse ) | ( PricesResponse ) | ( ProductImageResponse ) | ( ProductResponse ) | ( ProductsResponse ) | ( PublicCategoriesResponse ) | ( Response ) | ( RolesResponse ) | ( SaleResponse ) | ( SalesResponse ) | ( SalesSummaryResponse ) | ( StockResponse ) | ( StocksHistoryResponse ) | ( StocksResponse ) | ( UserResponse ) | ( UsersResponse ) | ( WarehouseResponse ) | ( WarehousesResponse );
};

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Address: ResolverTypeWrapper<Address>;
  AddressResponse: ResolverTypeWrapper<AddressResponse>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Branch: ResolverTypeWrapper<Branch>;
  BranchProduct: ResolverTypeWrapper<BranchProduct>;
  BranchProductCategorized: ResolverTypeWrapper<BranchProductCategorized>;
  BranchProductResponse: ResolverTypeWrapper<BranchProductResponse>;
  BranchProductStockResponse: ResolverTypeWrapper<BranchProductStockResponse>;
  BranchProductsCategorizedResponse: ResolverTypeWrapper<BranchProductsCategorizedResponse>;
  BranchProductsResponse: ResolverTypeWrapper<BranchProductsResponse>;
  BranchResponse: ResolverTypeWrapper<BranchResponse>;
  BranchSales: ResolverTypeWrapper<BranchSales>;
  BranchsResponse: ResolverTypeWrapper<BranchsResponse>;
  BusinessBalance: ResolverTypeWrapper<BusinessBalance>;
  BusinessBalanceResponse: ResolverTypeWrapper<BusinessBalanceResponse>;
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
  CreateComboInput: CreateComboInput;
  CreateCustomerInput: CreateCustomerInput;
  CreateDistrbutorOwnerInformationInput: CreateDistrbutorOwnerInformationInput;
  CreateDistributorInput: CreateDistributorInput;
  CreateDistributorSaleInput: CreateDistributorSaleInput;
  CreateOrderInput: CreateOrderInput;
  CreatePaymentInput: CreatePaymentInput;
  CreatePriceInput: CreatePriceInput;
  CreatePriceListInput: CreatePriceListInput;
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
  Distributor: ResolverTypeWrapper<Distributor>;
  DistributorOwnerInformation: ResolverTypeWrapper<DistributorOwnerInformation>;
  DistributorResponse: ResolverTypeWrapper<DistributorResponse>;
  DistributorSale: ResolverTypeWrapper<DistributorSale>;
  DistributorSaleItem: ResolverTypeWrapper<DistributorSaleItem>;
  DistributorSaleItemInput: DistributorSaleItemInput;
  DistributorSalePaginationInput: DistributorSalePaginationInput;
  DistributorSalePaymentMethod: DistributorSalePaymentMethod;
  DistributorSalePaymentsResponse: ResolverTypeWrapper<DistributorSalePaymentsResponse>;
  DistributorSaleProduct: ResolverTypeWrapper<DistributorSaleProduct>;
  DistributorSaleProductsResponse: ResolverTypeWrapper<DistributorSaleProductsResponse>;
  DistributorSaleResponse: ResolverTypeWrapper<DistributorSaleResponse>;
  DistributorSalesResponse: ResolverTypeWrapper<DistributorSalesResponse>;
  DistributorsResponse: ResolverTypeWrapper<DistributorsResponse>;
  DistributorsSalesSummary: ResolverTypeWrapper<DistributorsSalesSummary>;
  DistributorsSalesSummaryResponse: ResolverTypeWrapper<DistributorsSalesSummaryResponse>;
  ErrorInput: ResolverTypeWrapper<ErrorInput>;
  FileInput: FileInput;
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
  OrderStatusEnum: OrderStatusEnum;
  OrdersResponse: ResolverTypeWrapper<OrdersResponse>;
  PaginationInput: PaginationInput;
  Payment: ResolverTypeWrapper<Payment>;
  PaymentMethodEnum: PaymentMethodEnum;
  PaymentPaginationInput: PaymentPaginationInput;
  PaymentResponse: ResolverTypeWrapper<PaymentResponse>;
  Price: ResolverTypeWrapper<Price>;
  PriceList: ResolverTypeWrapper<PriceList>;
  PriceListResponse: ResolverTypeWrapper<PriceListResponse>;
  PriceListsResponse: ResolverTypeWrapper<PriceListsResponse>;
  PricePaginationInput: PricePaginationInput;
  PriceResponse: ResolverTypeWrapper<PriceResponse>;
  PricesResponse: ResolverTypeWrapper<PricesResponse>;
  Product: ResolverTypeWrapper<Product>;
  ProductImageResponse: ResolverTypeWrapper<ProductImageResponse>;
  ProductResponse: ResolverTypeWrapper<ProductResponse>;
  ProductTypeEnum: ProductTypeEnum;
  ProductsResponse: ResolverTypeWrapper<ProductsResponse>;
  PublicCategoriesResponse: ResolverTypeWrapper<PublicCategoriesResponse>;
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
  SubProductInput: SubProductInput;
  SubProducts: ResolverTypeWrapper<SubProducts>;
  Time: ResolverTypeWrapper<Scalars['Time']['output']>;
  Turn: ResolverTypeWrapper<Turn>;
  TurnMovementTypeEnum: TurnMovementTypeEnum;
  TurnMovements: ResolverTypeWrapper<TurnMovements>;
  UpdateBranchInput: UpdateBranchInput;
  UpdateBranchProductInput: UpdateBranchProductInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateComboInput: UpdateComboInput;
  UpdateConfigurationInput: UpdateConfigurationInput;
  UpdateDistrbutorOwnerInformationInput: UpdateDistrbutorOwnerInformationInput;
  UpdateDistributorInput: UpdateDistributorInput;
  UpdateMeasurementUnitsInput: UpdateMeasurementUnitsInput;
  UpdatePriceInput: UpdatePriceInput;
  UpdatePriceListInput: UpdatePriceListInput;
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWarehouseInput: UpdateWarehouseInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']['output']>;
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
  BranchProductCategorized: BranchProductCategorized;
  BranchProductResponse: BranchProductResponse;
  BranchProductStockResponse: BranchProductStockResponse;
  BranchProductsCategorizedResponse: BranchProductsCategorizedResponse;
  BranchProductsResponse: BranchProductsResponse;
  BranchResponse: BranchResponse;
  BranchSales: BranchSales;
  BranchsResponse: BranchsResponse;
  BusinessBalance: BusinessBalance;
  BusinessBalanceResponse: BusinessBalanceResponse;
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
  CreateComboInput: CreateComboInput;
  CreateCustomerInput: CreateCustomerInput;
  CreateDistrbutorOwnerInformationInput: CreateDistrbutorOwnerInformationInput;
  CreateDistributorInput: CreateDistributorInput;
  CreateDistributorSaleInput: CreateDistributorSaleInput;
  CreateOrderInput: CreateOrderInput;
  CreatePaymentInput: CreatePaymentInput;
  CreatePriceInput: CreatePriceInput;
  CreatePriceListInput: CreatePriceListInput;
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
  Distributor: Distributor;
  DistributorOwnerInformation: DistributorOwnerInformation;
  DistributorResponse: DistributorResponse;
  DistributorSale: DistributorSale;
  DistributorSaleItem: DistributorSaleItem;
  DistributorSaleItemInput: DistributorSaleItemInput;
  DistributorSalePaginationInput: DistributorSalePaginationInput;
  DistributorSalePaymentsResponse: DistributorSalePaymentsResponse;
  DistributorSaleProduct: DistributorSaleProduct;
  DistributorSaleProductsResponse: DistributorSaleProductsResponse;
  DistributorSaleResponse: DistributorSaleResponse;
  DistributorSalesResponse: DistributorSalesResponse;
  DistributorsResponse: DistributorsResponse;
  DistributorsSalesSummary: DistributorsSalesSummary;
  DistributorsSalesSummaryResponse: DistributorsSalesSummaryResponse;
  ErrorInput: ErrorInput;
  FileInput: FileInput;
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
  Payment: Payment;
  PaymentPaginationInput: PaymentPaginationInput;
  PaymentResponse: PaymentResponse;
  Price: Price;
  PriceList: PriceList;
  PriceListResponse: PriceListResponse;
  PriceListsResponse: PriceListsResponse;
  PricePaginationInput: PricePaginationInput;
  PriceResponse: PriceResponse;
  PricesResponse: PricesResponse;
  Product: Product;
  ProductImageResponse: ProductImageResponse;
  ProductResponse: ProductResponse;
  ProductsResponse: ProductsResponse;
  PublicCategoriesResponse: PublicCategoriesResponse;
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
  SubProductInput: SubProductInput;
  SubProducts: SubProducts;
  Time: Scalars['Time']['output'];
  Turn: Turn;
  TurnMovements: TurnMovements;
  UpdateBranchInput: UpdateBranchInput;
  UpdateBranchProductInput: UpdateBranchProductInput;
  UpdateCategoryInput: UpdateCategoryInput;
  UpdateComboInput: UpdateComboInput;
  UpdateConfigurationInput: UpdateConfigurationInput;
  UpdateDistrbutorOwnerInformationInput: UpdateDistrbutorOwnerInformationInput;
  UpdateDistributorInput: UpdateDistributorInput;
  UpdateMeasurementUnitsInput: UpdateMeasurementUnitsInput;
  UpdatePriceInput: UpdatePriceInput;
  UpdatePriceListInput: UpdatePriceListInput;
  UpdateProductInput: UpdateProductInput;
  UpdateUserInput: UpdateUserInput;
  UpdateWarehouseInput: UpdateWarehouseInput;
  Upload: Scalars['Upload']['output'];
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
  lastStockEntry?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchProductCategorizedResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchProductCategorized'] = ResolversParentTypes['BranchProductCategorized']> = {
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  products?: Resolver<Maybe<Array<ResolversTypes['BranchProduct']>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchProductResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchProductResponse'] = ResolversParentTypes['BranchProductResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['BranchProduct']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchProductStockResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchProductStockResponse'] = ResolversParentTypes['BranchProductStockResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BranchProductsCategorizedResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchProductsCategorizedResponse'] = ResolversParentTypes['BranchProductsCategorizedResponse']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['BranchProductCategorized']>>, ParentType, ContextType>;
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

export type BranchSalesResolvers<ContextType = any, ParentType extends ResolversParentTypes['BranchSales'] = ResolversParentTypes['BranchSales']> = {
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
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

export type BusinessBalanceResolvers<ContextType = any, ParentType extends ResolversParentTypes['BusinessBalance'] = ResolversParentTypes['BusinessBalance']> = {
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  result?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  salesByBranch?: Resolver<Array<ResolversTypes['BranchSales']>, ParentType, ContextType>;
  totalEarnings?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalExpenses?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalPaid?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type BusinessBalanceResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['BusinessBalanceResponse'] = ResolversParentTypes['BusinessBalanceResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['BusinessBalance']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
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
  addressInfo?: Resolver<Maybe<Array<ResolversTypes['Address']>>, ParentType, ContextType>;
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

export type DistributorResolvers<ContextType = any, ParentType extends ResolversParentTypes['Distributor'] = ResolversParentTypes['Distributor']> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  email?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  nit?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  ownerInformation?: Resolver<ResolversTypes['DistributorOwnerInformation'], ParentType, ContextType>;
  phone?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  socialReason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorOwnerInformationResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorOwnerInformation'] = ResolversParentTypes['DistributorOwnerInformation']> = {
  address?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  phone?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorResponse'] = ResolversParentTypes['DistributorResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Distributor']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorSaleResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorSale'] = ResolversParentTypes['DistributorSale']> = {
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  canceled?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  canceledAt?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  canceledBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  canceledByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  code?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  createdByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  discount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  distributor?: Resolver<Maybe<ResolversTypes['Distributor']>, ParentType, ContextType>;
  distributorId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  observations?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  paymentMethod?: Resolver<ResolversTypes['DistributorSalePaymentMethod'], ParentType, ContextType>;
  priceList?: Resolver<Maybe<ResolversTypes['PriceList']>, ParentType, ContextType>;
  priceListId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  products?: Resolver<Array<ResolversTypes['DistributorSaleItem']>, ParentType, ContextType>;
  reason?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  subTotal?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalPaid?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  warehouse?: Resolver<Maybe<ResolversTypes['Warehouse']>, ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorSaleItemResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorSaleItem'] = ResolversParentTypes['DistributorSaleItem']> = {
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  qty?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorSalePaymentsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorSalePaymentsResponse'] = ResolversParentTypes['DistributorSalePaymentsResponse']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['Payment']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorSaleProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorSaleProduct'] = ResolversParentTypes['DistributorSaleProduct']> = {
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  priceId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  priceListId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  stock?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  stockId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  warehouseId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorSaleProductsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorSaleProductsResponse'] = ResolversParentTypes['DistributorSaleProductsResponse']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['DistributorSaleProduct']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorSaleResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorSaleResponse'] = ResolversParentTypes['DistributorSaleResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['DistributorSale']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorSalesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorSalesResponse'] = ResolversParentTypes['DistributorSalesResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['DistributorSale']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorsResponse'] = ResolversParentTypes['DistributorsResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['Distributor']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorsSalesSummaryResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorsSalesSummary'] = ResolversParentTypes['DistributorsSalesSummary']> = {
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  total?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalPaid?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DistributorsSalesSummaryResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['DistributorsSalesSummaryResponse'] = ResolversParentTypes['DistributorsSalesSummaryResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['DistributorsSalesSummary']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

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
  createCombo?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationCreateComboArgs, 'createComboInput'>>;
  createDistributor?: Resolver<Maybe<ResolversTypes['DistributorResponse']>, ParentType, ContextType, RequireFields<MutationCreateDistributorArgs, 'createDistributorInput'>>;
  createDistributorSale?: Resolver<Maybe<ResolversTypes['DistributorSaleResponse']>, ParentType, ContextType, RequireFields<MutationCreateDistributorSaleArgs, 'createDistributorSaleInput'>>;
  createPayment?: Resolver<Maybe<ResolversTypes['PaymentResponse']>, ParentType, ContextType, RequireFields<MutationCreatePaymentArgs, 'createPaymentInput'>>;
  createPrice?: Resolver<Maybe<ResolversTypes['PriceResponse']>, ParentType, ContextType, RequireFields<MutationCreatePriceArgs, 'createPriceInput'>>;
  createPriceList?: Resolver<Maybe<ResolversTypes['PriceListResponse']>, ParentType, ContextType, RequireFields<MutationCreatePriceListArgs, 'createPriceListInput'>>;
  createProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'createProductInput'>>;
  createSale?: Resolver<Maybe<ResolversTypes['SaleResponse']>, ParentType, ContextType, RequireFields<MutationCreateSaleArgs, 'createSaleInput'>>;
  createStock?: Resolver<Maybe<ResolversTypes['StockResponse']>, ParentType, ContextType, RequireFields<MutationCreateStockArgs, 'createStockInput'>>;
  createUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'userInput'>>;
  createWarehouse?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<MutationCreateWarehouseArgs, 'createWarehouseInput'>>;
  deleteBranch?: Resolver<Maybe<ResolversTypes['BranchResponse']>, ParentType, ContextType, RequireFields<MutationDeleteBranchArgs, 'id'>>;
  deleteBranchProduct?: Resolver<Maybe<ResolversTypes['BranchProductResponse']>, ParentType, ContextType, RequireFields<MutationDeleteBranchProductArgs, 'id'>>;
  deleteCategory?: Resolver<Maybe<ResolversTypes['CategoryResponse']>, ParentType, ContextType, RequireFields<MutationDeleteCategoryArgs, 'id'>>;
  deletePrice?: Resolver<Maybe<ResolversTypes['PriceResponse']>, ParentType, ContextType, RequireFields<MutationDeletePriceArgs, 'id'>>;
  deletePriceList?: Resolver<Maybe<ResolversTypes['PriceListResponse']>, ParentType, ContextType, RequireFields<MutationDeletePriceListArgs, 'id'>>;
  deleteProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationDeleteProductArgs, 'id'>>;
  deleteWarehouse?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<MutationDeleteWarehouseArgs, 'id'>>;
  deliverOrder?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<MutationDeliverOrderArgs, 'orderId'>>;
  openCash?: Resolver<Maybe<ResolversTypes['CashResponse']>, ParentType, ContextType, RequireFields<MutationOpenCashArgs, 'createTurnInput'>>;
  publicCreateAddress?: Resolver<Maybe<ResolversTypes['AddressResponse']>, ParentType, ContextType, RequireFields<MutationPublicCreateAddressArgs, 'createAddressInput'>>;
  publicCreateCustomer?: Resolver<Maybe<ResolversTypes['CustomerResponse']>, ParentType, ContextType, RequireFields<MutationPublicCreateCustomerArgs, 'createCustomerInput'>>;
  publicCreateOrder?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<MutationPublicCreateOrderArgs, 'createOrderInput'>>;
  rejectOrder?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<MutationRejectOrderArgs, 'orderId'>>;
  updateBranch?: Resolver<Maybe<ResolversTypes['BranchResponse']>, ParentType, ContextType, RequireFields<MutationUpdateBranchArgs, 'updateBranchInput'>>;
  updateBranchProduct?: Resolver<Maybe<ResolversTypes['BranchProductResponse']>, ParentType, ContextType, RequireFields<MutationUpdateBranchProductArgs, 'updateBranchProductInput'>>;
  updateCategory?: Resolver<Maybe<ResolversTypes['CategoryResponse']>, ParentType, ContextType, RequireFields<MutationUpdateCategoryArgs, 'updateCategoryInput'>>;
  updateCombo?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationUpdateComboArgs, 'updateComboInput'>>;
  updateConfiguration?: Resolver<Maybe<ResolversTypes['ConfigurationResponse']>, ParentType, ContextType, RequireFields<MutationUpdateConfigurationArgs, 'updateConfigurationInput'>>;
  updateDistributor?: Resolver<Maybe<ResolversTypes['DistributorResponse']>, ParentType, ContextType, RequireFields<MutationUpdateDistributorArgs, 'updateDistributorInput'>>;
  updatePrice?: Resolver<Maybe<ResolversTypes['PriceResponse']>, ParentType, ContextType, RequireFields<MutationUpdatePriceArgs, 'updatePriceInput'>>;
  updatePriceList?: Resolver<Maybe<ResolversTypes['PriceListResponse']>, ParentType, ContextType, RequireFields<MutationUpdatePriceListArgs, 'updatePriceListInput'>>;
  updateProduct?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'updateProductInput'>>;
  updateUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType, RequireFields<MutationUpdateUserArgs, 'deleteInput' | 'updateUserInput'>>;
  updateWarehouse?: Resolver<Maybe<ResolversTypes['WarehouseResponse']>, ParentType, ContextType, RequireFields<MutationUpdateWarehouseArgs, 'updateWarehouseInput'>>;
  uploadFile?: Resolver<Maybe<ResolversTypes['ProductImageResponse']>, ParentType, ContextType, RequireFields<MutationUploadFileArgs, 'fileInput'>>;
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
  orderStatus?: Resolver<ResolversTypes['OrderStatusEnum'], ParentType, ContextType>;
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

export type PaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  balance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdBy?: Resolver<Maybe<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  createdByInfo?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  date?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  distributor?: Resolver<Maybe<ResolversTypes['Distributor']>, ParentType, ContextType>;
  distributorId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  distributorSale?: Resolver<Maybe<ResolversTypes['DistributorSale']>, ParentType, ContextType>;
  distributorSaleId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  observation?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  totalPaid?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PaymentResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PaymentResponse'] = ResolversParentTypes['PaymentResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Payment']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceResolvers<ContextType = any, ParentType extends ResolversParentTypes['Price'] = ResolversParentTypes['Price']> = {
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  priceList?: Resolver<Maybe<ResolversTypes['PriceList']>, ParentType, ContextType>;
  priceListId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceListResolvers<ContextType = any, ParentType extends ResolversParentTypes['PriceList'] = ResolversParentTypes['PriceList']> = {
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  productsIds?: Resolver<Array<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceListResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PriceListResponse'] = ResolversParentTypes['PriceListResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['PriceList']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceListsResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PriceListsResponse'] = ResolversParentTypes['PriceListsResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['PriceList']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  rows?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  totalPages?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  totalRecords?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PriceResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PriceResponse'] = ResolversParentTypes['PriceResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['Price']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PricesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PricesResponse'] = ResolversParentTypes['PricesResponse']> = {
  currentPage?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  data?: Resolver<Maybe<Array<ResolversTypes['Price']>>, ParentType, ContextType>;
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
  subProducts?: Resolver<Maybe<Array<ResolversTypes['SubProducts']>>, ParentType, ContextType>;
  suggetedPrice?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['ProductTypeEnum'], ParentType, ContextType>;
  warehouses?: Resolver<Array<ResolversTypes['ObjectId']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ProductImageResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['ProductImageResponse'] = ResolversParentTypes['ProductImageResponse']> = {
  data?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
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

export type PublicCategoriesResponseResolvers<ContextType = any, ParentType extends ResolversParentTypes['PublicCategoriesResponse'] = ResolversParentTypes['PublicCategoriesResponse']> = {
  data?: Resolver<Maybe<Array<ResolversTypes['Category']>>, ParentType, ContextType>;
  errorInput?: Resolver<Maybe<Array<ResolversTypes['ErrorInput']>>, ParentType, ContextType>;
  message?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  status?: Resolver<ResolversTypes['StatusEnum'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  currentUser?: Resolver<Maybe<ResolversTypes['UserResponse']>, ParentType, ContextType>;
  getBranchById?: Resolver<Maybe<ResolversTypes['BranchResponse']>, ParentType, ContextType, RequireFields<QueryGetBranchByIdArgs, 'id'>>;
  getBranchProductById?: Resolver<Maybe<ResolversTypes['BranchProductResponse']>, ParentType, ContextType, RequireFields<QueryGetBranchProductByIdArgs, 'id'>>;
  getBranchProductStock?: Resolver<Maybe<ResolversTypes['BranchProductStockResponse']>, ParentType, ContextType, RequireFields<QueryGetBranchProductStockArgs, 'id'>>;
  getBranchProductsPaginated?: Resolver<Maybe<ResolversTypes['BranchProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetBranchProductsPaginatedArgs, 'branchId' | 'paginationInput'>>;
  getBranchesPaginated?: Resolver<Maybe<ResolversTypes['BranchsResponse']>, ParentType, ContextType, RequireFields<QueryGetBranchesPaginatedArgs, 'paginationInput'>>;
  getBusinessBalance?: Resolver<Maybe<ResolversTypes['BusinessBalanceResponse']>, ParentType, ContextType, RequireFields<QueryGetBusinessBalanceArgs, 'endDate' | 'initialDate'>>;
  getCashById?: Resolver<Maybe<ResolversTypes['CashResponse']>, ParentType, ContextType, RequireFields<QueryGetCashByIdArgs, 'id'>>;
  getCashTurnMovements?: Resolver<Maybe<ResolversTypes['CashTurnMovementsResponse']>, ParentType, ContextType, RequireFields<QueryGetCashTurnMovementsArgs, 'paginationInput' | 'turnId'>>;
  getCategories?: Resolver<Maybe<ResolversTypes['CategoriesResponse']>, ParentType, ContextType, RequireFields<QueryGetCategoriesArgs, 'paginationInput'>>;
  getCategoryById?: Resolver<Maybe<ResolversTypes['CategoryResponse']>, ParentType, ContextType, RequireFields<QueryGetCategoryByIdArgs, 'id'>>;
  getConfiguration?: Resolver<Maybe<ResolversTypes['ConfigurationResponse']>, ParentType, ContextType>;
  getDistributorById?: Resolver<Maybe<ResolversTypes['DistributorResponse']>, ParentType, ContextType, RequireFields<QueryGetDistributorByIdArgs, 'id'>>;
  getDistributorSale?: Resolver<Maybe<ResolversTypes['DistributorSaleResponse']>, ParentType, ContextType, RequireFields<QueryGetDistributorSaleArgs, 'id'>>;
  getDistributorSalePayments?: Resolver<Maybe<ResolversTypes['DistributorSalePaymentsResponse']>, ParentType, ContextType, RequireFields<QueryGetDistributorSalePaymentsArgs, 'distibutorSaleId'>>;
  getDistributorSaleProducts?: Resolver<Maybe<ResolversTypes['DistributorSaleProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetDistributorSaleProductsArgs, 'priceListId' | 'warehouseId'>>;
  getDistributorSalesPaginated?: Resolver<Maybe<ResolversTypes['DistributorSalesResponse']>, ParentType, ContextType, RequireFields<QueryGetDistributorSalesPaginatedArgs, 'distributorSalePaginationInput'>>;
  getDistributorsPaginated?: Resolver<Maybe<ResolversTypes['DistributorsResponse']>, ParentType, ContextType, RequireFields<QueryGetDistributorsPaginatedArgs, 'paginationInput'>>;
  getDistributorsSalesSummary?: Resolver<Maybe<ResolversTypes['DistributorsSalesSummaryResponse']>, ParentType, ContextType, RequireFields<QueryGetDistributorsSalesSummaryArgs, 'distributorSalePaginationInput'>>;
  getOrderById?: Resolver<Maybe<ResolversTypes['OrderResponse']>, ParentType, ContextType, RequireFields<QueryGetOrderByIdArgs, 'id'>>;
  getOrdersPaginated?: Resolver<Maybe<ResolversTypes['OrdersResponse']>, ParentType, ContextType, RequireFields<QueryGetOrdersPaginatedArgs, 'orderPaginationInput'>>;
  getPriceById?: Resolver<Maybe<ResolversTypes['PriceResponse']>, ParentType, ContextType, RequireFields<QueryGetPriceByIdArgs, 'id'>>;
  getPriceListById?: Resolver<Maybe<ResolversTypes['PriceListResponse']>, ParentType, ContextType, RequireFields<QueryGetPriceListByIdArgs, 'id'>>;
  getPriceListsPaginated?: Resolver<Maybe<ResolversTypes['PriceListsResponse']>, ParentType, ContextType, RequireFields<QueryGetPriceListsPaginatedArgs, 'paginationInput'>>;
  getPricesPaginated?: Resolver<Maybe<ResolversTypes['PricesResponse']>, ParentType, ContextType, RequireFields<QueryGetPricesPaginatedArgs, 'pricePaginationInput'>>;
  getProductById?: Resolver<Maybe<ResolversTypes['ProductResponse']>, ParentType, ContextType, RequireFields<QueryGetProductByIdArgs, 'id'>>;
  getProductStock?: Resolver<Maybe<ResolversTypes['StocksResponse']>, ParentType, ContextType, RequireFields<QueryGetProductStockArgs, 'paginationInput' | 'productId'>>;
  getProducts?: Resolver<Maybe<ResolversTypes['ProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetProductsArgs, 'paginationInput'>>;
  getProductsOutOfPriceList?: Resolver<Maybe<ResolversTypes['ProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetProductsOutOfPriceListArgs, 'paginationInput' | 'priceListId'>>;
  getProductsOutOfWarehouse?: Resolver<Maybe<ResolversTypes['ProductsResponse']>, ParentType, ContextType, RequireFields<QueryGetProductsOutOfWarehouseArgs, 'paginationInput' | 'warehouseId'>>;
  getPublicCategories?: Resolver<Maybe<ResolversTypes['PublicCategoriesResponse']>, ParentType, ContextType>;
  getPublicCustomerById?: Resolver<Maybe<ResolversTypes['CustomerResponse']>, ParentType, ContextType, RequireFields<QueryGetPublicCustomerByIdArgs, 'id'>>;
  getPublicProducts?: Resolver<Maybe<ResolversTypes['BranchProductsCategorizedResponse']>, ParentType, ContextType, RequireFields<QueryGetPublicProductsArgs, 'branchId'>>;
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
  __resolveType: TypeResolveFn<'AddressResponse' | 'BranchProductResponse' | 'BranchProductStockResponse' | 'BranchProductsCategorizedResponse' | 'BranchProductsResponse' | 'BranchResponse' | 'BranchsResponse' | 'BusinessBalanceResponse' | 'CashResponse' | 'CashTurnMovementResponse' | 'CashTurnMovementsResponse' | 'CategoriesResponse' | 'CategoryResponse' | 'ConfigurationResponse' | 'CustomerResponse' | 'DistributorResponse' | 'DistributorSalePaymentsResponse' | 'DistributorSaleProductsResponse' | 'DistributorSaleResponse' | 'DistributorSalesResponse' | 'DistributorsResponse' | 'DistributorsSalesSummaryResponse' | 'LoginResponse' | 'OrderResponse' | 'OrdersResponse' | 'PaymentResponse' | 'PriceListResponse' | 'PriceListsResponse' | 'PriceResponse' | 'PricesResponse' | 'ProductImageResponse' | 'ProductResponse' | 'ProductsResponse' | 'PublicCategoriesResponse' | 'Response' | 'RolesResponse' | 'SaleResponse' | 'SalesResponse' | 'SalesSummaryResponse' | 'StockResponse' | 'StocksHistoryResponse' | 'StocksResponse' | 'UserResponse' | 'UsersResponse' | 'WarehouseResponse' | 'WarehousesResponse', ParentType, ContextType>;
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

export type SubProductsResolvers<ContextType = any, ParentType extends ResolversParentTypes['SubProducts'] = ResolversParentTypes['SubProducts']> = {
  product?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ObjectId'], ParentType, ContextType>;
  stockRequirement?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
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
  BranchProductCategorized?: BranchProductCategorizedResolvers<ContextType>;
  BranchProductResponse?: BranchProductResponseResolvers<ContextType>;
  BranchProductStockResponse?: BranchProductStockResponseResolvers<ContextType>;
  BranchProductsCategorizedResponse?: BranchProductsCategorizedResponseResolvers<ContextType>;
  BranchProductsResponse?: BranchProductsResponseResolvers<ContextType>;
  BranchResponse?: BranchResponseResolvers<ContextType>;
  BranchSales?: BranchSalesResolvers<ContextType>;
  BranchsResponse?: BranchsResponseResolvers<ContextType>;
  BusinessBalance?: BusinessBalanceResolvers<ContextType>;
  BusinessBalanceResponse?: BusinessBalanceResponseResolvers<ContextType>;
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
  Distributor?: DistributorResolvers<ContextType>;
  DistributorOwnerInformation?: DistributorOwnerInformationResolvers<ContextType>;
  DistributorResponse?: DistributorResponseResolvers<ContextType>;
  DistributorSale?: DistributorSaleResolvers<ContextType>;
  DistributorSaleItem?: DistributorSaleItemResolvers<ContextType>;
  DistributorSalePaymentsResponse?: DistributorSalePaymentsResponseResolvers<ContextType>;
  DistributorSaleProduct?: DistributorSaleProductResolvers<ContextType>;
  DistributorSaleProductsResponse?: DistributorSaleProductsResponseResolvers<ContextType>;
  DistributorSaleResponse?: DistributorSaleResponseResolvers<ContextType>;
  DistributorSalesResponse?: DistributorSalesResponseResolvers<ContextType>;
  DistributorsResponse?: DistributorsResponseResolvers<ContextType>;
  DistributorsSalesSummary?: DistributorsSalesSummaryResolvers<ContextType>;
  DistributorsSalesSummaryResponse?: DistributorsSalesSummaryResponseResolvers<ContextType>;
  ErrorInput?: ErrorInputResolvers<ContextType>;
  LoginResponse?: LoginResponseResolvers<ContextType>;
  MeasurementUnits?: MeasurementUnitsResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  ObjectId?: GraphQLScalarType;
  OpenTurnInfo?: OpenTurnInfoResolvers<ContextType>;
  Order?: OrderResolvers<ContextType>;
  OrderResponse?: OrderResponseResolvers<ContextType>;
  OrdersResponse?: OrdersResponseResolvers<ContextType>;
  Payment?: PaymentResolvers<ContextType>;
  PaymentResponse?: PaymentResponseResolvers<ContextType>;
  Price?: PriceResolvers<ContextType>;
  PriceList?: PriceListResolvers<ContextType>;
  PriceListResponse?: PriceListResponseResolvers<ContextType>;
  PriceListsResponse?: PriceListsResponseResolvers<ContextType>;
  PriceResponse?: PriceResponseResolvers<ContextType>;
  PricesResponse?: PricesResponseResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  ProductImageResponse?: ProductImageResponseResolvers<ContextType>;
  ProductResponse?: ProductResponseResolvers<ContextType>;
  ProductsResponse?: ProductsResponseResolvers<ContextType>;
  PublicCategoriesResponse?: PublicCategoriesResponseResolvers<ContextType>;
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
  SubProducts?: SubProductsResolvers<ContextType>;
  Time?: GraphQLScalarType;
  Turn?: TurnResolvers<ContextType>;
  TurnMovements?: TurnMovementsResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  User?: UserResolvers<ContextType>;
  UserResponse?: UserResponseResolvers<ContextType>;
  UsersResponse?: UsersResponseResolvers<ContextType>;
  Warehouse?: WarehouseResolvers<ContextType>;
  WarehouseResponse?: WarehouseResponseResolvers<ContextType>;
  WarehousesResponse?: WarehousesResponseResolvers<ContextType>;
};

