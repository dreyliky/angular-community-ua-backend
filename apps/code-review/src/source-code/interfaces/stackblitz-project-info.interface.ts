export interface StackblitzInfo {
    auth: unknown;
    features: unknown;
    config: Config;
    webcontainer: Webcontainer;
    starters: unknown;
    project: Project;
    integrations: unknown;
}

export interface StackblitzEntitiesDictionary {
    [key: string]: StackblitzFile | StackblitzFolder;
}

export interface StackblitzFolder {
    name: string;
    type: StackblitzEntityType;
    fullPath: string;
    lastModified: number;
}

export interface StackblitzFile {
    name: string;
    type: StackblitzEntityType;
    contents: string;
    fullPath: string;
    lastModified: number;
}

export type StackblitzEntity = StackblitzFile | StackblitzFolder;

type StackblitzEntityType = 'file' | 'folder';

interface Config {
    staticAssetHost: string;
    iframeUrl: string;
    relayOrigin: string;
    exportGithubUrl: string;
    editorUrl: string;
    editorOrigin: string;
    servicesUrl: string;
    tswUrl: string;
    prettierwUrl: string;
    appInitialized: boolean;
    env: unknown;
    otaAllowed: boolean;
    fbp: string;
    fba: string;
    db: boolean;
}

interface Webcontainer {
    version: string;
    serverVersion: string;
    baseUrl: string;
    serverUrl: string;
    isolationPolicy?: any;
    exportName?: any;
}

interface Project {
    appFiles: StackblitzEntitiesDictionary;
    canAdministrate: boolean;
    canChangeVisibility: boolean;
    canFork: boolean;
    canMakePrivate: boolean;
    canManage: boolean;
    canUploadFiles: boolean;
    canUsePaidFeatures: boolean;
    canView: boolean;
    currentUserIsOwner: boolean;
    dependencies: unknown;
    description: string;
    editedAt: Date;
    forks: number;
    framework?: any;
    frozen?: any;
    guestId?: any;
    id: number;
    invitees: any[];
    lastEditor: unknown;
    organization?: any;
    owner: unknown;
    preset: string;
    settings: unknown;
    slug: string;
    title: string;
    userIsParticipant: boolean;
    views: number;
    visibility: string;
    editorLivePresence: boolean;
}
