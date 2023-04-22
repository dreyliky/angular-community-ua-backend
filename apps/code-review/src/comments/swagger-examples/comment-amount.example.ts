import {
    ReferenceObject,
    SchemaObject
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const COMMENT_AMOUNT_RESPONSE_EXAMPLE: SchemaObject & Partial<ReferenceObject> = {
    properties: {
        'src/app/app.component.ts': {
            type: 'object',
            properties: {
                '1': { type: 'number', example: 3 },
                '12': { type: 'number', example: 7 }
            }
        },
        'src/app/core/app-route.enum.ts': {
            type: 'object',
            properties: {
                '2': { type: 'number', example: 1 }
            }
        }
    }
};
