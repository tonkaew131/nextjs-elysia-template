import { cookies } from 'next/headers';

import createFetchClient from 'openapi-fetch';

import type { paths } from './api';

export const apiServer = createFetchClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/',
    fetch: async (input) => {
        return fetch(input, {
            headers: {
                Cookie: (await cookies()).toString(),
            },
        });
    },
});
