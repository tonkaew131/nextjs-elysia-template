export interface paths {
    '/test/upload-file': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['postTestUpload-file'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/test/date': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['postTestDate'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getIndex'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: never;
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    'postTestUpload-file': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': {
                    /**
                     * Format: binary
                     * @default File
                     */
                    file: File;
                    /**
                     * Format: binary
                     * @default File
                     */
                    'optional-file'?: File;
                };
                'multipart/form-data': {
                    /**
                     * Format: binary
                     * @default File
                     */
                    file: File;
                    /**
                     * Format: binary
                     * @default File
                     */
                    'optional-file'?: File;
                };
                'text/plain': {
                    /**
                     * Format: binary
                     * @default File
                     */
                    file: File;
                    /**
                     * Format: binary
                     * @default File
                     */
                    'optional-file'?: File;
                };
            };
        };
        responses: {
            /**
             * Format: binary
             * @default File
             */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': File;
                    'multipart/form-data': File;
                    'text/plain': File;
                };
            };
        };
    };
    postTestDate: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': {
                    date: Date | string | number;
                    'optional-date'?: Date | string | number;
                    'nullable-date': ((Date | string | number) | null) | null;
                };
                'multipart/form-data': {
                    date: Date | string | number;
                    'optional-date'?: Date | string | number;
                    'nullable-date': ((Date | string | number) | null) | null;
                };
                'text/plain': {
                    date: Date | string | number;
                    'optional-date'?: Date | string | number;
                    'nullable-date': ((Date | string | number) | null) | null;
                };
            };
        };
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    'application/json': {
                        date: Date | string | number;
                    };
                    'multipart/form-data': {
                        date: Date | string | number;
                    };
                    'text/plain': {
                        date: Date | string | number;
                    };
                };
            };
        };
    };
    getIndex: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
