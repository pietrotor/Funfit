import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IBusiness } from '@/models/business.model'

export default abstract class BusinessRepository<T> {
  abstract getBusinessById(id: T): Promise<IBusiness | OutErrorResponse>
  abstract getBusinessByIdFieldResolver(id: T): Promise<IBusiness | null>
}
