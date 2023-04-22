import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export class CreationResponseDto {
    @ApiProperty()
    public id: string;

    constructor(document: Document) {
        this.id = document._id;
    }
}
