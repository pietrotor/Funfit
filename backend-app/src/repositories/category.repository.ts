import { OutErrorResponse } from '@/lib/graphqlerrors/custom.error'
import { ICategory } from '../models'
import {
  CreateCategoryInput,
  PaginationInput,
  UpdateCategoryInput
} from '@/graphql/graphql_types'
import { IPaginatedResponse } from '@/interfaces/generic.interface'

export default abstract class CategoryRepository<T> {
  abstract createCategory(
    createCategoryInput: CreateCategoryInput
  ): Promise<ICategory | OutErrorResponse>

  abstract updateCategory(
    updateCategoryInput: UpdateCategoryInput
  ): Promise<ICategory | OutErrorResponse>

  abstract deleteCategory(id: T): Promise<ICategory | OutErrorResponse>

  abstract getCategoriesPaginated(
    paginationInput: PaginationInput
  ): Promise<IPaginatedResponse<ICategory[]> | OutErrorResponse>

  abstract getCategories(): Promise<ICategory[] | OutErrorResponse>

  abstract getCategoryById(id: T): Promise<ICategory | OutErrorResponse>
  abstract getCategoryByIdInstance(id: T): Promise<ICategory | null>
}
