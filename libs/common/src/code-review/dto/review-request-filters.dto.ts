import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ReviewRequestStatusEnum } from '../enums';

export class ReviewRequestFiltersDto {
    @ApiProperty({ enum: ReviewRequestStatusEnum })
    @Type(() => Number)
    @IsEnum(ReviewRequestStatusEnum)
    @IsNotEmpty()
    public readonly status?: ReviewRequestStatusEnum;
}
