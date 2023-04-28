import { Injectable, NotFoundException } from '@nestjs/common';
import { StackblitzFile, StackblitzFolder, StackblitzInfo } from '../interfaces';

@Injectable()
export class StackblitzProjectParser {
    /** Stackblitz info inside script tag which described by this RegExp */
    private readonly regExp = /<script type="application\/json" data-redux-store="">(.*)<\/script>/;
    private readonly stackblitzDivCssErrorClasses = [
        'public-status error',
        'public-section__error'
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
        const withErrors = this.stackblitzDivCssErrorClasses.some((errorClass) => {
            // Wrapper below fixes incorrect error result when project sourceUrl is THIS BACKEND PROJECT :)
            const errorSelector = `class="${errorClass}"`;

            return stackblitzProjectHtml.indexOf(errorSelector) !== -1;
        });

        if (withErrors) {
            throw new NotFoundException(`Can't resolve project information.`);
        }
    }
}
