import { ApiProperty } from '@nestjs/swagger';
import { BaseProjectEntity } from './base-project-entity.model';

export class ProjectFile extends BaseProjectEntity {
    @ApiProperty()
    public content: string;
}
