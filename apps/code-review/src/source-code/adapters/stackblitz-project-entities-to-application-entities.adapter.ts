/* eslint-disable max-lines-per-function */
import { ProjectEntityTypeEnum } from '../enums';
import { StackblitzEntity, StackblitzFile } from '../interfaces';
import { ProjectFile, ProjectFolder } from '../models';
import { ProjectEntity } from '../types';

export function adaptStackblitzEntitiesToProjectEntities(
    data: StackblitzEntity[]
): ProjectEntity[] {
    const root: ProjectFolder = createRootFolder();

    data.forEach((item) => {
        const parts = item.fullPath.split('/');
        let currentFolder = root;

        for (let i = 0; i < parts.length - 1; i++) {
            const folderName = parts[i];
            const folderFullPath = parts.slice(0, i + 1).join('/');
            currentFolder = createChildFolder(currentFolder, folderName, folderFullPath);
        }

        if (isStackblitzFile(item)) {
            const fileName = parts[parts.length - 1];
            const file = createFile(
                fileName,
                item.fullPath,
                item.lastModified,
                item.contents
            );

            currentFolder.children.push(file);
        }
    });

    return root.children;
}

function createRootFolder(): ProjectFolder {
    return {
        name: 'root',
        type: ProjectEntityTypeEnum.Folder,
        fullPath: '',
        lastModified: 0,
        children: []
    };
}

function createChildFolder(
    parent: ProjectFolder,
    name: string,
    fullPath: string
): ProjectFolder {
    let childFolder = parent.children.find((child) => (
        child.name === name &&
        child.type === ProjectEntityTypeEnum.Folder
    ));

    if (!childFolder) {
        childFolder = {
            name: name,
            type: ProjectEntityTypeEnum.Folder,
            fullPath: fullPath,
            lastModified: 0,
            children: []
        };

        parent.children.push(childFolder);
    }

    return (childFolder as ProjectFolder);
}

function createFile(
    name: string,
    fullPath: string,
    lastModified: number,
    contents: string
): ProjectFile {
    return {
        name: name,
        type: ProjectEntityTypeEnum.File,
        fullPath: fullPath,
        lastModified: lastModified,
        content: contents
    };
}

function isStackblitzFile(entity: StackblitzEntity): entity is StackblitzFile {
    return (entity.type === 'file');
}
