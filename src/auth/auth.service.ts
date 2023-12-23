import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { BcryptService } from './bcrypt.service';
import { JwtService } from '@nestjs/jwt';
import { EMessageMapping } from 'src/common/enums/message-mapping.enum';
import { UserRepository } from 'src/user/repository.ts/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  private async userExistence(email: string): Promise<void> {
    const user = await this.userRepository.findOne({
      email,
    });

    if (user)
      throw new HttpException(EMessageMapping['#1'], HttpStatus.BAD_REQUEST);
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password, firstName, lastName } = signUpDto;
    await this.userExistence(email);

    const createdUser = await this.userRepository.create({
      email,
      password,
      firstName,
      lastName,
    });

    return {
      type: 'success',
      statusCode: 200,
      message: EMessageMapping['#13'],
      user: createdUser,
    };
  }
}
