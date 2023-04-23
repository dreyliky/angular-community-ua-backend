import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { ReviewRequestDocument } from '../../review-request/schemas';
import { SourceCode, SourceCodeDocument } from '../schemas';
import { ProjectEntity } from '../types';

@Injectable()
export class SourceCodeDocumentService {
    constructor(
        @InjectModel(SourceCode.name)
        private readonly sourceCodeModel: Model<SourceCodeDocument>
    ) {}

    public get(reviewRequestId: string): Promise<SourceCodeDocument> {
        return this.sourceCodeModel.findOne({ reviewRequest: reviewRequestId }).exec();
    }

    public create(reviewRequest: ReviewRequestDocument, data: ProjectEntity[]): Promise<Document> {
        const createdModel = new this.sourceCodeModel(<SourceCode>{
            reviewRequest,
            data
        });

        return createdModel.save();
    }
}
