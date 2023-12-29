import { Types } from "mongoose";

import { IModelRole, IRole, Role } from "@/models/role.model";
import roleRepository from "@/repositories/role.repository";
import { PaginationInput } from "@/graphql/graphql_types";
import { getInstancesPagination } from "./generic.service";

export const getRoleByIdInstance = async (id: Types.ObjectId) => {
  const rolesFound = await Role.findById({
    _id: id,
    deleted: false,
  });
  return rolesFound;
};

export class RoleService extends roleRepository<objectId> {
  async getRolesPaginated(paginationInput: PaginationInput) {
    const { filter } = paginationInput;
    if (filter) {
      const filterArgs = {
        $or: [{ name: { $regex: filter, $options: "i" } }],
      };
      return await getInstancesPagination<IRole, IModelRole>(
        Role,
        paginationInput,
        filterArgs
      );
    }
    return await getInstancesPagination<IRole, IModelRole>(
      Role,
      paginationInput
    );
  }
}
