import { UpdateConfigurationInput } from '@/graphql/graphql_types'
import { BadRequestError } from '@/lib/graphqlerrors'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { updateGenericInstance } from '@/lib/updateInstance'
import Configuration, { IConfiguration } from '@/models/configuration.model'
import { ConfigurationRepository } from '@/repositories/configuration.repository'
import { BusinessBalanceDto } from 'dtos'
import { Branch } from '../models'
import { distributorSaleCore, saleCore } from '.'

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

  async businessBalance(balanceDto: BusinessBalanceDto) {
    const { endDate, initialDate } = balanceDto
    const branches = await Branch.find({
      deleted: false
    })

    const salesByBranch = await Promise.all(
      branches.map(async branch => {
        return {
          id: branch._id,
          name: branch.name,
          total: parseFloat(
            await saleCore
              .getTotalSales({
                branchIds: [branch._id],
                endDate,
                initialDate
              })
              .then(result => result.toFixed(2))
          )
        }
      })
    )
    const { balance, totalPaid } = await distributorSaleCore.getTotalSaled({
      endDate,
      initialDate
    })

    const totalSales = salesByBranch.reduce(
      (prevValue, branch) => prevValue + branch.total,
      0
    )

    const totalEarnings = totalSales + totalPaid
    const totalExpenses = balance

    const result = totalEarnings - totalExpenses

    return {
      balance: parseFloat(balance.toFixed(2)),
      totalPaid: parseFloat(totalPaid.toFixed(2)),
      salesByBranch,
      result: parseFloat(result.toFixed(2)),
      totalExpenses: parseFloat(totalExpenses.toFixed(2)),
      totalEarnings: totalEarnings.toFixed(2)
    }
  }
}
