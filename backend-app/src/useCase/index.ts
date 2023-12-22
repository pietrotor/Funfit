import { StockUseCase } from './stock.useCase'
import { StockHistoryUseCase } from './stockHistory.useCase'

const stockUseCase = new StockUseCase()
const stockHistoryUseCase = new StockHistoryUseCase()

export { stockUseCase, stockHistoryUseCase }
