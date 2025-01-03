import { Request } from 'express';

export interface RequestExtended extends Request {
    body: {
        language?: string; // Define your expected structure
    };
    i18n: any; // i18n instance for language handling
}
