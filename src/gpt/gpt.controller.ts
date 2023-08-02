import { Body, Controller, Get, Post } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GptDto } from './dto/gpt.dto';
@ApiTags('gpt')
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('/')
  @ApiOperation({
    summary: 'prompt에 첫 요청을 보낼 때 사용',
    description:
      '첫 요청에 대한 응답(assistant)과 전체 메세지 로그(context)를 응답',
  })
  async firstChat(@Body() Body: GptDto) {
    const response = await this.gptService.chatCompleGpt(
      Body.prompt,
      Body.context,
    );

    return response;
  }

  @Get('')
  test() {
    return this.gptService.test();
  }
}
