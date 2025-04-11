import cors from '@elysiajs/cors';
import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { AuthController } from '@api/auth/auth.controller';

import { UnauthorizedError } from './shared/error';

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
    .use(AuthController)
    .get('/', () => 'Hello Elysia')
    .listen(3001);

console.log(
    `🦊 Elysia is running at http://${api.server?.hostname}:${api.server?.port}/swagger`
);
