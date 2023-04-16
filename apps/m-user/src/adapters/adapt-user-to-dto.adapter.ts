import { UserDto } from '@acua/shared/m-user';
import { User } from '@acua/shared/m-user/schemas';

export function adaptUserToUserDto(user: User): UserDto {
    return {
        tgId: user.tgId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        photoUrl: user.photoUrl
    };
}
