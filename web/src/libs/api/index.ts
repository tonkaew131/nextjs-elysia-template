import { trimEnd } from 'lodash';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import type { paths } from './api';
import { JsonToFormData, JsonToFormDataBody } from './body-serializer';

export const apiUrl = trimEnd(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
);
export const fetchClient = createFetchClient<paths>({
    baseUrl: apiUrl,
    credentials: 'include',
    bodySerializer: (body) => {
        const shouldBeFormData = Object.values(body || {}).some(
            (value) => value instanceof File
        );

        if (shouldBeFormData) {
            return JsonToFormData(body as unknown as JsonToFormDataBody);
        }

        return body;
    },
});
export const $api = createClient(fetchClient);
