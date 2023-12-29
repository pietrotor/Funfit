import {
  LoginInput,
  StatusEnum,
  UpdateUserInput,
  UserResponse,
  UsersResponse,
  Role,
  User as UserType,
  LoginResponse,
  UserInput,
  PaginationInput,
} from "@/graphql/graphql_types";
import { ContextGraphQl } from "@/interfaces/context.interface";
import { BadRequestError, errorHandler } from "@/lib/graphqlerrors";
import User from "@/models/user.model";
import { userCore } from "@/services/index";
import { getRoleByIdInstance } from "@/services/role.service";

// ========================================== Mutations ====================================================
const login = async (
  _: any,
  args: { loginInput: LoginInput },
  context: ContextGraphQl
): Promise<LoginResponse> => {
  try {
    const {
      loginInput: { email, password },
    } = args;
    const user = await userCore.searchUserByEmail(email);
    if (!user) {
      throw new BadRequestError("El usuario no existe");
    }
    const userJwt = await userCore.validatePassowrdAndGenerateJWT(
      password,
      user
    );
    user.lastLogin = new Date();
    await user.save();
    return {
      status: StatusEnum.OK,
      message: "usuario logueado, redireccionando...",
      token: userJwt,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
const currentUser = async (
  _: any,
  __: any,
  context: ContextGraphQl
): Promise<UserResponse> => {
  if (!context.req.currentUser) {
    return {
      status: StatusEnum.ERROR,
      message: "usuario no encontrado",
      data: null,
    };
  }
  const userInstance = await User.findOne({
    _id: context.req?.currentUser?.id,
  });
  if (!userInstance) {
    return {
      status: StatusEnum.ERROR,
      message: "usuario no encontrado",
    };
  }
  return {
    status: StatusEnum.OK,
    message: "usuario encontrado",
    data: userInstance,
  };
};
const getUsers = async (
  _: any,
  args: { paginationInput: PaginationInput },
  context: ContextGraphQl
): Promise<UsersResponse> => {
  try {
    const { paginationInput } = args;
    return await userCore.getUsersPaginated(paginationInput);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
const getUserById = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<UserResponse> => {
  try {
    const { id } = args;
    const user = await userCore.getUserById(id);
    return {
      status: StatusEnum.OK,
      message: "Usuario encontrado",
      data: user,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
// ========================================== Mutations ====================================================
const createUser = async (
  _: any,
  args: { userInput: UserInput },
  context: ContextGraphQl
): Promise<UserResponse> => {
  try {
    const { userInput } = args;
    const userInstance = await userCore.createUser(userInput);
    return {
      status: StatusEnum.OK,
      message: "Usuario creado correctamente",
      data: userInstance,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
const updateUser = async (
  _: any,
  args: { updateUserInput: UpdateUserInput; deleteInput: boolean },
  context: ContextGraphQl
): Promise<UserResponse> => {
  try {
    const { updateUserInput, deleteInput } = args;
    if (deleteInput) {
      const userInstance = await userCore.deleteUser(
        updateUserInput.id,
        context.req.currentUser?.id
      );
      return {
        status: StatusEnum.OK,
        message: "Usuario eliminado correctamente",
        data: userInstance,
      };
    }
    const userInstance = await userCore.updateUser(updateUserInput);
    return {
      status: StatusEnum.OK,
      message: "Usuario actualizado correcatmente",
      data: userInstance,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};

export const userQuery = {
  login,
  currentUser,
  getUsers,
  getUserById,
};
export const userMutation = {
  createUser,
  updateUser,
};

export const userType = {
  User: {
    async roleInfo(parent: UserType, _: any, __: any): Promise<Role | null> {
      if (parent.roleId) {
        const role = await getRoleByIdInstance(parent.roleId);
        return role;
      }
      return null;
    },
  },
};
