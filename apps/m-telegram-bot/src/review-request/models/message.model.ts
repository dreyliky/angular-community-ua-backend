import { ReviewRequestDto } from '@acua/shared/code-review';
import * as TelegramBot from 'node-telegram-bot-api';

interface Options {
    reviewRequest: ReviewRequestDto;
    reviewPageUrl: string;
    commentAmount: number;
    reviewerAmount: number;
}

export class ReviewRequestMessage {
    public readonly text: string =
        `Користувач @${this.options.reviewRequest.user.username} ` +
        `очікує Код-Ревью у спільноти.\n\n` +
        `Ревьюверів: ${this.options.reviewerAmount}; Коментарів: ${this.options.commentAmount};`;

    public readonly keyboard: TelegramBot.InlineKeyboardMarkup = {
        inline_keyboard: [
            [
                {
                    text: 'Почати Код-Ревью',
                    url: `${this.options.reviewPageUrl}/${this.options.reviewRequest.id}`
                }
            ]
        ]
    };

    constructor(private readonly options: Options) {}
}
