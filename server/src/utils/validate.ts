import { ZodType } from 'zod';

export default class Validation {
    static validate<T>(schema: ZodType, data: T): T {
        return schema.parse(data);
    }
}
