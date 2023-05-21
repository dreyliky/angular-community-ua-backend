import { UserDto } from '@acua/common/m-user';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform, Type } from 'class-transformer';
import { IsEnum, IsString } from 'class-validator';
import { ReviewRequestStatusEnum } from '../enums';

@Exclude()
export class ReviewRequestDto {
    @ApiProperty()
    @Expose({ name: '_id' })
    @Transform(({ obj: document }) => document._id.toString())
    public readonly id: string;

    @ApiProperty()
    @Expose()
    @Type(() => UserDto)
    public readonly user: UserDto;

    @ApiProperty()
    @Expose()
    @IsString()
    public readonly description: string;

    @ApiProperty({ enum: ReviewRequestStatusEnum })
    @Expose()
    @IsEnum(ReviewRequestStatusEnum)
    public readonly status: ReviewRequestStatusEnum;

    @ApiProperty()
    @Expose()
    public readonly sourceUrl: string;

    @ApiProperty()
    @Expose()
    public readonly date: Date;
}
