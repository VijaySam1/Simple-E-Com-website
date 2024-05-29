import {Filter, repository} from '@loopback/repository';
import {
  get,
  getModelSchemaRef,
  param,
  post,
  requestBody,
  response,
} from '@loopback/rest';
import {Auth, Invoice} from '../models';
import {
  AuthRepository,
  InvoiceRepository,
  PurchaseRepository,
} from '../repositories';

export class AuthInvoiceController {
  constructor(
    @repository(AuthRepository) protected authRepository: AuthRepository,
    @repository(InvoiceRepository)
    public invoiceRepository: InvoiceRepository,
    @repository(PurchaseRepository)
    public purchaseRepository: PurchaseRepository,
  ) {}

  @get('/auths/{id}/invoices', {
    responses: {
      '200': {
        description: 'Array of Auth has many Invoice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Invoice)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Invoice>,
  ): Promise<Invoice[]> {
    return this.authRepository.invoices(id).find(filter);
  }

  @post('/user/{id}/invoice', {
    responses: {
      '200': {
        description: 'Auth model instance',
        content: {'application/json': {schema: getModelSchemaRef(Invoice)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Auth.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Invoice, {
            title: 'NewInvoiceInAuth',
            exclude: ['id'],
            optional: ['authId'],
          }),
        },
      },
    })
    invoices: Omit<Invoice, 'id'>,
  ): Promise<object> {
    let {orderNo, ...invoice} = invoices;
    orderNo = (await (await this.invoiceRepository.count()).count) + 10000;
    const authId = 'Kc6XmONWgi';
    await this.authRepository.invoices(authId).create({orderNo, ...invoice});
    return {message: 'Added Successfully'};
  }
  @get('/auths/{authId}/invoices/{id}')
  @response(200, {
    description: 'Invoice model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Invoice, {includeRelations: true}),
      },
    },
  })
  async findById(@param.path.string('id') id: string): Promise<Invoice> {
    return this.invoiceRepository.findById(id);
  }

  @get('/summary', {
    responses: {
      '200': {
        description: 'Array of Auth has many Invoice',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Invoice)},
          },
        },
      },
    },
  })
  async summary(
    @param.query.date('from') from?: Date,
    @param.query.date('to') to?: Date,
  ): Promise<any> {
    let purchaseTotal = 0;
    let salesTotal = 0;
    const id = 'Kc6XmONWgi';
    const invoice = await this.authRepository
      .invoices(id)
      .find({where: {date: {between: [from, to]}}});
    const purchase = await this.purchaseRepository.find({
      where: {date: {between: [from, to]}},
    });

    purchase.map(
      purchase => (purchaseTotal += purchase.quantity * purchase.price),
    );
    invoice.map(
      invoice =>
        (salesTotal += Math.floor(
          invoice.totalPrice + (invoice.totalPrice / 100) * 12,
        )),
    );
    return {purchaseTotal, salesTotal};
  }

  // @patch('/auths/{id}/invoices', {
  //   responses: {
  //     '200': {
  //       description: 'Auth.Invoice PATCH success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async patch(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Invoice, {partial: true}),
  //       },
  //     },
  //   })
  //   invoice: Partial<Invoice>,
  //   @param.query.object('where', getWhereSchemaFor(Invoice))
  //   where?: Where<Invoice>,
  // ): Promise<Count> {
  //   return this.authRepository.invoices(id).patch(invoice, where);
  // }

  // @del('/auths/{id}/invoices', {
  //   responses: {
  //     '200': {
  //       description: 'Auth.Invoice DELETE success count',
  //       content: {'application/json': {schema: CountSchema}},
  //     },
  //   },
  // })
  // async delete(
  //   @param.path.string('id') id: string,
  //   @param.query.object('where', getWhereSchemaFor(Invoice))
  //   where?: Where<Invoice>,
  // ): Promise<Count> {
  //   return this.authRepository.invoices(id).delete(where);
  // }
}
