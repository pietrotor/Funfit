import { UpdateConfigurationInput } from '@/graphql/graphql_types'
import { BadRequestError } from '@/lib/graphqlerrors'
import { updateGenericInstance } from '@/lib/updateInstance'
import Configuration from '@/models/configuration.model'
import { ConfigurationRepository } from '@/repositories/configuration.repository'

export class ConfigurationService extends ConfigurationRepository<objectId> {
  async getConfiguration() {
    const configurationInstance = await Configuration.findOne({})
    if (!configurationInstance)
      throw new BadRequestError('No existe una configuración')
    return configurationInstance
  }

  async getConfigurationInstance() {
    return await Configuration.findOne({})
  }

  async updateConfiguration(
    updateConfigurationInput: UpdateConfigurationInput
  ) {
    const { id, ...config } = updateConfigurationInput
    const configurationInstance = await this.getConfiguration()
    updateGenericInstance(configurationInstance, config)
    return await configurationInstance.save()
  }
}
