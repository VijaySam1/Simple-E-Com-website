import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Cart, CartRelations, Auth} from '../models';
import {AuthRepository} from './auth.repository';

export class CartRepository extends DefaultCrudRepository<
  Cart,
  typeof Cart.prototype.id,
  CartRelations
> {

  public readonly auth: BelongsToAccessor<Auth, typeof Cart.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource, @repository.getter('AuthRepository') protected authRepositoryGetter: Getter<AuthRepository>,
  ) {
    super(Cart, dataSource);
    this.auth = this.createBelongsToAccessorFor('auth', authRepositoryGetter,);
    this.registerInclusionResolver('auth', this.auth.inclusionResolver);
  }
}
