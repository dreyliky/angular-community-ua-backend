import { ProjectEntity } from '@acua/common/code-review';
import { CrReviewRequestDocument, CrSourceCode, CrSourceCodeDocument } from '@acua/shared/mongo';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Injectable()
export class SourceCodeDocumentService {
    constructor(
        @InjectModel(CrSourceCode.name)
        private readonly sourceCodeModel: Model<CrSourceCodeDocument>
    ) {}

    public get(reviewRequestId: string): Promise<CrSourceCodeDocument> {
        return this.sourceCodeModel.findOne({ reviewRequest: reviewRequestId }).exec();
    }

    public create(
        reviewRequest: CrReviewRequestDocument,
        data: ProjectEntity[]
    ): Promise<Document> {
        const createdModel = new this.sourceCodeModel(<CrSourceCode>{
            reviewRequest,
            data
        });

        return createdModel.save();
    }
}
