import { MongoModule } from '@acua/shared/mongo';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StackblitzApi } from './api';
import { StackblitzProjectParser } from './parsers';
import {
    SourceCodeDocumentService,
    SourceCodeDtoService,
    SourceCodeService,
    SourceUrlService
} from './services';
import { SourceUrlController } from './source-url.controller';

@Module({
    imports: [HttpModule, MongoModule.forFeature()],
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
