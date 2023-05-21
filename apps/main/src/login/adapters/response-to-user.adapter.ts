import { User } from '@acua/shared/mongo';
import { TelegramLoginDto } from '../models';

export function adaptTelegramResponseToUser(
    dataResponse: TelegramLoginDto,
    encryptedToken: string
): User {
    return {
        tgId: dataResponse.id,
        firstName: dataResponse.first_name,
        lastName: dataResponse.last_name,
        auth_date: dataResponse.auth_date,
        photoUrl: dataResponse.photo_url,
        username: dataResponse.username,
        accessToken: encryptedToken
    };
}
