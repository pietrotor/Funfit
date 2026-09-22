import {
  BadgeDollarSign,
  Building2,
  ChartColumnBig,
  ChartLine,
  ClipboardList,
  Contact,
  Container,
  Handshake,
  LayoutGrid,
  type LucideIcon,
  Package,
  PackageCheck,
  ReceiptText,
  Scale,
  ShoppingCart,
  Store,
  Tags,
  TrendingDown,
  Truck,
  UserCog,
  Users,
  Wallet,
  Warehouse
} from 'lucide-react'

export const menuIcons = {
  operation: Store,
  pos: ShoppingCart,
  orders: ClipboardList,
  cashRegister: Wallet,
  dailySales: ReceiptText,
  expenses: TrendingDown,
  inventory: Warehouse,
  branches: Building2,
  warehouses: Container,
  catalog: LayoutGrid,
  products: Package,
  categories: Tags,
  distributors: Handshake,
  distributorsList: Contact,
  priceList: BadgeDollarSign,
  distributorsPos: Truck,
  distributorsSales: PackageCheck,
  reports: ChartColumnBig,
  salesReport: ChartLine,
  balance: Scale,
  team: Users,
  users: UserCog
}

export type TMenuIconName = keyof typeof menuIcons

export const getMenuIcon = (name?: TMenuIconName): LucideIcon | null =>
  name ? menuIcons[name] : null
