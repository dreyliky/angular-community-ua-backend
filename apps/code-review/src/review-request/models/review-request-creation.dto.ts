import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { isSourceUrlValid } from '../decorators';

export class ReviewRequestCreationDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    public readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    @isSourceUrlValid()
    public readonly sourceUrl: string;
}
