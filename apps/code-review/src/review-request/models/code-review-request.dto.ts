import { UserDto } from '@acua/shared/m-user';
import { ApiProperty } from '@nestjs/swagger';
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
