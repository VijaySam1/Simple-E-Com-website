import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  HttpErrors,
  param,
  patch,
  post,
  put,
  requestBody,
} from '@loopback/rest';
import {Auth, Cart} from '../models';
import {AuthRepository, CartRepository} from '../repositories';

export class AuthCartController {
  constructor(
    @repository(AuthRepository) protected authRepository: AuthRepository,
    @repository(CartRepository) protected cartRepository: CartRepository,
  ) {}

  @get('/user/{id}/carts', {
    responses: {
      '200': {
        description: 'Array of Auth has many Cart',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Cart)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Cart>,
  ): Promise<Cart[]> {
    return this.authRepository.carts(id).find(filter);
  }

  @post('/user/{id}/product/{productId}/carts', {
    responses: {
      '200': {
        description: 'Auth model instance',
        content: {'application/json': {schema: getModelSchemaRef(Cart)}},
      },
    },
  })
  async create(
    @param.path.string('productId') ProductId: string,

    @param.path.string('id') id: typeof Auth.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCartInAuth',
            exclude: ['id', 'ProductId'],
            optional: ['authId'],
          }),
        },
      },
    })
    cart: Omit<Cart, 'id'>,
  ): Promise<Cart> {
    return this.authRepository.carts(id).create({...cart, ProductId});
  }

  @patch('/user/{id}/carts', {
    responses: {
      '200': {
        description: 'Auth.Cart PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {partial: true}),
        },
      },
    })
    cart: Partial<Cart>,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.authRepository.carts(id).patch(cart, where);
  }

  @put('/user/{id}/carts/{cartId}', {
    responses: {
      '200': {
        description: 'Auth.Cart PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async update(
    @param.path.string('id') id: string,
    @param.path.string('cartId') cartId: string,

    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cart, {
            title: 'NewCartInAuth',
            exclude: ['id'],
            optional: ['authId'],
          }),
        },
      },
    })
    cart: Omit<Cart, 'id'>,
    // @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<object> {
    try {
      return this.cartRepository.updateById(cartId, cart).then(() => {
        return {message: 'updated successfully'};
      });
    } catch {
      throw new HttpErrors[400]();
    }
  }

  @del('/user/{id}/carts', {
    responses: {
      '200': {
        description: 'Auth.Cart DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<Count> {
    return this.authRepository.carts(id).delete(where);
  }
  @del('/user/{id}/carts/{cartId}', {
    responses: {
      '200': {
        description: 'Auth.Cart DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async deletebyid(
    @param.path.string('id') id: string,
    @param.path.string('cartId') cartId: string,

    @param.query.object('where', getWhereSchemaFor(Cart)) where?: Where<Cart>,
  ): Promise<object> {
    try {
      return this.cartRepository.deleteById(cartId).then(() => {
        return {message: 'deleted successfully'};
      });
    } catch {
      throw new HttpErrors[400]();
    }
  }
}
