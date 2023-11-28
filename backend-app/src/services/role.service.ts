import { Types } from 'mongoose'

import { Role } from '../models/role.model'

export const getRoleByIdInstance = async (id: Types.ObjectId) => {
  const rolesFound = await Role.findById({
    _id: id,
    deleted: false
  })
  return rolesFound
}
