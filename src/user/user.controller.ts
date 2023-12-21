import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';
import { User } from './schema/user.schema';

@Controller('users')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Get('me')
  async getMe(@ActiveUser('id') userId: string): Promise<User> {
    return this.usersService.getMe(userId);
  }
}
