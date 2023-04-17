import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StackblitzApi } from './api';
import { StackblitzProjectParser } from './parsers';
import { SourceCodeService, SourceUrlService } from './services';
import { SourceCodeController } from './source-code.controller';
import { SourceUrlController } from './source-url.controller';

@Module({
    imports: [HttpModule],
    controllers: [SourceCodeController, SourceUrlController],
    providers: [SourceCodeService, SourceUrlService, StackblitzApi, StackblitzProjectParser]
})
export class SourceCodeModule {}
