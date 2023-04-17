import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class TelegramLoginDto {
    @ApiProperty()
    @IsNotEmpty()
    public readonly auth_date: number;

    @ApiProperty()
    public readonly first_name: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly hash: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly id: number;

    @ApiProperty()
    public readonly last_name: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly photo_url: string;

    @ApiProperty()
    @IsNotEmpty()
    public readonly username: string;
}
