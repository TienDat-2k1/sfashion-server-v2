import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { UserRepository } from './repository.ts/user.repository';
import { BaseService } from 'src/common/services/base.service';
import { IUserDocument } from './interfaces/user.interface';

@Injectable()
export class UserService extends BaseService<UserRepository> {
  constructor(protected readonly repository: UserRepository) {
    super();
  }

  async create(userDto: createUserDto): Promise<IUserDocument> {
    const user = await this.repository.create(userDto);
    return user;
  }
}
