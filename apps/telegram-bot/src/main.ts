import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { EnvironmentKeyEnum } from './core';
import { TelegramBotModule } from './telegram-bot.module';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(TelegramBotModule);
    // app.useGlobalPipes(new ValidationPipe());
    const config = new DocumentBuilder()
        .setTitle('Telegram API')
        .setDescription('The telegram-bot API description')
        .setVersion('1.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env[EnvironmentKeyEnum.Port]);
}

bootstrap();
