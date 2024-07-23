import {
  CancelSaleInput,
  CreateSaleInput,
  OrderStatusEnum,
  PaymentMethodEnum,
  SalesPaginationInput,
  SalesSummaryInput
} from '@/graphql/graphql_types'
import { SalesRepository } from '../repositories'
import { BadRequestError } from '@/lib/graphqlerrors'
import { saleUseCase } from 'useCase'
import {
  branchCore,
  branchProductCore,
  cashCore,
  orderCore,
  productCore,
  turnMovementCore
} from '.'
import { BranchProduct, ProductTypeEnum, TurnMovementTypeEnum } from '../models'
import Sale, { IModelSale, ISale } from '@/models/sales.model'
import { getInstancesPagination } from './generic.service'
import { addDays } from 'helpers'

export class SalesService extends SalesRepository<objectId> {
  async getSaleById(id: objectId) {
    const saleInstance = await Sale.findOne({
      _id: id,
      deleted: false
    })
    if (!saleInstance) throw new BadRequestError('No se encontro la venta')
    return saleInstance
  }

  async getSaleByIdInstance(id: objectId) {
    return await Sale.findOne({
      _id: id,
      deleted: false
    })
  }

  async getTotalSales(salesSummaryInput: SalesSummaryInput) {
    const { branchIds, endDate, initialDate, saleBy } = salesSummaryInput
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
    const branchesFilter =
      branchIds.length > 0
        ? {
            branchId: {
              $in: branchIds
            }
          }
        : {}
    const salesByFilter = saleBy ? { createdBy: saleBy } : {}

    const result = await Sale.aggregate([
      {
        $match: {
          canceled: false,
          ...dateFilter,
          ...branchesFilter,
          ...salesByFilter
        } // Aplica los a la consulta
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$total' }
        }
      }
    ])

    if (result.length === 0) {
      return 0
    }

