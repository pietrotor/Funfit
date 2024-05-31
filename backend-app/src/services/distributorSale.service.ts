import {
  CancelSaleInput,
  CreateDistributorSaleInput,
  DistributorSalePaginationInput,
  StockMovementTypeEnum
} from '@/graphql/graphql_types'
import { DistributorSaleRepository } from '../repositories'
import { BadRequestError } from '@/lib/graphqlerrors'
import { distributorSaleUseCase } from 'useCase'
import {
  branchCore,
  branchProductCore,
  cashCore,
  customerCore,
  priceListCore,
  productCore,
  stockCore,
  turnMovementCore,
  warehouseCore
} from '.'
import {
  DistributorSale,
  IDistributorSale,
  IModelDistributorSale,
  TurnMovementTypeEnum
} from '../models'
import { getInstancesPagination } from './generic.service'
import { addDays } from 'helpers'
import Decimal from 'decimal.js'

export class SalesService extends DistributorSaleRepository<objectId> {
  async getDistributorSaleById(id: objectId) {
    const distributorSaleInstance = await DistributorSale.findOne({
      _id: id,
      deleted: false
    })
    if (!distributorSaleInstance) {
      throw new BadRequestError('No se encontro la venta a distribuidor')
    }
    return distributorSaleInstance
  }

  async getDistributorSaleByIdInstance(id: objectId) {
    return await DistributorSale.findOne({
      _id: id,
      deleted: false
    })
  }

  async getSalesPaginated(
    distributorSalePaginationInput: DistributorSalePaginationInput
  ) {
    const {
      filter,
      endDate,
      initialDate,
      saleBy,
      customerIds,
      ...paginationInput
    } = distributorSalePaginationInput
    const initialDateQuery = initialDate ? new Date(initialDate) : null
    if (initialDateQuery) initialDateQuery.setHours(4, 0, 0, 0)
    const dateFilter =
      initialDateQuery && endDate
        ? {
            createdAt: {
              $gte: initialDateQuery,
              $lt: addDays(new Date(endDate), 1)
            }
          }
        : {}
    const customerFilter =
      (customerIds || [])?.length > 0
        ? {
            customerId: {
              $in: customerIds
            }
          }
        : {}
    const salesByFilter = saleBy ? { createdBy: saleBy } : {}
    if (filter) {
      const filterArgs = {
        $or: [{ code: { $regex: filter, $options: 'i' } }]
      }
      return await getInstancesPagination<
        IDistributorSale,
        IModelDistributorSale
      >(DistributorSale, paginationInput, {
        ...customerFilter,
        ...filterArgs,
        ...salesByFilter,
        ...dateFilter
      })
    }
    return await getInstancesPagination<
      IDistributorSale,
      IModelDistributorSale
    >(DistributorSale, paginationInput, {
      ...customerFilter,
      ...salesByFilter,
      ...dateFilter
    })
  }

  async createSale(
    createSaleInput: CreateDistributorSaleInput,
    createdBy?: objectId
  ) {
    const {
      date,
      discount,
      paymentMethod,
      products,
      total,
      subTotal,
      observations,
      customerId,
      balance,
      priceListId,
      warehouseId,
      totalPaid
    } = createSaleInput
    if (total < 0) throw new BadRequestError('El total no puede ser negativo')
    if (discount < 0) {
      throw new BadRequestError('El descuento no puede ser negativo')
    }
    if (
      new Decimal(total).minus(totalPaid).toNumber() !==
      new Decimal(balance).toNumber()
    ) {
      throw new BadRequestError('El saldo de la venta no es correcta')
    }
    if (
      new Decimal(total).minus(balance).toNumber() !==
      new Decimal(totalPaid).toNumber()
    ) {
      throw new BadRequestError('El monto pagado en efectivo no es correcto')
    }

    products.forEach(product =>
      distributorSaleUseCase.validateSaleSubTotal(product)
    )

    const isTotalOk = distributorSaleUseCase.validateSaleTotal(
      products,
      total,
      discount
    )
    if (!isTotalOk) throw new BadRequestError('El total no es correcto')

    if (subTotal - discount !== total) {
      throw new BadRequestError('El sub total no es correcto')
    }

    const [customerInstance] = await Promise.all([
      customerCore.getCustomerById(customerId),
      priceListCore.getPriceListById(priceListId),
      warehouseCore.getWarehouseById(warehouseId)
    ])

    const stockProductsInstance = await Promise.all(
      products.map(async product => {
        const stockInstance = await stockCore.getStockById(product.stockId)
        if (product.qty > stockInstance.quantity) {
          const productInstance = await productCore.getProductById(
            product.productId
          )
          throw new BadRequestError(
            'El stock de ' + productInstance.name + ' es menor al requerido'
          )
        }
        return stockInstance
      })
    )

    function generateCode(): string {
      const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let code: string = ''

      for (let i = 0; i < 5; i++) {
        const randomIndex: number = Math.floor(
          Math.random() * characters.length
        )
        code += characters.charAt(randomIndex)
      }

      return code
    }
    const code = generateCode()

    await Promise.all(
      products.map(async product => {
        const productStockInstance = stockProductsInstance.find(
          stockInstance =>
            stockInstance._id.toString() === product.stockId.toString()
        )
        if (productStockInstance) {
          await stockCore.createStockMovement(
            {
              date: new Date(),
              quantity: product.qty,
              stockId: product.stockId,
              type: StockMovementTypeEnum.INWARD,
              detail: `Venta a empresa: ${customerInstance.name}, con código de venta: ${code}`
            },
            createdBy
          )
        }
      })
    )

    const saleInstance = new DistributorSale({
      branchId,
      products,
      paymentMethod,
      total,
      discount,
      date,
      subTotal,
      code,
      client,
      amountRecibed,
      change,
      observations,
      canceled: false,
      createdBy
    })
    if (orderInstance) {
      orderInstance.isSold = true
      orderInstance.saleId = saleInstance._id
      await saleInstance.save()
    }
    return await saleInstance.save()
  }

  async cancelSale(cancelSaleInput: CancelSaleInput, cancelBy?: objectId) {
    const { id, reason, cashBack, stockReturn } = cancelSaleInput
    const saleInstance = await this.getSaleById(id)
    const branchInstance = await branchCore.getBranchById(saleInstance.branchId)
    const cashInstance = await cashCore.getCashById(branchInstance.cashId)
    if (!cashInstance.currentTurnId || !cashInstance.isOpen) {
      throw new BadRequestError(
        'La caja no se encuentra abierta para poder cancelar una venta'
      )
    }
    saleInstance.reason = reason
    saleInstance.canceled = true
    saleInstance.canceledAt = new Date()
    saleInstance.canceledBy = cancelBy
    if (cashBack) {
      await turnMovementCore.createMovement(
        {
          amount: saleInstance.total,
          cashId: branchInstance.cashId,
          date: new Date(),
          turnId: cashInstance.currentTurnId,
          concept: reason,
          type: TurnMovementTypeEnum.WITHDRAW
        },
        cancelBy
      )
    }
    if (stockReturn) {
      await Promise.all(
        saleInstance.products.map(async ({ branchProductId, qty }) => {
          try {
            const branchProductInstance =
              await branchProductCore.getBranchProductById(branchProductId)
            branchProductInstance.stock += qty
            await branchProductInstance.save()
          } catch (error) {
            console.log('🚀 ~ SalesService ~ awaitPromise.all ~ error:', error)
          }
        })
      )
    }
    const [saleUpdated] = await Promise.all([
      saleInstance.save(),
      branchInstance.save()
    ])
    return saleUpdated
  }
}
