import { Contract, ContractPaginationInput, CreateContractInput, UpdateContractInput } from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'

export default abstract class ContractRepository<T> {
  abstract getContractById(id: T, objectId: T): Promise<Contract | OutErrorResponse>
  abstract getContractsByRoomId(contractPaginationInput: ContractPaginationInput): Promise<IPaginatedResponse<Contract> | OutErrorResponse>
  abstract createContract(createContractInput: CreateContractInput): Promise<Contract | OutErrorResponse>
  abstract updateContract(updateContractInput: UpdateContractInput): Promise<Contract | OutErrorResponse>
  abstract deleteContract(id: T, businessId: T, deletedBy?: T): Promise<Contract | OutErrorResponse>
}
