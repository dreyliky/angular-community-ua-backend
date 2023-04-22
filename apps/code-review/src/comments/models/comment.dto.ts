import { UserDto } from '@acua/shared/m-user';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';

@Exclude()
export class CommentDto {
    @Expose({ name: '_id' })
    @Transform(({ obj: document }) => document._id.toString())
    @ApiProperty()
    public readonly id: string;

    @Expose()
    @Type(() => UserDto)
    @ApiProperty()
    public readonly reviewer: UserDto;

    @Expose()
    @ApiProperty()
    public readonly message: string;

    @Expose()
    @ApiProperty()
    public readonly date: string;
}
