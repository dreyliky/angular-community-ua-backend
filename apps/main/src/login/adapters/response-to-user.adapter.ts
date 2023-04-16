import { User } from '@acua/shared/m-user';
import { TelegramLoginResponseDto } from '../models';

export function adaptTelegramResponseToUser(
    dataResponse: TelegramLoginResponseDto,
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
