import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntity } from '../types';
import { BaseProjectEntity } from './project-base-entity.dto';

export class ProjectFolder extends BaseProjectEntity {
    @ApiProperty({
        description: 'Array of ProjectFolder or ProjectFile objects.',
        type: BaseProjectEntity,
        isArray: true
    })
    public children: ProjectEntity[];
}
