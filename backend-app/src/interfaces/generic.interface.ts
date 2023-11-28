import { StatusEnum } from '@/graphql/graphql_types'
import { Types } from 'mongoose'

export default interface IGeneric {
  status: boolean,
  createdBy: Types.ObjectId;
  deleted: boolean;
  deletedAt?: Date;
  deletedBy?: Types.ObjectId;
  createdAt: Date;
}

export interface IPaginatedResponse<T> {
  status: StatusEnum
  message?: string
  data?: T[]
  rows?: number
  totalPages?: number
  totalRecords?: number
  currentPage?: number
}
