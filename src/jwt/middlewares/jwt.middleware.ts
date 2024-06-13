import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { NextFunction, Response } from 'express';

export interface RequestModel {
  //user: UserDto;
  headers: any;
}

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  //   constructor(
  //     private readonly authService: AuthService,
  //     private readonly userService: UsersService,
  //   ) {}

  async use(
    req: RequestModel,
    res: Response,
    next: NextFunction,
  ): Promise<any> {
    try {
      const tokenArray: string[] = req.headers['authorization'].split(' ');
      //TODO Una vez que se defina el usuario, se debe poner las autenticaciones por JWT
      next();
      //   const decodedToken = await this.authService.verifyJwt(tokenArray[1]);

      //   const user = await this.userService.getUserInfoGeneratedToken(
      //     decodedToken.sub,
      //   );

      //   if (decodedToken) {
      //     if (user.id == decodedToken.sub) next();
      //     else throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      //   } else {
      //     throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
      //   }
    } catch (e) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
