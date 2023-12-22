import { Document, PaginateModel, Types } from 'mongoose';
import { IBaseRepository } from '../interfaces/i-base-repository.interface';

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected readonly model: PaginateModel<T>) {}

  create(doc: Partial<T>): Promise<T> {
    return this.model.create(doc);
  }

  save(doc: T): Promise<T> {
    const createModal = new this.model(doc);
    return createModal.save() as any;
  }

  findById(id: string | Types.ObjectId): Promise<T> {
    return this.model.findById(id);
  }

  findOne(filter: object): Promise<T> {
    return this.model.findOne(filter);
  }

  find(
    filter: object,
    projection: any = null,
    sort: any = { _id: -1 },
  ): Promise<T[]> {
    return this.model.find(filter, projection).sort(sort);
  }
}
