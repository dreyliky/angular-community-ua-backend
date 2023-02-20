import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class HttpExceptionDto {
    @ApiProperty({ enum: HttpStatus, enumName: 'HttpStatus' })
    public statusCode: HttpStatus;

    @ApiProperty()
    public message: string;

    @ApiProperty()
    public error: string;
}
