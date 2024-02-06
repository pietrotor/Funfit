import { UpdateConfigurationInput } from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IConfiguration } from '@/models/configuration.model'

export abstract class ConfigurationRepository<T> {
  abstract getConfiguration(): Promise<IConfiguration | OutErrorResponse>
  abstract getConfigurationInstance(): Promise<IConfiguration | null>
  abstract updateConfiguration(
    updateConfigurationInput: UpdateConfigurationInput
  ): Promise<IConfiguration | OutErrorResponse>
}
