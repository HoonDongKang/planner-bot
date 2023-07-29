import { Body, Controller, Get, Post } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('/')
  async getAnswer(@Body('prompt') prompt: string) {
    const response = await this.gptService.getModelAnswer(prompt);

    return response;
  }
  @Get('/hello')
  async test() {
    this.gptService.test();
    return 0;
  }
}
