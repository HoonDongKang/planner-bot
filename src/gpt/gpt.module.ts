import { Module } from '@nestjs/common';
import { GptController } from './gpt.controller';
import { GptService } from './gpt.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenStrategy } from './jwt.strategy';

@Module({
  imports: [ConfigModule, JwtModule.register({})],
  controllers: [GptController],
  providers: [GptService, TokenStrategy],
})
export class GptModule {}
