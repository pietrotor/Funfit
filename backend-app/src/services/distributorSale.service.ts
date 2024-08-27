import {
  CreateDistributorSaleInput,
  DistributorSalePaginationInput,
  DistributorSalePaymentMethod,
  DistributorSaleProduct,
  StockMovementTypeEnum
} from '@/graphql/graphql_types'
import { DistributorSaleRepository } from '../repositories'
import { BadRequestError } from '@/lib/graphqlerrors'
import { distributorSaleUseCase } from 'useCase'
import {
  distributorCore,
  paymentCore,
  priceListCore,
  productCore,
  stockCore,
  warehouseCore
} from '.'
import {
  DistributorSale,
  IDistributorSale,
  IModelDistributorSale,
  Price
} from '../models'
import { getInstancesPagination } from './generic.service'
import { addDays } from 'helpers'
import Decimal from 'decimal.js'
import { AddDistributorSalePayment } from 'dtos'
import Stock from '@/models/stock.model'

export class DistributorSaleService extends DistributorSaleRepository<objectId> {
  async getDistributorSalesProducts(
    warehouseId: objectId,
    priceListId: objectId
  ) {
    await Promise.all([
      warehouseCore.getWarehouseById(warehouseId),
      priceListCore.getPriceListById(priceListId)
    ])

    const [productsOnStock, priceProducts] = await Promise.all([
      Stock.find({
        deleted: false,
        warehouseId
      }),
      Price.find({
        deleted: false,
        priceListId
      })
    ])
    const products: DistributorSaleProduct[] = []
    productsOnStock.forEach(({ productId, warehouseId, _id, quantity }) => {
      const existsProduct = priceProducts.find(
        priceProduct =>
          priceProduct.productId.toString() === productId.toString()
      )
      if (existsProduct) {
        products.push({
          warehouseId,
          stockId: _id,
          productId,
          priceListId: existsProduct.priceListId,
          priceId: existsProduct._id,
          price: existsProduct.price,
          stock: quantity
        })
      }
    })
    return products
  }

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

  async getDistributorSalesPaginated(
    distributorSalePaginationInput: DistributorSalePaginationInput
  ) {
    const {
      filter,
      endDate,
      initialDate,
      saleBy,
      distributorsIds,
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
      (distributorsIds || [])?.length > 0
        ? {
            distributorId: {
              $in: distributorsIds
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

  async createDistributorSale(
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
      distributorId,
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

    if (new Decimal(subTotal).minus(discount).toNumber() !== total) {
      throw new BadRequestError('El sub total no es correcto')
    }

    const isPaid = balance === 0

    const [distributorInstance] = await Promise.all([
      distributorCore.getDistributorById(distributorId),
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
              type: StockMovementTypeEnum.OUTWARD,
              detail: `Venta a empresa: ${distributorInstance.name}, con código de venta: ${code}`
            },
            createdBy
          )
        }
      })
    )

    const saleDistributorInstance = new DistributorSale({
      products,
      paymentMethod,
      total,
      discount,
      date,
      subTotal,
      code,
      observations,
      canceled: false,
      createdBy,
      distributorId,
      warehouseId,
      balance,
      totalPaid,
      priceListId,
      paid: isPaid
    })
    if (
      paymentMethod !== DistributorSalePaymentMethod.CREDIT &&
      totalPaid !== 0
    ) {
      await paymentCore.createPayment(
        {
          amount: totalPaid,
          distributorId,
          date,
          distributorSaleId: saleDistributorInstance._id,
          observation: `pago por venta con código: ${code}.`,
          balance,
          totalPaid
        },
        false,
        createdBy
      )
    }
    return await saleDistributorInstance.save()
  }

  async addDistributorSalePayment(
    addDistributorSalePayment: AddDistributorSalePayment
  ) {
    const { amount, id } = addDistributorSalePayment
    const distributorSaleInstance = await this.getDistributorSaleById(id)
    const { balance, totalPaid } = distributorSaleInstance
    if (amount <= 0) throw new BadRequestError('El pago debe ser mayor a 0 Bs')
    if (amount > balance) {
      throw new BadRequestError('El pago no puede ser mayor al saldo pendiente')
    }

    const newBalance = new Decimal(balance).minus(amount).toNumber()
    const newTotalPaid = new Decimal(totalPaid).add(amount).toNumber()

    distributorSaleInstance.balance = newBalance
    distributorSaleInstance.totalPaid = newTotalPaid
    if (newBalance === 0) distributorSaleInstance.paid = true

    return await distributorSaleInstance.save()
  }

  async getTotalSaled(
    distributorSalePaginationInput: DistributorSalePaginationInput
  ) {
    const { endDate, initialDate, saleBy, distributorsIds } =
      distributorSalePaginationInput
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
    const distributorFilter =
      (distributorsIds || [])?.length > 0
        ? {
            distributorId: {
              $in: distributorsIds
            }
          }
        : {}
    const salesByFilter = saleBy ? { createdBy: saleBy } : {}
    const [total, totalPaid, balance] = await Promise.all([
      DistributorSale.aggregate([
        {
          $match: {
            canceled: false,
            ...dateFilter,
            ...distributorFilter,
            ...salesByFilter
          } // Aplica los a la consulta
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$total' }
          }
        }
      ]),
      DistributorSale.aggregate([
        {
          $match: {
            canceled: false,
            ...dateFilter,
            ...distributorFilter,
            ...salesByFilter
          } // Aplica los a la consulta
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$totalPaid' }
          }
        }
      ]),
      DistributorSale.aggregate([
        {
          $match: {
            canceled: false,
            ...dateFilter,
            ...distributorFilter,
            ...salesByFilter
          } // Aplica los a la consulta
        },
        {
          $group: {
            _id: null,
            total: { $sum: '$balance' }
          }
        }
      ])
    ])

    console.log(total, totalPaid, balance)

    return {
      total: total[0]?.total || 0,
      totalPaid: totalPaid[0]?.total || 0,
      balance: balance[0]?.total || 0
    }
  }
}
