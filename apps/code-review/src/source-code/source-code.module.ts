import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { StackblitzApi } from './api';
import { StackblitzProjectParser } from './parsers';
import { SourceCodeController } from './source-code.controller';
import { SourceCodeService } from './source-code.service';

@Module({
    imports: [HttpModule],
    controllers: [SourceCodeController],
    providers: [SourceCodeService, StackblitzApi, StackblitzProjectParser]
})
export class SourceCodeModule {}
