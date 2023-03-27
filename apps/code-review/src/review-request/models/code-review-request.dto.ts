import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'apps/m-user/src/models';
import { CodeReviewRequestStatusEnum } from '../enums';

export class CodeReviewRequestDto {
    @ApiProperty()
    public readonly id: string;

    @ApiProperty()
    public readonly user: UserDto;

    @ApiProperty()
    public readonly title: string;

    @ApiProperty()
    public readonly description: string;

    @ApiProperty()
    public readonly status: CodeReviewRequestStatusEnum;

    @ApiProperty()
    public readonly sourceUrl: string;

    @ApiProperty()
    public readonly date: Date;
}
