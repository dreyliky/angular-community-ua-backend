import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, SchemaTypes } from 'mongoose';
import { ReviewRequest } from '../../review-request/schemas';
import { ProjectEntity } from '../types';

@Schema({ collection: 'cr-source-code' })
export class SourceCode {
    @Prop({ type: SchemaTypes.ObjectId, ref: ReviewRequest.name })
    public readonly reviewRequest: ReviewRequest;

    @Prop({ type: () => Object, required: true })
    public data: ProjectEntity[];
}

export type SourceCodeDocument = HydratedDocument<SourceCode>;

export const SourceCodeSchema = SchemaFactory.createForClass(SourceCode);
