import { ProjectEntity } from '@acua/common/code-review';
import { Prop, Schema } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { ReviewRequest } from './review-request.schema';

@Schema({ collection: 'cr-source-code' })
export class SourceCode {
    @Prop({ type: SchemaTypes.ObjectId, ref: ReviewRequest.name })
    public readonly reviewRequest: ReviewRequest;

    @Prop({ type: () => Object, required: true })
    public data: ProjectEntity[];
}

export type SourceCodeDoc = HydratedDocument<SourceCode>;
