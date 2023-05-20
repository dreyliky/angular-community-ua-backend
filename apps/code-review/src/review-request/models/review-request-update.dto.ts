import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { ReviewRequestStatusEnum } from '../enums';

export class ReviewRequestUpdateDto {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    public readonly description?: string;

    @ApiProperty({ enum: ReviewRequestStatusEnum })
    @IsEnum(ReviewRequestStatusEnum)
    @Type(() => Number)
    @IsOptional()
    @IsNotEmpty()
    public readonly status?: ReviewRequestStatusEnum;
}
