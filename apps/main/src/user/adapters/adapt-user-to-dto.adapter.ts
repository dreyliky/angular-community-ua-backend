import { UserDto } from '../models';
import { User } from '../user.entity';

export function adaptUserToUserDto(user: User): UserDto {
    return {
        tgId: user.tgId,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        photoUrl: user.photoUrl
    };
}
