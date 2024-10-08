import { UserService } from './user.service'
import { RoleService } from './role.service'
import { WarehouseService } from './warehouse.service'
import { ProductService } from './product.service'
import { ConfigurationService } from './configuration.service'
import { StocksService } from './stock.service'
import { StocksHistoryService } from './stockHistory.service'
import { BranchService } from './branch.service'
import { BranchProductService } from './branchProduct.service'
import { CashService } from './cash.service'
import { TurnService } from './turn.service'
import { TurnMovementService } from './turnMovement.service'
import { SalesService } from './sale.service'
import { CategoryService } from './category.service'
import { CustomerService } from './customer.service'
import { AddressService } from './address.service'
import { OrderService } from './order.service'
import { DistributorService } from './distributor.service'
import { PriceListService } from './priceList.service'
import { PriceService } from './price.service'
import { PaymentService } from './payment.service'
import { DistributorSaleService } from './distributorSale.service'
import { BillService } from './bill.service'

export const configurationCore = new ConfigurationService()
export const userCore = new UserService()
export const roleCore = new RoleService()
export const categoryCore = new CategoryService()
export const productCore = new ProductService()
export const warehouseCore = new WarehouseService()
export const stockCore = new StocksService()
export const stockHistoryCore = new StocksHistoryService()
export const branchCore = new BranchService()
export const branchProductCore = new BranchProductService()
export const cashCore = new CashService()
export const turnCore = new TurnService()
export const turnMovementCore = new TurnMovementService()
export const saleCore = new SalesService()
export const addressCore = new AddressService()
export const customerCore = new CustomerService()
export const orderCore = new OrderService()
export const distributorCore = new DistributorService()
export const priceListCore = new PriceListService()
export const priceCore = new PriceService()
export const paymentCore = new PaymentService()
export const distributorSaleCore = new DistributorSaleService()
export const billCore = new BillService()
