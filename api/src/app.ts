import cors from '@elysiajs/cors';
import { openapi } from '@elysiajs/openapi';
import { Elysia } from 'elysia';

import { auth } from './shared/auth';
import { UnauthorizedError } from './shared/error';
import { TestController } from './test/test.controller';

const api = new Elysia()
    .use(
        openapi({
            scalar: {
                spec: {
                    url: '/api/openapi/json',
                },
                servers: [
                    {
                        url: '/api',
                    },
                ],
            },
        })
    )
    .use(cors())
    .error({
        UnauthorizedError,
    })
    .onError(({ code, error, set }) => {
        switch (code) {
            case 'UnauthorizedError':
                set.status = 401;
                return error;
        }
    })
    .mount(auth.handler)
    .use(TestController)
    .get('/', () => 'Hello Elysia')
    .listen(3002);

console.log(
    `🦊 Elysia is running at http://${api.server?.hostname}:${api.server?.port}/swagger`
);
