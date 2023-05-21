import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { IsSourceUrlValid } from '../decorators';

export class ReviewRequestCreationDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsSourceUrlValid()
    public readonly sourceUrl: string;
}
