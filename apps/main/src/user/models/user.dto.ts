import { ApiProperty } from '@nestjs/swagger';
import { Types } from 'mongoose';

export class UserResponseDto {
    @ApiProperty()
    public readonly _id: Types.ObjectId;

    @ApiProperty()
    public readonly username: string;

    @ApiProperty()
    public readonly tgId: number;

    @ApiProperty()
    public readonly photoUrl: string;

    @ApiProperty()
    public readonly firstName: string;

    @ApiProperty()
    public readonly lastName: string;
}
