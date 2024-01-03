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

export type TDataBranch = {
    id: any;
    name: string;
    code: string;
    city: string;
    direction: string;
    phone?: string | null | undefined;
    nit?: string | null | undefined;
    cash?: {
      id: any;
    };
}
