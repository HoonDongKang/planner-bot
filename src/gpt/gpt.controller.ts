import { Body, Controller, Get, Post } from '@nestjs/common';
import { GptService } from './gpt.service';

@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post('/')
  async firstChat(@Body('prompt') prompt: string) {
    const response = await this.gptService.firstPrompt(prompt);

    return response;
  }

  @Post('/chat')
  async chatPrompt(@Body() Body: { prompt: string; context: any }) {
    const response = await this.gptService.chatPrompt(
      Body.prompt,
      Body.context,
    );

    return response;
  }
}
