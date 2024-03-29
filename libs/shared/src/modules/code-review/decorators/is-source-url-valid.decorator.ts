import { registerDecorator, ValidationOptions } from 'class-validator';
import { SourceUrlValidator } from '../validators';

export function IsSourceUrlValid(validationOptions?: ValidationOptions): PropertyDecorator {
    return (target: Object, propertyKey: string) => {
        registerDecorator({
            target: target.constructor,
            propertyName: propertyKey,
            options: validationOptions,
            validator: SourceUrlValidator
        });
    };
}
