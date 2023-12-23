import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { User } from './schema/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}
}
