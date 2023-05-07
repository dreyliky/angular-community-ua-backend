import { ProjectEntityTypeEnum } from '../enums';
import { ProjectFile, ProjectFolder } from '../models';
import { ProjectEntity } from '../types';

export function isProjectFile(entity: ProjectEntity): entity is ProjectFile {
    return entity.type === ProjectEntityTypeEnum.File;
}

export function isProjectFolder(entity: ProjectEntity): entity is ProjectFolder {
    return entity.type === ProjectEntityTypeEnum.Folder;
}
