import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { GptService } from './gpt.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { GptDto } from './dto/gpt.dto';
import { TokenDto } from './dto/token.dto';
import { Response as expRes } from 'express';
import { TokenGuard } from './token.auth.guard';
@ApiTags('gpt')
@Controller('gpt')
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @UseGuards(TokenGuard)
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

  @Post('/token')
  generateToken(@Body() toeknDto: TokenDto, @Res() res: expRes) {
    const { token } = this.gptService.generateToken(toeknDto);
    res.cookie('gpt_token', token, {
      domain: '.plannerbot.vercel.app',
      secure: true,
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, //7d,
      sameSite: 'lax',
      path: '/',
    });
    return res.send({ token });
  }

  @UseGuards(TokenGuard)
  @Get('')
  test() {
    const payload = `"{\n  \"Day 1\": [\n    \"Tsukiji Fish Market\",\r\n    \"Asakusa\",\r\n    \"Tokyo Disneyland\"\n  ],\n  \"Day 2\": [\n    \"Shinjuku Gyoen National Garden\",\r\n    \"Meiji Shrine\",\r\n    \"Omotesando\",\r\n    \"Harajuku\"\n  ]\n}"`;
    return this.gptService.replacingText(payload);
  }
}
