import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { isSourceUrlValid } from '../decorators';

export class ReviewRequestCreationDto {
    @ApiProperty()
    @IsNotEmpty()
    public readonly description: string;

    @ApiProperty()
    @IsNotEmpty()
    @isSourceUrlValid()
    public readonly sourceUrl: string;
}
