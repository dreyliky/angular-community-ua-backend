import { UserDto } from '@acua/shared/m-user';

export interface ReviewRequestDto {
    readonly id: string;
    readonly user: UserDto;
    readonly description: string;
    readonly status: number;
    readonly sourceUrl: string;
    readonly date: Date;
}
