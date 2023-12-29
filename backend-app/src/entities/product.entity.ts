class ProductGeneric<T> {
  id: T;
  name: T;
  price: number;
  code: string;
  units: string;
  description: string;
  cost: number;
  image: string;
  warehouses: T[];
}
export class ProductEntity extends ProductGeneric<objectId> {}
