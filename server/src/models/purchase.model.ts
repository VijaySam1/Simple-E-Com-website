import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Purchase extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    // required: true,
  })
  purchaseNo: number;

  @property({
    type: 'string',
    required: true,
  })
  productName: string;

  @property({
    type: 'string',
    required: true,
  })
  boughtFrom: string;

  @property({
    type: 'date',
  })
  date?: Date;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
  })
  quantity: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Purchase>) {
    super(data);
  }
}

export interface PurchaseRelations {
  // describe navigational properties here
}

export type PurchaseWithRelations = Purchase & PurchaseRelations;
