import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
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
}
