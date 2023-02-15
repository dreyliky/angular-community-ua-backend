import { TelegramLoginResponseDto } from '../models';

export function convertTelegramLoginResponseToHashRawValue(data: TelegramLoginResponseDto): string {
    const dataCheckArr = [];

    for (const [key, value] of Object.entries(data)) {
        if (key !== 'hash') {
            dataCheckArr.push(`${key}=${value}`);
        }
    }

    dataCheckArr.sort();

    return dataCheckArr.join('\n');
}
