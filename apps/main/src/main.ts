import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { EnvironmentKeyEnum } from './core';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(AppModule, {
        cors: { origin: '*' }
    });

    const config = new DocumentBuilder()
        .setTitle('Main Backend API')
        .setDescription('Provides base API shared for all applications.')
        .setVersion('0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env[EnvironmentKeyEnum.Port]);
}

bootstrap();
