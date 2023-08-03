import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.use(cookieParser());
  const config = new DocumentBuilder()
    .setTitle('Planner-Bot')
    .setDescription('Planner-Bot API description')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  SwaggerModule.setup('api', app, document);
  await app.listen(8080);
}
bootstrap();
