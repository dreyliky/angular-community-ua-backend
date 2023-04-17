import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createLogger, format, transports } from 'winston';
import { LOGGER_ENVIRONMENT_KEY as ENV_KEY } from '../data';
import { LogTypeEnum } from '../enums';

@Injectable()
export class LoggerService {
    private readonly host = this.configService.get(ENV_KEY.LoggerHost);
    private readonly apiKey = this.configService.get(ENV_KEY.LoggerApiKey);
    private readonly appName = this.configService.get(ENV_KEY.LoggerAppName);

    private readonly parameters: transports.HttpTransportOptions = {
        host: this.host,
        path: `/api/v2/logs?dd-api-key=${this.apiKey}&ddsource=nodejs&service=${this.appName}`,
        ssl: true
    };

    private readonly logger = createLogger({
        exitOnError: false,
        format: format.json(),
        transports: [new transports.Http(this.parameters)]
    });

    constructor(private readonly configService: ConfigService) {}

    public info(message: string): void {
        this.logger.log(LogTypeEnum.Info, message);
    }

    public error(message: string): void {
        this.logger.log(LogTypeEnum.Error, message);
    }

    public warn(message: string): void {
        this.logger.log(LogTypeEnum.Warn, message);
    }
}
