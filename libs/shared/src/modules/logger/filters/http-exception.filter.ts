import { ArgumentsHost, Catch, HttpException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { Request } from 'express';
import { LoggerService } from '../services';

@Catch()
export class HttpExceptionFilter extends BaseExceptionFilter {
    constructor(private readonly loggerService: LoggerService) {
        super();
    }

    public catch(exception: HttpException, host: ArgumentsHost): void {
        const context = host.switchToHttp();
        const request = context.getRequest<Request>();
        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;
        const message = JSON.stringify({
            status,
            message: exception.message,
            url: request.url,
            method: request.method,
            queryParams: JSON.stringify(request.params),
            body: JSON.stringify(request.body),
            headers: JSON.stringify(request.headers)
        });

        this.loggerService.error(message);
        super.catch(exception, host);
    }
}
