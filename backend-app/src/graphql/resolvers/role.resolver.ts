import { PaginationInput, RolesResponse } from "@/graphql/graphql_types";
import { errorHandler } from "@/lib/graphqlerrors";
import { roleCore } from "@/services/index";

// Querys
const getRoles = async (
  _: any,
  args: {
    paginationInput: PaginationInput;
  }
): Promise<RolesResponse> => {
  try {
    const { paginationInput } = args;
    return await roleCore.getRolesPaginated(paginationInput);
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};

export const roleQuery = {
  getRoles,
};
export const roleMutation = {};
