import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StackblitzApi } from './api';
import { StackblitzProjectParser } from './parsers';
import { SourceCode, SourceCodeSchema } from './schemas';
import {
    SourceCodeDocumentService,
    SourceCodeDtoService,
    SourceCodeService,
    SourceUrlService
} from './services';
import { SourceUrlController } from './source-url.controller';

@Module({
    imports: [
        HttpModule,
        MongooseModule.forFeature([{ name: SourceCode.name, schema: SourceCodeSchema }])
    ],
    controllers: [SourceUrlController],
    providers: [
        SourceCodeService,
        SourceUrlService,
        SourceCodeDtoService,
        SourceCodeDocumentService,
        StackblitzApi,
        StackblitzProjectParser
    ]
})
export class SourceCodeModule {}
