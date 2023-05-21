import {
    ProjectEntity,
    ProjectEntityTypeEnum,
    ProjectFile,
    ProjectFolder
} from '@acua/common/code-review';

export function isProjectFile(entity: ProjectEntity): entity is ProjectFile {
    return entity.type === ProjectEntityTypeEnum.File;
}

export function isProjectFolder(entity: ProjectEntity): entity is ProjectFolder {
    return entity.type === ProjectEntityTypeEnum.Folder;
}
