import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { auth } from './shared/auth';
import { UnauthorizedError } from './shared/error';
import { TestController } from './test/test.controller';

const api = new Elysia()
    .use(swagger())
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
    .listen(3001);

console.log(
    `🦊 Elysia is running at http://${api.server?.hostname}:${api.server?.port}/swagger`
);
