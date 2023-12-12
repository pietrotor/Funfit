import {
  PaginationInput,
  UpdateUserInput,
  UserInput,
} from "@/graphql/graphql_types";
import { IPaginatedResponse } from "@/interfaces/generic.interface";
import { OutErrorResponse } from "@/lib/graphqlerrors/custom.error";
import { IUser } from "@/models/user.model";

export default abstract class UserRepository<T> {
  abstract getUserById(id: T): Promise<IUser | OutErrorResponse>;
  abstract getUsersPaginated(
    paginationInput: PaginationInput
  ): Promise<IPaginatedResponse<IUser[]> | OutErrorResponse>;
  abstract createUser(
    userInput: UserInput,
    createdBy?: T
  ): Promise<IUser | OutErrorResponse>;
  abstract updateUser(
    updateUserInput: UpdateUserInput
  ): Promise<IUser | OutErrorResponse>;
  abstract validatePassowrdAndGenerateJWT(
    password: string,
    user: IUser
  ): Promise<String>;
  abstract searchUserByEmail(email: string): Promise<IUser | null>;
}
