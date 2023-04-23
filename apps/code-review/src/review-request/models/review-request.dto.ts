import { UserDto } from '@acua/shared/m-user';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { ReviewRequestStatusEnum } from '../enums';

@Exclude()
export class ReviewRequestDto {
    @Expose({ name: '_id' })
    @Transform(({ obj: document }) => document._id.toString())
    @ApiProperty()
    public readonly id: string;

    @Expose()
    @Type(() => UserDto)
    @ApiProperty()
    public readonly user: UserDto;

    @Expose()
    @ApiProperty()
    public readonly title: string;

    @Expose()
    @ApiProperty()
    public readonly description: string;

    @Expose()
    @ApiProperty()
    public readonly status: ReviewRequestStatusEnum;

    @Expose()
    @ApiProperty()
    public readonly sourceUrl: string;

    @Expose()
    @ApiProperty()
    public readonly date: Date;
}
