import { Injectable } from '@nestjs/common';
import { AppFile, AppFolder, StackblitzInfo } from '../interfaces';

@Injectable()
export class StackblitzProjectParser {
    /** Stackblitz info inside script tag which described by this RegExp */
    private readonly regExp = /<script type="application\/json" data-redux-store="">(.*)<\/script>/;

    public parse(stackblitzProjectHtml: string): Array<AppFile | AppFolder> {
        const match = stackblitzProjectHtml.match(this.regExp);
        const stackblitzInfoAsJson = match[1];
        const stackblitzInfo: StackblitzInfo = JSON.parse(stackblitzInfoAsJson);
        const appFilesAsDictionary = stackblitzInfo.project.appFiles;

        return Object.values(appFilesAsDictionary);
    }
}
