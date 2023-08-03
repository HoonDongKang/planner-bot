import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
// import { GptService } from './gpt.service';
import { Request } from 'express';

@Injectable()
export class TokenStrategy extends PassportStrategy(Strategy, 'userToken') {
  constructor(
    private configService: ConfigService, // private GptService: GptService,
  ) {
    super({
      jwtFromRequest:
        //authorization에서 jwt 추출
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      passReqToCallback: true,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(
    req: Request,
    payload: { sub: string; exp: number; idx: number },
  ) {
    return payload;
  }
}
