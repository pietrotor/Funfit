import { LoginInput, Response, StatusEnum, UpdateUserInput, UserResponse, UsersResponse, Role, User as UserType, LoginResponse, UserInput, PaginationInput } from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { BadRequestError, errorHandler } from '@/lib/graphqlerrors'
import User, { IModelUser, IUser } from '@/models/user.model'
import { getInstanceById, getInstancesPagination } from '@/services/generic.service'
import { getRoleByIdInstance } from '@/services/role.service'
import { createUserInstance, getUserByIdInstance, searchUserByEmail, updateUserInstance, validatePassowrdAndGenerateJWT } from '@/services/user.service'

// Querys
const login = async (parent: any, args: { loginInput: LoginInput }, context: ContextGraphQl): Promise<LoginResponse> => {
  try {
    const { loginInput: { email, password } } = args
    const user = await searchUserByEmail(email)
    if (!user) {
      throw new BadRequestError('El usuario no existe')
    }
    const userJwt = await validatePassowrdAndGenerateJWT(password, user)
    user.lastLogin = new Date()
    await user.save()
    return {
      status: StatusEnum.OK,
      message: 'usuario logueado, redireccionando...',
      token: userJwt
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const currentUser = async (parent: any, __: any, context: ContextGraphQl): Promise<UserResponse> => {
  if (!context.req.currentUser) {
    return {
      status: StatusEnum.ERROR,
      message: 'usuario no encontrado',
      data: null
    }
  }
  const userInstance = await User.findOne({ _id: context.req?.currentUser?.id })
  if (!userInstance) {
    return {
      status: StatusEnum.ERROR,
      message: 'usuario no encontrado'
    }
  }
  return {
    status: StatusEnum.OK,
    message: 'usuario encontrado',
    data: userInstance
  }
}
const getUsers = async (parent: any, args: { paginationInput: PaginationInput }, context: ContextGraphQl): Promise<UsersResponse> => {
  try {
    const { paginationInput } = args
    const users = await getInstancesPagination<IUser, IModelUser>(User, paginationInput)
    return users
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getUserById = async (parent: any, args: { id: objectId, businessId: objectId }, context: ContextGraphQl): Promise<UserResponse> => {
  try {
    const { id, businessId } = args
    const user = await getUserByIdInstance(id, businessId)
    return {
      status: StatusEnum.OK,
      message: 'Usuario encontrado',
      data: user
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// Mutations
const createUser = async (parent:any, args: { userInput: UserInput }, context: ContextGraphQl): Promise<Response> => {
  try {
    const { userInput } = args
    await createUserInstance(userInput)
    return {
      status: StatusEnum.OK,
      message: 'Usuario creado correctamente'
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const updateUser = async (parent: any, args: { updateUserInput: UpdateUserInput, deleteInput: boolean}, context: ContextGraphQl): Promise<Response> => {
  try {
    const { updateUserInput, deleteInput } = args
    if (deleteInput) {
      return {
        status: StatusEnum.OK,
        message: 'Usuario eliminado correctamente'
      }
    }
    const user = await getInstanceById<IUser, IModelUser>(User, updateUserInput.id, 'No se encontro el usuario')
    await updateUserInstance(user, updateUserInput)
    return {
      status: StatusEnum.OK,
      message: 'Usuario actualizado correcatmente'
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const userQuery = {
  login,
  currentUser,
  getUsers,
  getUserById
}
export const userMutation = {
  createUser,
  updateUser
}

export const userType = {
  User: {
    async roleInfo (parent: UserType, _: any, __:any): Promise<Role | null> {
      if (parent.roleId) {
        const role = await getRoleByIdInstance(parent.roleId)
        return role
      }
      return null
    }
  }
}
