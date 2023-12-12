import {
  CreateProductInput,
  PaginationInput,
  UpdateProductInput,
} from "@/graphql/graphql_types";
import ProductRepository from "@/repositories/product.repository";
import { IModelProduct, IProduct } from "@/models/product.model";
import { getInstancesPagination } from "./generic.service";
import Product from "@/models/product.model";
import { BadRequestError } from "@/lib/graphqlerrors";
import { updateGenericInstance } from "@/lib/updateInstance";
import { warehouseCore } from ".";
import { OutErrorResponse } from "@/lib/graphqlerrors/custom.error";
import { Types } from "mongoose";

export class ProductService extends ProductRepository<objectId> {
  async getProductsPaginated(paginationInput: PaginationInput) {
    const { filter } = paginationInput;
    if (filter) {
      const filterArgs = {
        $or: [
          { name: { $regex: filter, $options: "i" } },
          { code: { $regex: filter, $options: "i" } },
        ],
      };
      return await getInstancesPagination<IProduct, IModelProduct>(
        Product,
        paginationInput,
        filterArgs
      );
    }
    return await getInstancesPagination<IProduct, IModelProduct>(
      Product,
      paginationInput
    );
  }
  async getProductById(id: objectId) {
    const productInstance = await Product.findOne({
      _id: id,
      deleted: false,
    });
    if (!productInstance)
      throw new BadRequestError("No se encontro el Producto");
    return productInstance;
  }
  async createProducto(
    createProductInput: CreateProductInput,
    createdBy?: objectId | null
  ) {
    const { name } = createProductInput;
    const duplicatedProduct = await Product.findOne({
      name,
      createdBy,
    });
    if (duplicatedProduct)
      throw new BadRequestError(
        "Ya existe un producto registrado con el mismo nombre"
      );
    const productInstance = new Product(createProductInput);
    return await productInstance.save();
  }
  async updateProduct(updateProductInput: UpdateProductInput) {
    const { id, warehouses, ...product } = updateProductInput;
    const productInstance = await Product.findOne({
      _id: id,
      deleted: false,
    });
    if (!productInstance) throw new BadRequestError("El producto no existe");
    updateGenericInstance(productInstance, product);
    await Promise.all(
      (warehouses || []).map(async (warehouse) => {
        await warehouseCore.getWarehouseById(warehouse);
      })
    );
    return await productInstance.save();
  }
  async deleteProduct(id: Types.ObjectId, deletedBy?: objectId | null) {
    const productInstance = await Product.findOne({
      _id: id,
      deleted: false,
    });
    if (!productInstance) throw new BadRequestError("El producto no existe");
    productInstance.deleted = true;
    productInstance.deletedBy = deletedBy || undefined;
    return await productInstance.save();
  }
}
