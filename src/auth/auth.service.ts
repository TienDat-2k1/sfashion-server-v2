import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from 'src/user/schema/user.schema';
import { BcryptService } from './bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { EMessageMapping } from 'src/common/enums/message-mapping.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  private async userExistence(email: string): Promise<void> {
    const user = await this.userService.getByEmail(email);

    if (user)
      throw new HttpException(EMessageMapping['#1'], HttpStatus.BAD_REQUEST);
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    await this.userExistence(email);

    try {
      const user = new User();
      user.email = email;
      user.password = password;
      await this.userService.create(user);
    } catch (error) {
      console.log(error);
    }
  }
}
