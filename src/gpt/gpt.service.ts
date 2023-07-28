import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from 'openai';
@Injectable()
export class GptService {
  private readonly openAiApi: OpenAIApi;
  constructor() {
    const configuration = new Configuration({
      organization: '',
      apiKey: process.env.OPENAI_API_KEY,
    });
    this.openAiApi = new OpenAIApi(configuration);
  }

  async getModelAnswer(question: string) {}
}
