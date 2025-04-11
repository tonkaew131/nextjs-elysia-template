import createFetchClient from 'openapi-fetch';
import createClient from 'openapi-react-query';

import type { paths } from './api';

const fetchClient = createFetchClient<paths>({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/',
});
export const $api = createClient(fetchClient);
