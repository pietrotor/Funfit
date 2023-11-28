import { CreatePropertyInput, UpdatePropertyInput } from '@/graphql/graphql_types'
import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { IProperty } from '@/models/property.model'

export default abstract class PropertyRepository<T> {
  abstract getProperties(businessId: T): Promise<IProperty[] | OutErrorResponse>
  abstract getPropertyById(id: T, businessId: T): Promise<IProperty | OutErrorResponse>
  abstract createProperty(createPropertyInput: CreatePropertyInput, createdBy?: T): Promise<IProperty | OutErrorResponse>
  abstract updateProperty(updatePropertyInput: UpdatePropertyInput): Promise<IProperty | OutErrorResponse>
  abstract deleteProperty(id: T, businessId: T, deletedBy?: T): Promise<IProperty | OutErrorResponse>
  // resolvers
  abstract getPropertyByIdInstance(id: T, businessId: T): Promise<IProperty | null>
  abstract getPropertyInstanceByOnlyById(id: T): Promise<IProperty | null>
}
