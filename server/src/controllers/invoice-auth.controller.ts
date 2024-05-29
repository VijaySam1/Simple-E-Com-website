import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Invoice,
  Auth,
} from '../models';
import {InvoiceRepository} from '../repositories';

export class InvoiceAuthController {
  constructor(
    @repository(InvoiceRepository)
    public invoiceRepository: InvoiceRepository,
  ) { }

  @get('/invoices/{id}/auth', {
    responses: {
      '200': {
        description: 'Auth belonging to Invoice',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Auth),
          },
        },
      },
    },
  })
  async getAuth(
    @param.path.string('id') id: typeof Invoice.prototype.id,
  ): Promise<Auth> {
    return this.invoiceRepository.auth(id);
  }
}
