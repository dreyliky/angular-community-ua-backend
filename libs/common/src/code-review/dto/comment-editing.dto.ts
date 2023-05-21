import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CommentEditingDto {
    @ApiProperty()
    @IsNotEmpty()
    public readonly message: string;
}
