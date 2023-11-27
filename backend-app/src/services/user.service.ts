import jwt from 'jsonwebtoken'
import { BadRequestError } from '../lib/graphqlerrors'
import { PaginationInput, UpdateUserInput, UserInput } from '../graphql/graphql_types'
import User, { IModelUser, IUser } from '../models/user.model'
import { Password } from '../lib/encrypt'
import { Types } from 'mongoose'
import { updateGenericInstance } from '../lib/updateInstance'
import { getRoleByIdInstance } from './role.service'
import UserRepository from '@/repositories/user.repository'
import { getInstancesPagination } from './generic.service'

export const getUserByIdInstance = async (id: objectId, businessId: objectId) => {
  const user = await User.findOne({
    _id: id,
    businessId,
    deleted: false
  })
  if (!user) throw new BadRequestError('El usuario no se encontro')
  return user
}
export const getUserByIdResolver = async (id: objectId) => {
  const user = await User.findOne({
    _id: id,
    deleted: false
  })
  return user
}
export const searchUserByEmail = async (email: string) => {
  const user = await User.findOne({
    deleted: false,
    email
  })
  return user
}
export const validatePassowrdAndGenerateJWT = async (password: string, user: IUser) => {
  const passwordsMatch = await Password.compare(user.password, password)
  if (!passwordsMatch) {
    throw new BadRequestError('malos credenciales')
  }
  const userJwt = jwt.sign({
    id: user._id,
    email: user.email,
    name: user.name + ' ' + user.lastName
  }, process.env.JWT_KEY!)
  console.log('jwt', userJwt)
  console.log('------------------------------------------------------')

  return userJwt
}

export const createUserInstance = async (userInput: UserInput) => {
  // Validate branchId (TODO)
  const existingUser = await User.findOne({
    deleted: false,
    email: userInput.email
  })
  if (existingUser) {
    throw new BadRequestError(`El usuario con el email ${userInput.email} ya esta registrado`)
  }
  const passHashed = await Password.toHash(userInput.password)

  const newUser = new User({
    ...userInput,
    password: passHashed
  })
  return newUser.save()
}

export const deleteUser = async (userId: Types.ObjectId, businessId: objectId, userWhoDeleteIt?: Types.ObjectId) => {
  const user = await User.findOne({
    _id: userId,
    businessId,
    deleted: false
  })
  if (!user) throw new BadRequestError('No existe el usuario')
  user.deleted = true
  user.deletedAt = new Date()
  // Add who deleted the user (userWhoDeleteIt)
  await user.save()
  return user
}
export const updateUserInstance = async (userInstance: IUser, updateUserInput: UpdateUserInput) => {
  const { email, password, roleId } = updateUserInput
  const excludedProperties = [
    'email',
    'password',
    'roleId'
  ]
  updateGenericInstance(userInstance, updateUserInput, excludedProperties)
  if (email) {
    const user = await User.findOne({
      email,
      deleted: false
    })
    if (user && user.id.toString() !== userInstance.id.toString()) throw new BadRequestError('El email ya esta en uso')
    userInstance.email = email
  }
  if (password) userInstance.password = await Password.toHash(password)
  if (roleId) {
    const role = await getRoleByIdInstance(roleId)
    if (!role) throw new BadRequestError('No existe el rol')
    userInstance.roleId = roleId
  }
  await userInstance.save()
  return userInstance
}

// -------------------------- CAMBIO
export class UserService extends UserRepository<objectId> {
  async getUserById (id: objectId) {
    const user = await User.findOne({
      _id: id,
      deleted: false
    })
    if (!user) throw new BadRequestError('Usuario no encontrado')
    return user
  }

  async getUsersPaginated (paginationInput: PaginationInput) {
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } }
        ]
      }
      return await getInstancesPagination<IUser, IModelUser>(User, paginationInput, filterArgs)
    }
    return await getInstancesPagination<IUser, IModelUser>(User, paginationInput)
  }

  async createUser (userInput: UserInput, createdBy?: objectId) {
    const existingUser = await User.findOne({
      deleted: false,
      email: userInput.email
    })
    if (existingUser) {
      throw new BadRequestError(`El usuario con el email ${userInput.email} ya esta registrado`)
    }
    const passHashed = await Password.toHash(userInput.password)

    const newUser = new User({
      ...userInput,
      password: passHashed,
      createdBy
    })
    return newUser.save()
  }

  async updateUser (updateUserInput: UpdateUserInput) {
    const { id, email, password, roleId } = updateUserInput
    const excludedProperties = [
      'email',
      'password',
      'roleId'
    ]
    const userInstance = await User.findOne({
      _id: id,
      deleted: false
    })
    if (!userInstance) throw new BadRequestError('No se encontro la oficina')
    updateGenericInstance(userInstance, updateUserInput, excludedProperties)
    if (email) {
      const user = await User.findOne({
        email,
        deleted: false
      })
      if (user && user.id.toString() !== userInstance.id.toString()) throw new BadRequestError('El email ya esta en uso')
      userInstance.email = email
    }
    if (password) userInstance.password = await Password.toHash(password)
    if (roleId) {
      const role = await getRoleByIdInstance(roleId)
      if (!role) throw new BadRequestError('No existe el rol')
      userInstance.roleId = roleId
    }
    await userInstance.save()
    return userInstance
  }

  async deleteProperty (id: objectId, businessId: objectId, deletedBy?: objectId) {
    await businessCore.getBusinessByIdFieldResolver(businessId)
    const propertyInstance = await Property.findOne({
      _id: id,
      businessId,
      deleted: false
    })
    if (!propertyInstance) throw new BadRequestError('No se encontro la unidad')
    propertyInstance.deleted = true
    propertyInstance.deletedAt = new Date()
    propertyInstance.deletedBy = deletedBy
    return await propertyInstance.save()
  }

  async getPropertyByIdInstance (id: objectId, businessId: objectId) {
    const propertyInstance = await Property.findOne({
      _id: id,
      businessId,
      deleted: false
    })
    return propertyInstance
  }

  async getPropertyInstanceByOnlyById (id: objectId) {
    const propertyInstance = await Property.findOne({
      _id: id,
      deleted: false
    })
    return propertyInstance
  }
}
