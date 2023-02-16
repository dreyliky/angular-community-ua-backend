import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TelegramLoginResponseDto {
    @ApiProperty()
    @IsNotEmpty()
    public readonly auth_date: number;

    @ApiProperty()
    @IsNotEmpty()
    public readonly first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly hash: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly id: number;

    @ApiProperty()
    @IsNotEmpty()
    public readonly last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly photo_url: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly username: string;
}
