import { isGithubUrl } from '../helpers';

export function normalizeSourceUrl(sourceUrl: string): string {
    if (isGithubUrl(sourceUrl)) {
        return adaptGithubUrlToStackblitzUrl(sourceUrl);
    }

    return sourceUrl;
}

function adaptGithubUrlToStackblitzUrl(githubUrl: string): string {
    const githubUrlParts = githubUrl.split('/');
    const githubUsername = githubUrlParts[githubUrlParts.length - 2];
    const githubRepositoryName = githubUrlParts[githubUrlParts.length - 1];

    return `https://stackblitz.com/github/${githubUsername}/${githubRepositoryName}`;
}
