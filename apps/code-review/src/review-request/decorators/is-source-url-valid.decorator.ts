import { registerDecorator, ValidationOptions } from 'class-validator';
import { SourceUrlValidator } from '../validators/source-url.validator';

export function isSourceUrlValid(validationOptions?: ValidationOptions): PropertyDecorator {
    return (target: Object, propertyKey: string) => {
        registerDecorator({
            target: target.constructor,
            propertyName: propertyKey,
            options: validationOptions,
            validator: SourceUrlValidator
        });
    };
}