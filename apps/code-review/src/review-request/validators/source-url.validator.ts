import { Injectable } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
import { isGithubUrl, isStackblitzUrl } from '../../source-code';

@ValidatorConstraint({ async: false })
@Injectable()
export class SourceUrlValidator implements ValidatorConstraintInterface {
    public validate(url: string): boolean {
        return isStackblitzUrl(url) || isGithubUrl(url);
    }

    public defaultMessage(): string {
        return 'Invalid source url. Please, use github or stackblitz link to your source';
    }
}
