import {Entity, model, property} from '@loopback/repository';

@model()
export class Product extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  productName: string;

  @property({
    type: 'string',
  })
  image?: string;

  @property({
    type: 'string',
  })
  productGroup: string;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  @property({
    type: 'number',
  })
  price?: number;

  @property({
    type: 'string',
  })
  discription?: string;

  @property({
    type: 'string',
  })
  invoiceId?: string;

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
