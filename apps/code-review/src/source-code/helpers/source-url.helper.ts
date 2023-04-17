import { BadRequestException } from '@nestjs/common';

export function validateSourceUrl(url: string): void {
    const isUrlValid = isStackblitzUrl(url) || isGithubUrl(url);

    if (!isUrlValid) {
        throw new BadRequestException();
    }
}

export function isStackblitzUrl(url: string): boolean {
    const stackblitzUrlRegex = /^https:\/\/stackblitz\.com\/edit\/[a-zA-Z0-9-]+$/;

    return stackblitzUrlRegex.test(url);
}

export function isGithubUrl(url: string): boolean {
    const githubUrlRegex = /^https:\/\/github\.com\/[a-zA-Z0-9-]+\/[a-zA-Z0-9-]+$/;

    return githubUrlRegex.test(url);
}
