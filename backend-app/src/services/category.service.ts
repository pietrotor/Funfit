import CategoryRepository from '@/repositories/category.repository'
import { Category, ICategory, IModelCategory } from '../models'
import { BadRequestError } from '@/lib/graphqlerrors'
import {
  CreateCategoryInput,
  PaginationInput,
  UpdateCategoryInput
} from '@/graphql/graphql_types'
import { generateProductCode } from 'helpers'
import Product from '@/models/product.model'
import { getInstancesPagination } from './generic.service'

export class CategoryService extends CategoryRepository<objectId> {
  async getCategoriesPaginated(paginationInput: PaginationInput) {
    const { filter } = paginationInput
    if (filter) {
      const filterArgs = {
        $or: [{ name: { $regex: filter, $options: 'i' } }]
      }
      return await getInstancesPagination<ICategory, IModelCategory>(
        Category,
        paginationInput,
        filterArgs
      )
    }
    return await getInstancesPagination<ICategory, IModelCategory>(
      Category,
      paginationInput
    )
  }

  async getCategories() {
    return await Category.find({
      deleted: false
    })
  }

  public async getCategoryById(id: objectId) {
    const categoryInstance = await Category.findOne({
      _id: id,
      deleted: false
    })
    if (!categoryInstance) {
      throw new BadRequestError('No se encontro la categoría')
    }

    return categoryInstance
  }

  public async getCategoryByIdInstance(id: objectId) {
    const categoryInstance = await Category.findOne({
      _id: id,
      deleted: false
    })

    return categoryInstance
  }

  private async checkUniqueName(name: string) {
    const duplicatedCategoryName = await Category.findOne({
      deleted: false,
      name
    })
    if (duplicatedCategoryName) {
      throw new BadRequestError('Ya existe una categoría con este nombre')
    }
  }

  async createCategory(createCategoryInput: CreateCategoryInput) {
    await this.checkUniqueName(createCategoryInput.name)
    const code = generateProductCode(createCategoryInput.name)
    const categoryInstance = new Category({ ...createCategoryInput, code })

    return await categoryInstance.save()
  }

  async updateCategory(updateCategoryInput: UpdateCategoryInput) {
    const { name, id } = updateCategoryInput
    const categoryInstance = await this.getCategoryById(id)
    if (!name || categoryInstance.name === name) return categoryInstance
    await this.checkUniqueName(name)
    const code = generateProductCode(name)
    categoryInstance.name = name
    categoryInstance.code = code

    return await categoryInstance.save()
  }

  async deleteCategory(id: objectId) {
    const categoryInstance = await this.getCategoryById(id)
    await Product.updateMany({ categoryId: id }, { $set: { categoryId: null } })
    categoryInstance.deleted = true
    categoryInstance.deletedAt = new Date()

    return await categoryInstance.save()
  }
}
