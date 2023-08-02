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
    summary:
      '사용자 요청(prompt)와 채팅 로그(context)를 통해 GPT 응답을 불러옵니다.',
    description:
      '첫 요청 시에는 prompt만 매개변수로 사용하고, 그 이후 채팅부터 context를 포함해주세요.',
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
