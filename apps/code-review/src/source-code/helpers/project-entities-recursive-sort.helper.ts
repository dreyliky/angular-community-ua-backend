import { ProjectEntity } from '@acua/common/code-review';
import { isProjectFile, isProjectFolder } from './project-entity-determinator.helper';

export function sortProjectEntitiesRecursively(entities: ProjectEntity[]): ProjectEntity[] {
    return entities
        .sort((a, b) => {
            if (isProjectFolder(a) && isProjectFile(b)) {
                return -1;
            } else if (isProjectFile(a) && isProjectFolder(b)) {
                return 1;
            }

            return a.name.localeCompare(b.name);
        })
        .map((entity) => {
            if (isProjectFolder(entity)) {
                entity.children = sortProjectEntitiesRecursively(entity.children);
            }

            return entity;
        });
}
