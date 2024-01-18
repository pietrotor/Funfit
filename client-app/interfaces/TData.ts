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
      cash: {
      id: string;
      branchId:string;
      amount : number;
      currentTurnId : string;
      isOpen : boolean;
      currentTurn: {
        id : string;
        cashId : string;
        isOpen : boolean;
        openInfo: {
          amount : number;
          physicialAmount : number;
          difference : number;
          date : string;
          observation : string;
          openBy : string;
          openByInfo : {
            id : string;
            name : string;
            lastName : string;
            email : string;
            phone : string;
            lastLogin : string;
            status : string;
            createdBy : string;
            roleId : string;
            roleInfo: {
              id : string;
              name : string;
              code : string;
              status : string;
            }
          }
        }
        closeInfo: {
          amount : number;
          physicialAmount : number;
          difference : number;
          date : string;
          observation : string;
          closeBy : string;
          closeByInfo: {
            id : string;
            name : string;
            lastName : string;
            email : string;
            phone : string;
            lastLogin : string;
            status : string;
            createdBy : string;
            roleId : string;
            roleInfo :{
              id : string;
              name : string;
              code : string;
              status : string;
            }
          }
        }
      }
    }
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
  total?: number
}
