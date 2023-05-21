import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CommentCreationDto {
    @ApiProperty()
    @IsNotEmpty()
    public readonly fileFullPath: string;

    @ApiProperty()
    @IsNumber()
    public readonly lineNumber: number;

    @ApiProperty()
    @IsNotEmpty()
    public readonly message: string;
}
