import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Address extends Model {
  @property({
    type: 'string',
  })
  street?: string;

  @property({
    type: 'string',
  })
  city?: string;

  @property({
    type: 'string',
  })
  district?: string;

  @property({
    type: 'string',
  })
  state?: string;

  @property({
    type: 'number',
  })
  pincode?: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
