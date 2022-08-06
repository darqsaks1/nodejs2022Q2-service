import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { ANSWERS } from '../../../ts/answers';
import * as jwt from 'jsonwebtoken';
import { Jwt } from 'jsonwebtoken';

@Injectable()
export class AuthSettings implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const bearer: string = context.switchToHttp().getRequest()
      .headers.authorization;
    let guardFlag = false;
    if (!bearer) {
      guardFlag = false;
      throw new UnauthorizedException(ANSWERS.AUTHORIZATION.NOT_TOKEN);
    }
    const preparedToken: string = bearer.replace('Bearer ', '');
    jwt.verify(
      preparedToken,
      process.env.JWT_SECRET_KEY,
      null,
      (err: jwt.VerifyErrors, decoded: Jwt | undefined) => {
        if (decoded) {
          guardFlag = true;
        }

        if (err) {
          guardFlag = false;
          throw new UnauthorizedException(ANSWERS.AUTHORIZATION.INVALID);
        }
      },
    );
    return guardFlag;
  }
}
