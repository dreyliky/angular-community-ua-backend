import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntityTypeEnum } from '../enums';

export abstract class BaseProjectEntity {
    @ApiProperty()
    public name: string;

    @ApiProperty({ enum: ProjectEntityTypeEnum, enumName: 'ProjectEntityTypeEnum' })
    public type: ProjectEntityTypeEnum;

    @ApiProperty()
    public fullPath: string;

    @ApiProperty()
    public lastModified: number;
}
