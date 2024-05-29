import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Invoice, InvoiceRelations, Auth} from '../models';
import {ProductRepository} from './product.repository';
import {AuthRepository} from './auth.repository';

export class InvoiceRepository extends DefaultCrudRepository<
  Invoice,
  typeof Invoice.prototype.id,
  InvoiceRelations
> {

  public readonly auth: BelongsToAccessor<Auth, typeof Invoice.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('ProductRepository')
    protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('AuthRepository') protected authRepositoryGetter: Getter<AuthRepository>,
  ) {
    super(Invoice, dataSource);
    this.auth = this.createBelongsToAccessorFor('auth', authRepositoryGetter,);
    this.registerInclusionResolver('auth', this.auth.inclusionResolver);
  }
}
