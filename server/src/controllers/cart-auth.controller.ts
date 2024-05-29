import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Cart,
  Auth,
} from '../models';
import {CartRepository} from '../repositories';

export class CartAuthController {
  constructor(
    @repository(CartRepository)
    public cartRepository: CartRepository,
  ) { }

  @get('/carts/{id}/auth', {
    responses: {
      '200': {
        description: 'Auth belonging to Cart',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Auth),
          },
        },
      },
    },
  })
  async getAuth(
    @param.path.string('id') id: typeof Cart.prototype.id,
  ): Promise<Auth> {
    return this.cartRepository.auth(id);
  }
}