    return result[0].total
  }

  async getSummaryByPaymentMethod(salesSummaryInput: SalesSummaryInput) {
    const { branchIds, endDate, initialDate, saleBy } = salesSummaryInput
    const initialDateQuery = initialDate ? new Date(initialDate) : null
    if (initialDateQuery) initialDateQuery.setHours(4, 0, 0, 0)
    const branchesFilter =
      branchIds.length > 0
        ? {
            branchId: {
              $in: branchIds
            }
          }
        : {}
    const salesByFilter = saleBy ? { createdBy: saleBy } : {}

    const result = await Sale.aggregate([
      {
        $addFields: {
          dateOnTz: {
            date: {
              $dayOfMonth: { date: '$createdAt', timezone: 'America/La_Paz' }
            },
            month: {
              $month: { date: '$createdAt', timezone: 'America/La_Paz' }
            },
            year: { $year: { date: '$createdAt', timezone: 'America/La_Paz' } }
          }
        }
      },
      {
        $addFields: {
          soldAtTz: {
            $dateFromParts: {
              year: '$dateOnTz.year',
              month: '$dateOnTz.month',
              day: '$dateOnTz.date'
            }
          }
        }
      },
      {
        $match: {
          canceled: false,
          soldAtTz: {
            $gte: new Date(initialDate),
            $lte: new Date(endDate)
          },
          ...branchesFilter,
          ...salesByFilter
        } // Aplica los a la consulta
      },
      {
        $group: {
          _id: '$paymentMethod', // Agrupa por método de pago
          total: { $sum: '$total' } // Calcula la suma del campo 'total' para cada grupo
        }
      },
      {
        $project: {
          method: '$_id', // Renombra '_id' como 'metodoPago'
          total: 1, // Incluye el campo 'total'
          _id: 0 // Excluye el campo '_id' del resultado final
        }
      }
    ])
    return result
  }

  async getSalesPaginated(salesPaginationInput: SalesPaginationInput) {
    const {
      filter,
      branchIds,
      endDate,
      initialDate,
      saleBy,
      ...paginationInput
    } = salesPaginationInput
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
    const branchesFilter =
      branchIds.length > 0
        ? {
            branchId: {
              $in: branchIds
            }
          }
        : {}
    const salesByFilter = saleBy ? { createdBy: saleBy } : {}
    if (filter) {
      const filterArgs = {
        $or: [{ code: { $regex: filter, $options: 'i' } }]
      }
      return await getInstancesPagination<ISale, IModelSale>(
        Sale,
        paginationInput,
        { ...branchesFilter, ...filterArgs, ...salesByFilter, ...dateFilter }
      )
    }
    const test = await getInstancesPagination<ISale, IModelSale>(
      Sale,
      paginationInput,
      { ...branchesFilter, ...salesByFilter, ...dateFilter }
    )
    return test
  }

  async createSale(createSaleInput: CreateSaleInput, createdBy?: objectId) {
    const {
      amountRecibed,
      branchId,
      change,
      date,
      discount,
      paymentMethod,
      products,
      total,
      client,
      subTotal,
      observations,
      orderId
    } = createSaleInput
    if (total < 0) throw new BadRequestError('El total no puede ser negativo')
    if (change < 0) throw new BadRequestError('El cambio no puede ser negativo')
    if (discount < 0) {
      throw new BadRequestError('El descuento no puede ser negativo')
    }
    if (amountRecibed - total !== change) {
      throw new BadRequestError('El vuelto de cambio no es correcto')
    }

    products.forEach(product => saleUseCase.validateSaleSubTotal(product))

    const isTotalOk = saleUseCase.validateSaleTotal(products, total, discount)
    if (!isTotalOk) throw new BadRequestError('El total no es correcto')

    if (subTotal - discount !== total) {
      throw new BadRequestError('El sub total no es correcto')
    }

    const branchInstance = await branchCore.getBranchById(branchId)

    const [cashInstance, isCashOpen, orderInstance] = await Promise.all([
      cashCore.getCashById(branchInstance.cashId),
      cashCore.isCashOpen(branchInstance.cashId),
      (async () => {
        if (orderId) return await orderCore.getOrderById(orderId)
        return null
      })()
    ])

    if (!isCashOpen) {
      throw new BadRequestError('La caja no se encuentra abierta')
    }

    const branchProductInstances = await Promise.all(
      products.map(async product => {
        const branchProductInstance =
          await branchProductCore.getBranchProductById(product.branchProductId)
        const productInstance = await productCore.getProductById(
          product.productId
        )
        if (productInstance.type === ProductTypeEnum.SIMPLE) {
          if (product.qty > branchProductInstance.stock) {
            throw new BadRequestError(
              'El stock de ' + productInstance.name + ' es menor al requerido'
            )
          }
        } else {
          for (const subProduct of productInstance.subProducts) {
            const subBranchProductInstance = await BranchProduct.findOne({
              deleted: false,
              branchId,
              productId: subProduct.productId
            }).populate('productId')
            if (!subBranchProductInstance) {
              throw new BadRequestError(
                'No se encontro un sub producto de un combo'
              )
            }
            if (
              subBranchProductInstance.stock <
              subProduct.stockRequirement * product.qty
            ) {
              throw new BadRequestError(
                `El stock de ${
                  (subBranchProductInstance.productId as any).name
                } es menor al requerido para el combo ${productInstance.name}`
              )
            }
          }
        }
        return branchProductInstance
      })
    )

    if (
      orderInstance?.orderStatus !== OrderStatusEnum.ACEPTED &&
      !!orderInstance
    ) {
      throw new BadRequestError('No se puede vender una orden no aceptada')
    }

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

    if (paymentMethod === PaymentMethodEnum.CASH) {
      await turnMovementCore.createMovement(
        {
          amount: total,
          cashId: cashInstance._id,
          date,
          turnId: cashInstance.currentTurnId!,
          concept: 'Venta realizada, código: ' + code,
          type: TurnMovementTypeEnum.ADD
        },
        createdBy
      )
    }

    await Promise.all(
      products.map(async product => {
        const branchProductInstance = branchProductInstances.find(
          branchProduct =>
            branchProduct._id.toString() === product.branchProductId.toString()
        )
        if (branchProductInstance) {
          const productInfo = await productCore.getProductById(
            branchProductInstance.productId
          )
          if (productInfo.type === ProductTypeEnum.SIMPLE) {
            branchProductInstance.stock -= product.qty
            await branchProductInstance.save()
          } else if (productInfo.type === ProductTypeEnum.COMBO) {
            for (const subProduct of productInfo.subProducts) {
              const subBranchProudctInstance = await BranchProduct.findOne({
                deleted: false,
                branchId,
                productId: subProduct.productId
              })
              if (subBranchProudctInstance) {
                subBranchProudctInstance.stock -=
                  subProduct.stockRequirement * product.qty
                await subBranchProudctInstance.save()
              }
            }
          }
        }
      })
    )

    const saleInstance = new Sale({
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
      orderInstance.orderStatus = OrderStatusEnum.SOLD
      await orderInstance.save()
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
