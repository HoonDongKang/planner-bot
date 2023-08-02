import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString, isArray } from 'class-validator';

export class GptDto {
  @ApiProperty({ name: 'prompt', example: 'string' })
  @IsString()
  prompt: string;

  @ApiProperty({ name: 'prompt', example: 'string' })
  @IsArray()
  @IsOptional()
  context?: Array<any>;
}
