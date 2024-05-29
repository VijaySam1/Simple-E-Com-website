import {belongsTo, Entity, model, property} from '@loopback/repository';
import {nanoId} from '../uitils/nanoid';
import {Address} from './address.model';
import {Auth} from './auth.model';
import {Cart} from './cart.model';

@model()
export class Invoice extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => nanoId(),
  })
  id: string;
  @property({
    type: 'number',
    // required: true,
    default: () => Math.floor(Math.random() * 1000) + 100,
  })
  orderNo: number;

  @property({
    type: 'string',
    required: true,
  })
  reciverName: string;

  @property({
    type: 'string',
    required: true,
  })
  reciverPhno: string;

  @property({
    type: Address,
  })
  address: Address;

  @property.array(Cart)
  products: Cart[];

  // @property({
  @belongsTo(() => Auth)
  authId: string;
  //   type: 'string',

  //   required: true,
  // })
  // products: string;

  @property({
    type: 'date',
    defaultFn: 'now',
  })
  date?: Date;

  @property({
    type: 'number',
    required: true,
  })
  totalPrice: number;

  constructor(data?: Partial<Invoice>) {
    super(data);
  }
}

export interface InvoiceRelations {
  // describe navigational properties here
}

export type InvoiceWithRelations = Invoice & InvoiceRelations;
