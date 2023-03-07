import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly tgId: number;

    @ApiProperty()
    public readonly firstName: string;

    @ApiProperty()
    public readonly lastName: string;

    @ApiProperty()
    public readonly username: string;

    @ApiProperty()
    public readonly photoUrl: string;

    @ApiProperty()
    public readonly auth_date: number;

    @ApiProperty()
    public readonly accessToken: string;
}
