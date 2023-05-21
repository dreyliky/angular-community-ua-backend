import { ProjectEntity } from '@acua/shared/code-review';
import { Schema } from '@acua/shared/mongo';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

@Injectable()
export class SourceCodeDocumentService {
    constructor(
        @InjectModel(Schema.Cr.SourceCode.name)
        private readonly sourceCodeModel: Model<Schema.Cr.SourceCodeDoc>
    ) {}

    public get(reviewRequestId: string): Promise<Schema.Cr.SourceCodeDoc> {
        return this.sourceCodeModel.findOne({ reviewRequest: reviewRequestId }).exec();
    }

    public create(
        reviewRequest: Schema.Cr.ReviewRequestDoc,
        data: ProjectEntity[]
    ): Promise<Document> {
        const createdModel = new this.sourceCodeModel(<Schema.Cr.SourceCode>{
            reviewRequest,
            data
        });

        return createdModel.save();
    }
}
