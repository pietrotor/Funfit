import {
  StatusEnum,
  BillResponse,
  BillPaginationInput,
  BillsResponse,
  CreateBillInput,
  Bill,
  User,
  BillSummaryInput,
  BillSummaryResponse
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { billCore, userCore } from '@/services/index'

// ========================================== Queries ====================================================
const getBills = async (
  _: any,
  args: { billPaginationInput: BillPaginationInput },
  context: ContextGraphQl
): Promise<BillsResponse> => {
  try {
    const { billPaginationInput } = args
    return await billCore.getBills(billPaginationInput)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getBill = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<BillResponse> => {
  try {
    const { id } = args
    const data = await billCore.getBillById(id)
    return {
      status: StatusEnum.OK,
      message: 'Cuenta encontrada',
      data
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getBillSummary = async (
  _: any,
  args: { billSummaryInput: BillSummaryInput },
  context: ContextGraphQl
): Promise<BillSummaryResponse> => {
  try {
    const { billSummaryInput } = args
    const data = await billCore.getTotalBills(billSummaryInput)
    return {
      status: StatusEnum.OK,
      message: 'Total calculado',
      data
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createBill = async (
  _: any,
  args: { createBillInput: CreateBillInput },
  context: ContextGraphQl
): Promise<BillResponse> => {
  try {
    const { createBillInput } = args
    const branchInstance = await billCore.createBill(
      createBillInput,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Cuenta creada correctamente',
      data: branchInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

const deleteBill = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<BillResponse> => {
  try {
    const { id } = args
    const branchInstance = await billCore.deleteBill(
      id,
      context.req.currentUser?.id
    )
    return {
      status: StatusEnum.OK,
      message: 'Cuenta eliminada correactamente',
      data: branchInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const billQuery = {
  getBills,
  getBill,
  getBillSummary
}
export const billMutation = {
  createBill,
  deleteBill
}

export const billType = {
  Bill: {
    async createdByInfo(parent: Bill, _: any, __: any): Promise<User | null> {
      if (parent.createdBy) {
        return await userCore.getUserByIdInstance(parent.createdBy)
      }
      return null
    }
  }
}
