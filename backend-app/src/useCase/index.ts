import { SalesUseCase } from './sales'
import { StockUseCase } from './stock.useCase'
import { StockHistoryUseCase } from './stockHistory.useCase'

const stockUseCase = new StockUseCase()
const stockHistoryUseCase = new StockHistoryUseCase()
const saleUseCase = new SalesUseCase()

export { stockUseCase, stockHistoryUseCase, saleUseCase }
