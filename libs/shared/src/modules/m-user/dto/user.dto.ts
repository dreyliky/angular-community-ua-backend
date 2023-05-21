import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserDto {
    @Expose()
    @ApiProperty()
    public readonly tgId: number;

    @Expose()
    @ApiProperty()
    public readonly firstName: string;

    @Expose()
    @ApiProperty()
    public readonly lastName: string;

    @Expose()
    @ApiProperty()
    public readonly username: string;

    @Expose()
    @ApiProperty()
    public readonly photoUrl: string;
}
