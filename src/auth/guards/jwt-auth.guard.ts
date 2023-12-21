import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import jwtConfig from 'src/common/config/jwt.config';
import { ActiveUserData } from 'src/common/interfaces/active-user-data.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;
    // const request = context.switchToHttp().getRequest();
    // const token = this.getToken(request);
    // if (!token) {
    //   throw new UnauthorizedException('Authorization token is required');
    // }

    return true;

    // try {
    //   const payload = await this.jwtService.verifyAsync<ActiveUserData>(
    //     token,
    //     this.jwtConfiguration,
    //   );
    // } catch (error) {}
  }

  private getToken(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
