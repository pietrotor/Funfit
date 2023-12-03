import { UserService } from "./user.service";
import { RoleService } from "./role.service";

export const userCore = new UserService();
export const roleCore = new RoleService();
