import { trimEnd } from 'lodash';
import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import type { paths } from './api';

export const apiUrl = trimEnd(
    process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'
);
export const fetchClient = createFetchClient<paths>({
    baseUrl: apiUrl,
    credentials: 'include',
});
export const $api = createClient(fetchClient);
