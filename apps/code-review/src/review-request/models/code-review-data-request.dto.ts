import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CodeReviewDataRequestDto {
    @ApiProperty()
    @IsNotEmpty()
    public readonly title: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly sourceUrl: string;
}
