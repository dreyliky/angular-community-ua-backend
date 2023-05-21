import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { CrReviewRequest } from './review-request.schema';
// import { ProjectEntity } from '../types';

@Schema({ collection: 'cr-source-code' })
export class CrSourceCode {
    @Prop({ type: SchemaTypes.ObjectId, ref: CrReviewRequest.name })
    public readonly reviewRequest: CrReviewRequest;

    // FIXME: Replace to TYPE
    @Prop({ type: () => Object, required: true })
    public data: any[];
    // public data: ProjectEntity[];
}

export type CrSourceCodeDocument = HydratedDocument<CrSourceCode>;

export const CrSourceCodeSchema = SchemaFactory.createForClass(CrSourceCode);
