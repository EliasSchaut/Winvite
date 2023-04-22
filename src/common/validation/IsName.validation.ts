import { registerDecorator, ValidationOptions } from 'class-validator';

const name_pattern = /^[A-Z].{2,20}$/;

export function IsName(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsName',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          return (
            typeof value === 'undefined' ||
            (typeof value === 'string' && name_pattern.test(value))
          );
        },
      },
    });
  };
}
