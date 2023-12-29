import {
  StatusEnum,
  ConfigurationResponse,
  UpdateConfigurationInput,
} from "@/graphql/graphql_types";
import { errorHandler } from "@/lib/graphqlerrors";
import { configurationCore } from "@/services/index";

// ========================================== Queries ====================================================
const getConfiguration = async (_: any): Promise<ConfigurationResponse> => {
  try {
    const configurationInstance = await configurationCore.getConfiguration();
    return {
      status: StatusEnum.OK,
      message: "Configuración encontrada",
      data: configurationInstance,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};
// ========================================== Mutations ====================================================
const updateConfiguration = async (
  _: any,
  args: { updateConfigurationInput: UpdateConfigurationInput }
): Promise<ConfigurationResponse> => {
  try {
    const { updateConfigurationInput } = args;
    const configurationInstance = await configurationCore.updateConfiguration(
      updateConfigurationInput
    );
    return {
      status: StatusEnum.OK,
      message: "Configuración actualizada correactamente",
      data: configurationInstance,
    };
  } catch (error) {
    console.log(error);
    return errorHandler(error);
  }
};

export const configurationQuery = {
  getConfiguration,
};
export const configurationMutation = {
  updateConfiguration,
};

export const configurationType = {};
