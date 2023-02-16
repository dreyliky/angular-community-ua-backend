import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CodeReviewModule } from './code-review.module';
import { EnvironmentKeyEnum } from './core';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create(CodeReviewModule, {
        cors: { origin: '*' }
    });

    const config = new DocumentBuilder()
        .setTitle('CodeReview API')
        .setDescription('The API for the "code-review" project.')
        .setVersion('0.1')
        .build();
    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('api', app, document);

    await app.listen(process.env[EnvironmentKeyEnum.Port]);
}

bootstrap();
