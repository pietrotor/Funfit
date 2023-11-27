import { CreateRoomInput, PaginationInput, UpdateRoomInput } from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IRoom } from '@/models/room.model'

export default abstract class RoomRepository<T> {
  abstract getRoomById(id: T, businessId: T): Promise<IRoom | OutErrorResponse>
  abstract getRoomByContractId(contractId: T, businessId: T): Promise<IRoom | OutErrorResponse>
  abstract getRoomsPaginated(paginationInput: PaginationInput): Promise<IPaginatedResponse<IRoom[]> | OutErrorResponse>
  abstract getRoomsByPropertiesIds(propertiesIds: T[], paginationInput: PaginationInput): Promise<IPaginatedResponse<IRoom[]> | OutErrorResponse>
  abstract createRoom(createRoomInput: CreateRoomInput, createdBy?: T): Promise<IRoom | OutErrorResponse>
  abstract updateRoom(updateRoomInput: UpdateRoomInput): Promise<IRoom | OutErrorResponse>
  abstract deleteRoom(id: T, busienssId: T, deletedBy?: T): Promise<IRoom | OutErrorResponse>
  // resolvers
  abstract getRoomResolver(id: T): Promise<IRoom | null>
}
