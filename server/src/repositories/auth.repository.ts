import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDataSource} from '../datasources';

import {Auth, AuthRelations, Cart, Invoice} from '../models';
import {ProductRepository} from './product.repository';
import {CartRepository} from './cart.repository';
import {InvoiceRepository} from './invoice.repository';

export class AuthRepository extends DefaultCrudRepository<
  Auth,
  typeof Auth.prototype.id,
  AuthRelations
> {

  public readonly carts: HasManyRepositoryFactory<Cart, typeof Auth.prototype.id>;

  public readonly invoices: HasManyRepositoryFactory<Invoice, typeof Auth.prototype.id>;
  // public readonly products: HasManyRepositoryFactory<Product, typeof Auth.prototype.id>;

  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
    @repository.getter('ProductRepository')
    protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('CartRepository') protected cartRepositoryGetter: Getter<CartRepository>, @repository.getter('InvoiceRepository') protected invoiceRepositoryGetter: Getter<InvoiceRepository>,
  ) {
    super(Auth, dataSource);
    this.invoices = this.createHasManyRepositoryFactoryFor('invoices', invoiceRepositoryGetter,);
    this.registerInclusionResolver('invoices', this.invoices.inclusionResolver);
    this.carts = this.createHasManyRepositoryFactoryFor('carts', cartRepositoryGetter,);
    this.registerInclusionResolver('carts', this.carts.inclusionResolver);
    // this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    // this.registerInclusionResolver('products', this.products.inclusionResolver);
  }
}
