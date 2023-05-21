import { UserDto } from '@acua/common/m-user';
import { User } from '@acua/shared/mongo';

export function adaptUserToUserDto(user: User): UserDto {
    return {
        tgId: user.tgId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        photoUrl: user.photoUrl
    };
}
