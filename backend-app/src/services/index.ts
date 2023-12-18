import { UserService } from "./user.service";
import { RoleService } from "./role.service";
import { WarehouseService } from "./warehouse.service";
import { ProductService } from "./product.service";
import { ConfigurationService } from "./configuration.service";
import { StocksService } from "./stock.service";

export const configurationCore = new ConfigurationService();
export const userCore = new UserService();
export const roleCore = new RoleService();
export const productCore = new ProductService();
export const warehouseCore = new WarehouseService();
export const stockCore = new StocksService();
