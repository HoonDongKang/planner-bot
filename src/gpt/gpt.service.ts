import { Injectable, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { response } from 'express';
import {
  Configuration,
  OpenAIApi,
  CreateCompletionRequest,
  ChatCompletionRequestMessage,
} from 'openai';
@Injectable()
export class GptService {
  private readonly openAiApi: OpenAIApi;
  constructor(private configService: ConfigService) {
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
        content: this.configService.get<string>('CHAT_GPT_SYSTEM'),
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

  async firstPrompt(prompt: string) {
    const baseCmd = this.basePromptCmd();
    const firstChat = [...baseCmd, { role: 'user', content: prompt }] as any;
    const response = await this.openAiApi.createChatCompletion({
      model: this.configService.get<string>('CHAT_GPT_MODEL'),
      messages: firstChat,
    });

    const chatLog = [
      ...firstChat,
      { role: 'assistant', content: response.data.choices[0].message.content },
    ];

    return {
      messages: response.data.choices[0].message,
      context: chatLog,
    };
  }

  async chatPrompt(prompt: string, context: any) {
    const chatContext = [...context, { role: 'user', content: prompt }] as any;
    const response = await this.openAiApi.createChatCompletion({
      model: this.configService.get<string>('CHAT_GPT_MODEL'),
      messages: chatContext,
    });
    console.log(response);
    const chatLog = [
      ...chatContext,
      { role: 'assistant', content: response.data.choices[0].message.content },
    ];
    return {
      messages: response.data.choices[0].message,
      context: chatLog,
    };
  }
}
