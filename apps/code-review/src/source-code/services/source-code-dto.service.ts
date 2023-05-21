import { ProjectEntity } from '@acua/common/code-review';
import { Injectable } from '@nestjs/common';
import { SourceCodeDocumentService } from './source-code-document.service';

@Injectable()
export class SourceCodeDtoService {
    constructor(private readonly sourceCodeDocumentService: SourceCodeDocumentService) {}

    public async get(reviewRequestId: string): Promise<ProjectEntity[]> {
        const sourceCodeDocument = await this.sourceCodeDocumentService.get(reviewRequestId);

        return sourceCodeDocument.data;
    }
}
