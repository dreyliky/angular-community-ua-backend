import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CodeReviewRequestDto } from '../models';
import { CodeReviewRequestDocument } from './../schemas';

export async function adaptCodeReviewRequestDocumentToDtoOne(
    data: CodeReviewRequestDocument,
    mUserClient: ClientProxy
): Promise<CodeReviewRequestDto> {
    const user = await firstValueFrom(mUserClient.send('adapt_user_to_dto_one', data.user));

    return {
        id: data._id.toString(),
        user: user,
        title: data.title,
        description: data.description,
        status: data.status,
        sourceUrl: data.sourceUrl,
        date: data.date
    };
}
