import { BadRequestError } from '@/lib/graphqlerrors'
import { Bill, IBill, IModelBill } from '../models'
import { BillRepository } from '../repositories'
import { BillPaginationInput, CreateBillInput } from '@/graphql/graphql_types'
import { addDays } from 'helpers'
import { getInstancesPagination } from './generic.service'
import { BusinessBalanceDto } from 'dtos'

export class BillService extends BillRepository<objectId> {
  async getBills(billPaginationInput: BillPaginationInput) {
    const { filter, endDate, initialDate, branchId, ...paginationInput } =
      billPaginationInput
    const initialDateQuery = initialDate ? new Date(initialDate) : null
    if (initialDateQuery) initialDateQuery.setHours(4, 0, 0, 0)
    // The range applies to the accounting date of the bill, same as the
    // expenses summary, not to the date it was registered.
    const dateFilter =
      initialDateQuery && endDate
        ? {
            date: {
              $gte: initialDateQuery,
              $lt: addDays(new Date(endDate), 1)
            }
          }
        : {}
    const branchFilter = branchId ? { branchId } : {}
    if (filter) {
      const filterArgs = {
        $or: [{ title: { $regex: filter, $options: 'i' } }]
      }
      return await getInstancesPagination<IBill, IModelBill>(
        Bill,
        paginationInput,
        { ...filterArgs, ...dateFilter, ...branchFilter }
      )
    }
    return await getInstancesPagination<IBill, IModelBill>(
      Bill,
      paginationInput,
      { ...dateFilter, ...branchFilter }
    )
  }

  async getBillById(id: objectId) {
    const billInstance = await Bill.findOne({
      _id: id,
      deleted: false
    })
    if (!billInstance) {
      throw new BadRequestError('No se encontro la sucursal')
    }
    return billInstance
  }

  async getBillByIdInstance(id: objectId) {
    return await Bill.findOne({
      _id: id,
      deleted: false
    })
  }

  async createBill(createBillInput: CreateBillInput, createdBy?: objectId) {
    const { amount, date, branchId } = createBillInput
    if (!branchId) throw new BadRequestError('Debe seleccionar una sucursal')
    if (amount < 0) throw new BadRequestError('El monto no puede ser negativo')
    const billInstance = new Bill({
      ...createBillInput,
      date: new Date(new Date(date).getTime() + 6 * 60 * 60 * 1000),
      createdBy
    })
    return await billInstance.save()
  }

  async deleteBill(id: objectId, deltedBy: objectId | undefined) {
    const billInstance = await this.getBillById(id)
    billInstance.deleted = true
    billInstance.deletedAt = new Date()
    billInstance.deletedBy = deltedBy || undefined

    return await billInstance.save()
  }

  async getTotalBills(businessBalanceDto: BusinessBalanceDto) {
    const { endDate, initialDate, branchId } = businessBalanceDto
    const initialDateQuery = initialDate ? new Date(initialDate) : null
    if (initialDateQuery) initialDateQuery.setHours(4, 0, 0, 0)
    const dateFilter =
      initialDateQuery && endDate
        ? {
            date: {
              $gte: initialDateQuery,
              $lt: addDays(new Date(endDate), 1)
            }
          }
        : {}

    const result = await Bill.aggregate([
      {
        $match: {
          deleted: false,
          ...dateFilter,
          ...(branchId ? { branchId } : {})
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: '$amount' }
        }
      }
    ])

    if (result.length === 0) {
      return 0
    }

    return result[0].total
  }

  async getBillsByBranch(businessBalanceDto: BusinessBalanceDto) {
    const { endDate, initialDate, branchId } = businessBalanceDto
    const initialDateQuery = initialDate ? new Date(initialDate) : null
    if (initialDateQuery) initialDateQuery.setHours(4, 0, 0, 0)
    const dateFilter =
      initialDateQuery && endDate
        ? {
            date: {
              $gte: initialDateQuery,
              $lt: addDays(new Date(endDate), 1)
            }
          }
        : {}

    const result = await Bill.aggregate([
      {
        $match: {
          deleted: false,
          ...dateFilter,
          ...(branchId ? { branchId } : {})
        }
      },
      {
        $group: {
          _id: '$branchId',
          total: { $sum: '$amount' }
        }
      }
    ])

    return result.map(item => ({
      branchId: item._id || null,
      total: item.total
    }))
  }
}
