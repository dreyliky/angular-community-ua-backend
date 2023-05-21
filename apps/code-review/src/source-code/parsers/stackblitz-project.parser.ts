/* eslint-disable no-useless-concat */
import { StackblitzFile, StackblitzFolder, StackblitzInfo } from '@acua/shared/code-review';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class StackblitzProjectParser {
    /** Stackblitz info inside script tag which described by this RegExp */
    private readonly regExp = /<script type="application\/json" data-redux-store="">(.*)<\/script>/;
    // Strings concat below fixes incorrect error result when project sourceUrl is THIS BACKEND PROJECT :)
    private readonly stackblitzDivCssErrorClasses = [
        'class="' + 'public-status error"',
        'class="' + 'public-section__error"',
        'https://developer.stackblitz.com/guides' +
            '/user-guide/importing-projects#importing-private-projects'
    ];

    public parse(stackblitzProjectHtml: string): Array<StackblitzFile | StackblitzFolder> {
        this.validateStackblitzPageErrors(stackblitzProjectHtml);

        const match = stackblitzProjectHtml.match(this.regExp);
        const stackblitzInfoAsJson = match[1];
        const stackblitzInfo: StackblitzInfo = JSON.parse(stackblitzInfoAsJson);
        const appFilesAsDictionary = stackblitzInfo.project.appFiles;

        return Object.values(appFilesAsDictionary);
    }

    private validateStackblitzPageErrors(stackblitzProjectHtml: string): void {
        const withErrors = this.stackblitzDivCssErrorClasses.some(
            (errorPattern) => stackblitzProjectHtml.indexOf(errorPattern) !== -1
        );

        if (withErrors) {
            throw new NotFoundException();
        }
    }
}
