import {Entity, hasMany, model, property} from '@loopback/repository';
import {nanoId} from '../uitils/nanoid';
import {Address} from './address.model';
import {Cart} from './cart.model';
import {Invoice} from './invoice.model';

@model()
export class Auth extends Entity {
  @property({
    type: 'string',
    id: true,
    default: () => nanoId(),
  })
  id: string;

  @property({
    type: 'string',
  })
  companyName?: string;

  // @property({
  //   type: 'string',
  // })
  // companyLogo?: string;

  @property({
    type: 'string',
  })
  GSTno?: string;

  @property({
    type: 'string',
  })
  fssaiId?: string;

  @property({
    type: 'string',

    index: {unique: true},
  })
  userName: string;

  @property({
    type: 'string',

    jsonSchema: {
      maxLength: 10,
      minLength: 8,
    },
  })
  password: string;

  @hasMany(() => Cart)
  carts: Cart[];

  @hasMany(() => Invoice)
  invoices: Invoice[];
  // @property.array(String)
  // cart?: string[];

  // @hasMany(() => Product)
  // productss: Product[];
  @property({
    type: 'string',

    format: 'email',
  })
  emailId: string;

  @property({
    type: 'string',

    format: 'Date',
  })
  DOB: Date;

  @property({
    type: Address,
  })
  address: Address;

  @property.array(String)
  permissions: string[];

  constructor(data?: Partial<Auth>) {
    super(data);
  }
}

export interface AuthRelations {
  // describe navigational properties here
}

export type AuthWithRelations = Auth & AuthRelations;
