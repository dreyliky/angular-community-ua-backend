import { TelegramLoginDto } from '../models';

export function convertTelegramLoginResponseToHashRawValue(data: TelegramLoginDto): string {
    const dataCheckArr = [];

    for (const [key, value] of Object.entries(data)) {
        if (key !== 'hash') {
            dataCheckArr.push(`${key}=${value}`);
        }
    }

    dataCheckArr.sort();

    return dataCheckArr.join('\n');
}
