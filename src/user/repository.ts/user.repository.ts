import { BaseRepository } from 'src/common/repositories/base.repository';
import { IUserDocument } from '../interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../schema/user.schema';
import { PaginateModel } from 'mongoose';
import { Injectable } from '@nestjs/common';
@Injectable()
export class UserRepository extends BaseRepository<IUserDocument> {
  constructor(
    @InjectModel(User.name)
    protected readonly model: PaginateModel<IUserDocument>,
  ) {
    super(model);
  }
}
