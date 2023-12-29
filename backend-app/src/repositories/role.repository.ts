import { PaginationInput } from "@/graphql/graphql_types";
import { OutErrorResponse } from "@/lib/graphqlerrors/custom.error";
import { IRole } from "@/models/role.model";

export default abstract class roleRepository<T> {
  abstract getRolesPaginated(
    paginationInput: PaginationInput
  ): Promise<IRole | OutErrorResponse>;
}
