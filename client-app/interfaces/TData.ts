import { TValueProductData } from '@/components/atoms/modals/EditProductModal'
import { TValuesWarehouses } from '@/components/atoms/modals/EditWarehouseModal'

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
    id: any;
    name: string;
    code: string;
    city: string;
    direction: string;
    phone?: string | null | undefined;
    nit?: string | null | undefined;
    cashId?: any;
}

export type TProductBranchData = {
  id: string
  branchId: string
  productId: string
  price: number
  isVisibleOnMenu: boolean
  isVisibleOnWeb: boolean
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
