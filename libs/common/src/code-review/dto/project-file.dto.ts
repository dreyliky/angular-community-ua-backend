import { ApiProperty } from '@nestjs/swagger';
import { BaseProjectEntity } from './project-base-entity.dto';

export class ProjectFile extends BaseProjectEntity {
    @ApiProperty()
    public content: string;
}
