import {
  StatusEnum,
  PaginationInput,
  CategoriesResponse,
  CategoryResponse,
  CreateCategoryInput,
  UpdateCategoryInput
} from '@/graphql/graphql_types'
import { ContextGraphQl } from '@/interfaces/context.interface'
import { errorHandler } from '@/lib/graphqlerrors'
import { categoryCore } from '@/services/index'

// ========================================== Queries ====================================================
const getCategories = async (
  _: any,
  args: { paginationInput: PaginationInput },
  context: ContextGraphQl
): Promise<CategoriesResponse> => {
  try {
    const { paginationInput } = args
    return await categoryCore.getCategoriesPaginated(paginationInput)
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const getCategoryById = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<CategoryResponse> => {
  try {
    const { id } = args
    const category = await categoryCore.getCategoryById(id)
    return {
      status: StatusEnum.OK,
      message: 'Categoría encontrada',
      data: category
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
// ========================================== Mutations ====================================================
const createCategory = async (
  _: any,
  args: { createCategoryInput: CreateCategoryInput },
  context: ContextGraphQl
): Promise<CategoryResponse> => {
  try {
    const { createCategoryInput } = args
    const branchInstance = await categoryCore.createCategory(
      createCategoryInput
    )
    return {
      status: StatusEnum.OK,
      message: 'categoría creada correctamente',
      data: branchInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const updateCategory = async (
  _: any,
  args: { updateCategoryInput: UpdateCategoryInput },
  context: ContextGraphQl
): Promise<CategoryResponse> => {
  try {
    const { updateCategoryInput } = args
    const categoryInstance = await categoryCore.updateCategory(
      updateCategoryInput
    )
    return {
      status: StatusEnum.OK,
      message: 'categoría actualizada correactamente',
      data: categoryInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}
const deleteCategory = async (
  _: any,
  args: { id: objectId },
  context: ContextGraphQl
): Promise<CategoryResponse> => {
  try {
    const { id } = args
    const branchInstance = await categoryCore.deleteCategory(id)
    return {
      status: StatusEnum.OK,
      message: 'Categoría eliminada correactamente',
      data: branchInstance
    }
  } catch (error) {
    console.log(error)
    return errorHandler(error)
  }
}

export const categoryQuery = {
  getCategories,
  getCategoryById
}
export const categoryMutation = {
  createCategory,
  updateCategory,
  deleteCategory
}

export const categoryType = {}
