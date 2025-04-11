export interface paths {
    '/auth/signup': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['postAuthSignup'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/auth/signin': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['postAuthSignin'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/auth/signout': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['postAuthSignout'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/auth/profile': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['getAuthProfile'];
        put?: never;
        post?: never;
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
    postAuthSignup: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': {
                    /** Format: email */
                    email: string;
                    password: string;
                };
                'multipart/form-data': {
                    /** Format: email */
                    email: string;
                    password: string;
                };
                'text/plain': {
                    /** Format: email */
                    email: string;
                    password: string;
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
                        id: string;
                        email: string;
                    };
                    'multipart/form-data': {
                        id: string;
                        email: string;
                    };
                    'text/plain': {
                        id: string;
                        email: string;
                    };
                };
            };
        };
    };
    postAuthSignin: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': {
                    /** Format: email */
                    email: string;
                    password: string;
                };
                'multipart/form-data': {
                    /** Format: email */
                    email: string;
                    password: string;
                };
                'text/plain': {
                    /** Format: email */
                    email: string;
                    password: string;
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
                        id: string;
                        email: string;
                    };
                    'multipart/form-data': {
                        id: string;
                        email: string;
                    };
                    'text/plain': {
                        id: string;
                        email: string;
                    };
                };
            };
        };
    };
    postAuthSignout: {
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
                content: {
                    'application/json': {
                        /** @constant */
                        message: 'Sign out successful';
                    };
                    'multipart/form-data': {
                        /** @constant */
                        message: 'Sign out successful';
                    };
                    'text/plain': {
                        /** @constant */
                        message: 'Sign out successful';
                    };
                };
            };
        };
    };
    getAuthProfile: {
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
                content: {
                    'application/json': {
                        id: string;
                        email: string;
                    };
                    'multipart/form-data': {
                        id: string;
                        email: string;
                    };
                    'text/plain': {
                        id: string;
                        email: string;
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
