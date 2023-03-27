import { LoggerModule } from '@acua/shared/logger';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { SwaggerModule } from '@nestjs/swagger';
import { AppController } from './app.controller';
import { ReviewRequestModule } from './review-request';
import { SourceCodeModule } from './source-code';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [`${__dirname}/.env`],
            isGlobal: true
        }),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            signOptions: { expiresIn: '1d' }
        }),
        LoggerModule,
        SwaggerModule,
        SourceCodeModule,
        ReviewRequestModule

    ],
    controllers: [AppController]
})
export class AppModule {}
