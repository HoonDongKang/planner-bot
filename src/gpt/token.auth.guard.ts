import {
  Injectable,
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class TokenGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log(request.cookies);
    const { gpt_token } = request.cookies;
    if (!gpt_token) return true;
    else {
      throw new HttpException(
        '5회 무료 이용이 끝났습니다.',
        HttpStatus.FORBIDDEN,
      );
    }
  }
}
