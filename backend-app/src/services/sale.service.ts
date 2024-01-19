import {
  CreateSaleInput,
  PaymentMethodEnum,
  SalesPaginationInput
} from '@/graphql/graphql_types'
import { SalesRepository } from '../repositories'
import { BadRequestError } from '@/lib/graphqlerrors'
import { saleUseCase } from 'useCase'
import { branchCore, cashCore, productCore, turnMovementCore } from '.'
import { TurnMovementTypeEnum } from '../models'
import Sale, { IModelSale, ISale } from '@/models/sales.model'
import { getInstancesPagination } from './generic.service'

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

  async getSalesPaginated(salesPaginationInput: SalesPaginationInput) {
    const {
      filter,
      branchIds,
      endDate,
      initialDate,
      saleBy,
      ...paginationInput
    } = salesPaginationInput
    const branchesFilter =
      branchIds.length > 0
        ? {
            branchId: {
              $in: branchIds
            }
          }
        : {}
    if (filter) {
      const filterArgs = {
        $or: [{ name: { $regex: filter, $options: 'i' } }]
      }
      return await getInstancesPagination<ISale, IModelSale>(
        Sale,
        paginationInput,
        { ...branchesFilter, ...filterArgs }
      )
    }
    return await getInstancesPagination<ISale, IModelSale>(
      Sale,
      paginationInput,
      branchesFilter
    )
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
      observations
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

    await Promise.all(
      products.map(async product => {
        return await productCore.getProductById(product.productId)
      })
    )

    const branchInstance = await branchCore.getBranchById(branchId)

    const [cashInstance, isCashOpen] = await Promise.all([
      cashCore.getCashById(branchInstance.cashId),
      cashCore.isCashOpen(branchInstance.cashId)
    ])

    if (!isCashOpen) {
      throw new BadRequestError('La caja no se encuentra abierta')
    }

    if (paymentMethod === PaymentMethodEnum.CASH) {
      turnMovementCore.createMovement(
        {
          amount: total,
          cashId: cashInstance._id,
          date,
          turnId: cashInstance.currentTurnId!,
          concept: 'Venta realizada',
          type: TurnMovementTypeEnum.ADD
        },
        createdBy
      )
    }
    function generateCode(): string {
      const characters: string =
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
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

    return await saleInstance.save()
  }
}
