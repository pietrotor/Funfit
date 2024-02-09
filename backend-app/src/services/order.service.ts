import { BadRequestError } from '@/lib/graphqlerrors'
import { IModelOrder, IOrder, Order } from '../models'
import { OrderRepository } from '../repositories'
import {
  CreateOrderInput,
  DeliveryMethodEnum,
  OrderPaginationInput
} from '@/graphql/graphql_types'
import { saleUseCase } from 'useCase'
import {
  addressCore,
  branchCore,
  branchProductCore,
  customerCore,
  productCore
} from '.'
import { getInstancesPagination } from './generic.service'

export class OrderService extends OrderRepository<objectId> {
  async getOrderById(id: objectId) {
    const orderInstance = await Order.findOne({
      _id: id,
      deleted: false
    })
    if (!orderInstance) {
      throw new BadRequestError('No se encontro la sucursal')
    }
    return orderInstance
  }

  async getOrderByIdInstance(id: objectId) {
    return await Order.findOne({
      _id: id,
      deleted: false
    })
  }

  async getOrdersPaginated(orderPaginationInput: OrderPaginationInput) {
    const { filter, branchId, orderesAcepted, ...paginationInput } =
      orderPaginationInput
    const branchFilter = branchId ? { branchId } : {}
    const orderesAceptedFilter =
      typeof orderesAcepted === 'boolean'
        ? { orderAcepted: orderesAcepted }
        : {}

    if (filter) {
      const filterArgs = {
        $or: [{ code: { $regex: filter, $options: 'i' } }]
      }
      return await getInstancesPagination<IOrder, IModelOrder>(
        Order,
        paginationInput,
        { ...filterArgs, ...branchFilter, ...orderesAceptedFilter }
      )
    }
    return await getInstancesPagination<IOrder, IModelOrder>(
      Order,
      paginationInput,
      { ...branchFilter, ...orderesAceptedFilter }
    )
  }

  async createOrder(createOrderInput: CreateOrderInput) {
    const {
      branchId,
      discount,
      paymentMethod,
      products,
      total,
      subTotal,
      orderDetails,
      pickUpInformation,
      customerId,
      deliveryMethod,
      addressId
    } = createOrderInput
    if (total < 0) throw new BadRequestError('El total no puede ser negativo')
    if (discount < 0) {
      throw new BadRequestError('El descuento no puede ser negativo')
    }

    if (deliveryMethod === DeliveryMethodEnum.PICKUP && addressId) {
      throw new BadRequestError(
        'No puede seleccionar una dirección si el pedido es para recojo en sucursal'
      )
    }

    if (deliveryMethod === DeliveryMethodEnum.DELIVERY && !addressId) {
      throw new BadRequestError(
        'Debe seleccionar una dirección para poder envíar el pedido'
      )
    }
    if (deliveryMethod === DeliveryMethodEnum.DELIVERY && pickUpInformation) {
      throw new BadRequestError(
        'No puede tener detalle de recojo si es un pedido para delivery'
      )
    }

    products.forEach(product => saleUseCase.validateSaleSubTotal(product))

    const isTotalOk = saleUseCase.validateSaleTotal(products, total, discount)
    if (!isTotalOk) throw new BadRequestError('El total no es correcto')

    if (subTotal - discount !== total) {
      throw new BadRequestError('El sub total no es correcto')
    }

    const [, customerInstance] = await Promise.all([
      branchCore.getBranchById(branchId),
      customerCore.getCustomerById(customerId),
      async () => {
        if (addressId) {
          await addressCore.getAddressById(addressId)
        }
      }
    ])

    await Promise.all(
      products.map(async product => {
        const branchProductInstance =
          await branchProductCore.getBranchProductById(product.branchProductId)
        if (product.qty > branchProductInstance.stock) {
          const productInstance = await productCore.getProductById(
            product.productId
          )
          throw new BadRequestError(
            'El stock de ' + productInstance.name + ' es menor al requerido'
          )
        }
        return branchProductInstance
      })
    )
    function generateCode(): string {
      const characters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let code: string = ''

      for (let i = 0; i < 5; i++) {
        const randomIndex: number = Math.floor(
          Math.random() * characters.length
        )
        code += characters.charAt(randomIndex)
      }

      return code
    }
    const code = generateCode()
    const orderInstance = new Order({
      branchId,
      discount,
      paymentMethod,
      code,
      products,
      total,
      subTotal,
      orderDetails,
      pickUpInformation,
      customerId,
      deliveryMethod,
      addressId
    })
    customerInstance.ordersIds.push(orderInstance._id)
    const [orderInstanceSaved] = await Promise.all([
      orderInstance.save(),
      customerInstance.save()
    ])
    return orderInstanceSaved
  }

  async acceptOrder(orderId: objectId, acceptedBy?: objectId) {
    const orderInstance = await this.getOrderById(orderId)
    if (orderInstance.orderAcepted) throw new BadRequestError('EL pedido ya fue aceptado previamente')
    orderInstance.orderAcepted = true
    orderInstance.orderAceptedAt = new Date()
    orderInstance.orderAceptedBy = acceptedBy || null
    return await orderInstance.save()
  }
}
