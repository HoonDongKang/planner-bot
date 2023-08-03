import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class TokenDto {
  @ApiProperty({ name: 'ip', example: 'string' })
  @IsString()
  ip: string;
}
