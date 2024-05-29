import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoDataSource} from '../datasources';
import {Purchase, PurchaseRelations} from '../models';

export class PurchaseRepository extends DefaultCrudRepository<
  Purchase,
  typeof Purchase.prototype.id,
  PurchaseRelations
> {
  constructor(
    @inject('datasources.mongo') dataSource: MongoDataSource,
  ) {
    super(Purchase, dataSource);
  }
}
