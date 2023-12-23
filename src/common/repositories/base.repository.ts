import {
  Document,
  FilterQuery,
  PaginateModel,
  Types,
  UpdateQuery,
} from 'mongoose';
import { IBaseRepository } from '../interfaces/i-base-repository.interface';
import { IPaginationOptions } from '../interfaces/i-pagination-option.interface';
import { IPaginationResult } from '../interfaces/i-pagination-result.interface';

export class BaseRepository<T extends Document> implements IBaseRepository<T> {
  constructor(protected readonly model: PaginateModel<T>) {}

  async create(doc: Partial<T>): Promise<T> {
    return this.model.create(doc);
  }

  async save(doc: T): Promise<T> {
    const createModal = new this.model(doc);
    return createModal.save() as any;
  }

  async findById(id: string | Types.ObjectId): Promise<T> {
    return this.model.findById(id);
  }

  async findOne(filter: object): Promise<T> {
    return this.model.findOne(filter);
  }

  async find(
    filter: object,
    projection: any = null,
    sort: any = { _id: -1 },
  ): Promise<T[]> {
    return this.model.find(filter, projection).sort(sort);
  }

  async updateById(id: string | Types.ObjectId, update: object): Promise<T> {
    return this.model.findByIdAndUpdate(id, update, {
      new: true,
      useFindAndModify: true,
    });
  }

  async updateOne(filter: FilterQuery<T>, update: UpdateQuery<T>): Promise<T> {
    return this.model.findOneAndUpdate(filter, update, {
      new: true,
      useFindAndModify: true,
    });
  }

  async updateMany(
    filter: FilterQuery<T>,
    update: UpdateQuery<T>,
  ): Promise<any> {
    return this.model.updateMany(filter, update, { new: true });
  }

  async deleteById(id: string | Types.ObjectId): Promise<any> {
    return this.model.findByIdAndDelete(id);
  }

  async deleteOne(filter: object): Promise<T> {
    return this.model.findOneAndDelete(filter, { useFindAndModify: false });
  }

  async deleteMany(filter: object): Promise<any> {
    return this.model.deleteMany(filter);
  }

  async paginate(
    filter: object,
    paginationOptions: IPaginationOptions,
  ): Promise<IPaginationResult<T>> {
    return this.model.paginate(filter, paginationOptions);
  }

  async aggregate(pipeline: any[]): Promise<any> {
    return this.model.aggregate(pipeline);
  }
}
