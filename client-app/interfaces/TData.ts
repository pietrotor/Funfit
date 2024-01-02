import { TValueProductData } from '@/components/atoms/modals/EditProductModal'
import { TValuesWarehouses } from '@/components/atoms/modals/EditWarehouseModal'

export type TStockData = {
    id: string;
    productId: any;
    warehouseId: any;
    quantity: number;
    securityStock?: number | null | undefined;
    lastStockEntry: number;
    units: string;
    product?: TValueProductData
    warehouse?: TValuesWarehouses
}

export type TStockDataBranch = {
    id : string;
    name: string;
    code: string;
    city: string;
    address: string;
    telephone?: string;
    nit?: string;
}
