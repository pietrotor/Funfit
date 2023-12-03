import { Document, Model, Types } from 'mongoose'
import { BadRequestError } from '../lib/graphqlerrors'
import { PaginationInput, StatusEnum } from '@/graphql/graphql_types'

export const getInstancesPagination = async <S extends Document, T extends Model<S>>(db: T, paginationInput: PaginationInput, args?: object) => {
  const rows = paginationInput.rows || 20
  const page = paginationInput.page || 1
  const searchArgs = {
    deleted: false,
    ...args || {}
  }
  const totalDocuments = await db.find(searchArgs).countDocuments() // Get the total number of documents
  const totalPages = Math.ceil(totalDocuments / rows) // Get the total of pages that can have according to the rows
  if (totalPages === 0) {
    return {
      status: StatusEnum.OK,
      data: [],
      message: 'Registros encontrados',
      totalRecords: totalDocuments,
      totalPages,
      rows,
      currentPage: page
    }
  }
  if (page > totalPages) {
    return {
      status: StatusEnum.ERROR,
      data: [],
      message: 'La página solicitada sobrepasa el número total de páginas',
      totalRecords: totalDocuments,
      totalPages,
      rows,
      currentPage: page
    }
  }
  if (page === 1) {
    const documents = await db.find(searchArgs).sort({ _id: -1 }).limit(rows)
    return {
      status: StatusEnum.OK,
      data: documents,
      message: 'Registros encontrados',
      totalRecords: totalDocuments,
      totalPages,
      rows,
      currentPage: page
    }
  }
  const skipPages = (page - 1) * rows
  const documents = await db.find(searchArgs).sort({ _id: -1 }).skip(skipPages).limit(rows)
  return {
    status: StatusEnum.OK,
    data: documents,
    message: 'Registros encontrados',
    totalRecords: totalDocuments,
    totalPages,
    rows,
    currentPage: page
  }
}
export const getInstanceById = async <S extends Document, T extends Model<S>>(db: T, id: Types.ObjectId, errorMesage: string) => {
  const instance = await db.findOne({
    _id: id,
    deleted: false
  })
  // Verify instance
  if (!instance) throw new BadRequestError(errorMesage)
  return instance
}
