import { Injectable } from '@nestjs/common';

@Injectable()
export class TelegramBotService {
  getHello(): string {
    return 'Telegram Bot ACUA backend!';
  }
}
