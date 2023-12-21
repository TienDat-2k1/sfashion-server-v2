import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/user/schema/user.schema';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    try {
      const user = new User();
      user.email = email;
      user.password = password;
      await this.userService.create(user);
    } catch (error) {}
  }
}
