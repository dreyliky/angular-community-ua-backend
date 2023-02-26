import { Module } from '@nestjs/common';
import { HttpExceptionFilter } from './filters';
import { LoggerService } from './services';

@Module({
    providers: [LoggerService, HttpExceptionFilter],
    exports: [LoggerService, HttpExceptionFilter]
})
export class LoggerModule {}
