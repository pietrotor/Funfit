import { TValueProductData } from '@/components/atoms/modals/EditProductModal'
import { TValuesWarehouses } from '@/components/atoms/modals/EditWarehouseModal'
import { DeliveryMethodEnum, PaymentMethodEnum } from '@/graphql/graphql-types'

export type TStockData = {
  id: string
  productId: any
  warehouseId: any
  quantity: number
  securityStock?: number | null | undefined
  lastStockEntry: number
  units: string
  product?: TValueProductData
  warehouse?: TValuesWarehouses
}

export type TDataBranch = {
  id: any
  name: string
  code: string
  city: string
  direction: string
  phone?: string | null | undefined
  nit?: string | null | undefined
  cashId?: any
  visibleOnWeb: boolean
}

export type TProductBranchData = {
  id: string
  branchId: string
  productId: string
  price: number
  isVisibleOnWeb: boolean
  isVisibleOnMenu: boolean
  product?: TValueProductData
  warehouses?: string[]
  quantity?: number
  stock?: number
  total?: number
}

export type TDataRecipes = {
  id: number
  name: string
  ingredients: {
    id: number
    name: string
    quantity: number
  }[]
}

export type TDataSale = {
  saleDate: string
  id: number
  name: string
  totalAmount: number
  discount: number
  products: TValueProductData[]
  saleMakedBy: string
}

export type TCancelSale = {
  saleId: string
  reason: string
  returnCash: boolean
  returnStock: boolean
}
export type TSaleProduct = {
  productId: string
  price: number
  qty: number
  total: number
  product: TValueProductData
}

export type TProductOrderData = {
  branchProductId: string
  price: number
  productId: string
  qty: number
  total: number
}

export type TOrder = {
  addressId?: string
  branchId: string
  customerId: string
  discount: number
  deliveryMethod: DeliveryMethodEnum
  orderDetails?: string
  paymentMethod: PaymentMethodEnum
  pickUpInformation?: string
  products: TProductOrderData[]
  subTotal: number
  total: number
}

export type TaddressInfo = {
    id: string
    latitude: number
    longitude: number
    detail: string
  }

export type TCustomer = {
    id: string
    name: string
    lastName: string
    email?: string
    phone: string
    lastOrderDate: string
    ordersIds: string[]
    addressInfo: TaddressInfo[]
    addressesIds: string[]
}

export type TDistributor = {
  id?: string
  name: string
  nit?: string
  phone: string
  email?: string
  address: string
  socialReason?: string
  code: string
  ownerInformation: {
    name: string
    lastName?: string
    address?: string
    phone?: string
  }
}
