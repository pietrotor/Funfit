import {
  BusinessBalance,
  UpdateConfigurationInput
} from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IConfiguration } from '@/models/configuration.model'
import { BusinessBalanceDto } from 'dtos'

export abstract class ConfigurationRepository<T> {
  abstract getConfiguration(): Promise<IConfiguration | OutErrorResponse>
  abstract getConfigurationInstance(): Promise<IConfiguration | null>
  abstract updateConfiguration(
    updateConfigurationInput: UpdateConfigurationInput
  ): Promise<IConfiguration | OutErrorResponse>

  abstract businessBalance(
    balanceDto: BusinessBalanceDto
  ): Promise<BusinessBalance | OutErrorResponse>
}
