import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramBotService {
    public getHello(): string {
        return 'Telegram Bot ACUA backend!';
    }
}
