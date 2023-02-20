import { IsNotEmpty } from 'class-validator';

export class TelegramLoginResponseDto {
    @IsNotEmpty()
    public readonly auth_date: number;

    @IsNotEmpty()
    public readonly first_name: string;

    @IsNotEmpty()
    public readonly hash: string;

    @IsNotEmpty()
    public readonly id: number;

    public readonly last_name: string;

    @IsNotEmpty()
    public readonly photo_url: string;

    @IsNotEmpty()
    public readonly username: string;
}
