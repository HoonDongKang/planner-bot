import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Configuration, OpenAIApi, ChatCompletionRequestMessage } from 'openai';
@Injectable()
export class GptService {
  private readonly openAiApi: OpenAIApi;
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {
    const configuration = new Configuration({
      organization: this.configService.get<string>('CHAT_GPT_ORGANIZATION_ID'),
      apiKey: this.configService.get<string>('CHAT_GPT_API_KEY'),
    });
    this.openAiApi = new OpenAIApi(configuration);
  }

  basePromptCmd() {
    const context: Array<ChatCompletionRequestMessage> = [
      {
        role: 'system',
        content: this.replacingText(
          this.configService.get<string>('CHAT_GPT_SYSTEM'),
        ),
      },
      {
        role: 'user',
        content: this.configService.get<string>('CHAT_GPT_USER'),
      },
      {
        role: 'assistant',
        content: 'Sure, I will follow all rules.',
      },
    ];
    return context;
  }

  replacingText(text: string) {
    const replacedText = text.replace(/\n/g, '');
    return replacedText;
  }

  async getResFromGpt(prompt: string, context?: any) {
    const reqToGpt = [
      ...context,
      { role: 'user', content: this.replacingText(prompt) },
    ];
    const resFromGpt = await this.openAiApi.createChatCompletion({
      model: this.configService.get<string>('CHAT_GPT_MODEL'),
      messages: reqToGpt,
      temperature: 1.5,
      max_tokens: 300,
    });
    const chatLog = [...reqToGpt, resFromGpt.data.choices[0].message];

    return {
      messages: resFromGpt.data.choices[0].message,
      chatLog,
    };
  }

  async chatCompleGpt(prompt: string, context?: any) {
    if (!context) {
      const baseCmd = this.basePromptCmd();
      const { messages, chatLog } = await this.getResFromGpt(prompt, baseCmd);
      return { messages, chatLog };
    } else {
      const { messages, chatLog } = await this.getResFromGpt(prompt, context);
      return { messages, chatLog };
    }
  }

  generateToken(payload: { ip: string }) {
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });

    return { token };
  }

  test() {
    const test =
      '{"Day1":["GyeongbokgungPalace","BukchonHanokVillage","Myeongdong"],"Day2":["NamsanTower","Insadong"]}';

    const test2 = this.configService.get<string>('CHAT_GPT_SYSTEM');
    return this.replacingText(test2);
  }
}
