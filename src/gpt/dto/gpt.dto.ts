import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GptDto {
  @ApiProperty({ name: 'prompt', example: 'string' })
  @IsString()
  prompt: string;
  @ApiProperty({ name: 'prompt', example: 'string' })
  @IsString()
  @IsOptional()
  context?: string;
}
