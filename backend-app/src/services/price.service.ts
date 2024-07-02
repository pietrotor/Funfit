import {
  CreatePriceInput,
  PricePaginationInput,
  UpdatePriceInput
} from '@/graphql/graphql_types'
import { getInstancesPagination } from './generic.service'
import { BadRequestError } from '@/lib/graphqlerrors'
import { updateGenericInstance } from '@/lib/updateInstance'
import { IModelPrice, IPrice, Price } from '../models'
import PriceRepository from '@/repositories/price.repository'
import Product from '@/models/product.model'
import { productCore } from '.'

export class PriceService extends PriceRepository<objectId> {
  async getPricesPaginated(pricePaginationInput: PricePaginationInput) {
    const { filter, priceListId } = pricePaginationInput
    if (filter) {
      const products = await Product.find({
        deleted: false,
        $or: [
          { name: { $regex: filter, $options: 'i' } },
          { code: { $regex: filter, $options: 'i' } }
        ],
        priceListsIds: {
          $in: [priceListId]
        }
      })
      const productsIds = products.map(product => product._id)
      return await getInstancesPagination<IPrice, IModelPrice>(
        Price,
        pricePaginationInput,
        { productId: productsIds, priceListId, deleted: false }
      )
    }
    return await getInstancesPagination<IPrice, IModelPrice>(
      Price,
      pricePaginationInput,
      {
        priceListId
      }
    )
  }

  async getPriceById(id: objectId) {
    const priceListInstance = await Price.findOne({
      _id: id,
      deleted: false
    })
    if (!priceListInstance) {
      throw new BadRequestError('No se encontro el precio')
    }
    return priceListInstance
  }

  async getPriceByIdInstance(id: objectId) {
    return await Price.findOne({
      _id: id,
      deleted: false
    })
  }

  async createPrice(
    createPriceInput: CreatePriceInput,
    createdBy?: objectId | null
  ) {
    const { productId, priceListId } = createPriceInput
    const [duplicatedPrice] = await Promise.all([
      Price.findOne({
        productId,
        deleted: false,
        priceListId
      })
    ])
    const productInstance = await productCore.getProductById(productId)
    if (duplicatedPrice) {
      throw new BadRequestError(
        'Ya existe un producto registrado en esta lista de precios'
      )
    }

    productInstance.priceListsIds.push(priceListId)

    const priceInstance = new Price({
      ...createPriceInput,
      createdBy
    })
    await productInstance.save()
    return await priceInstance.save()
  }

  async updatePrice(updatePriceInput: UpdatePriceInput) {
    const { id, ...price } = updatePriceInput
    const priceInstance = await Price.findOne({
      _id: id,
      deleted: false
    })

    if (price.price) {
      if (price.price < 0) {
        throw new BadRequestError('El precio no puede ser negativo')
      }
    }
    if (!priceInstance) throw new BadRequestError('El precio no existe')
    updateGenericInstance(priceInstance, price)
    return await priceInstance.save()
  }

  async deletePrice(id: objectId, deletedBy?: objectId | null) {
    const priceInstance = await Price.findOne({
      _id: id,
      deleted: false
    })
    if (!priceInstance) throw new BadRequestError('El precio no existe')
    const productInstance = await productCore.getProductById(
      priceInstance.productId
    )

    const productPriceListsIds = productInstance.priceListsIds.filter(
      productPriceList =>
        productPriceList.toString() === priceInstance.priceListId.toString()
    )

    productInstance.priceListsIds = productPriceListsIds

    priceInstance.deleted = true
    priceInstance.deletedBy = deletedBy || undefined
    await productInstance.save()
    return await priceInstance.save()
  }
}
