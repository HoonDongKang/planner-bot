import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
@Injectable()
export class GptService {
  private readonly openAiApi: OpenAIApi;
  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      organization: this.configService.get<string>('AYStAVte9iRqldzS7dUQC3wC'),
      apiKey: this.configService.get<string>('CHAT_GPT_API_KEY'),
    });
    this.openAiApi = new OpenAIApi(configuration);
  }

  async getModelAnswer(prompt: string) {
    const response = await this.openAiApi.createChatCompletion({
      model: this.configService.get<string>('CHAT_GPT_MODEL'),
      messages: [
        {
          role: 'system',
          content: `You should play a role as an expert in making travel plans. There are some rules in the way you respond. 
      First, you should write 'Day n:' in front of the nth day's plan. Second, you should response the list of places without any description. Third, you should put '/' between the places. Lastly, you must not say closing remarks.
      `,
        },
      ],
    });

    return response.data.choices[0].message.content;
  }

  async test() {
    const env = this.configService.get<string>('CHAT_GPT_SYSTEM');
    console.log(env);
  }
}
