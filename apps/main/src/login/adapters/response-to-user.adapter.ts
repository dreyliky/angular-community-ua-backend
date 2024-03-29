import { Schema } from '@acua/shared/mongo';
import { TelegramLoginDto } from '../dto';

export function adaptTelegramResponseToUser(
    dataResponse: TelegramLoginDto,
    encryptedToken: string
): Schema.User {
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
