import { ApiProperty } from '@nestjs/swagger';
import { ProjectEntity } from '../types';
import { BaseProjectEntity } from './base-project-entity.model';

export class ProjectFolder extends BaseProjectEntity {
    @ApiProperty({
        description: 'Array of ProjectFolder or ProjectFile objects.'
    })
    public children: ProjectEntity[];
}
