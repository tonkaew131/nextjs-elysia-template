import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

import { AuthController } from '@api/auth/auth.controller';

const api = new Elysia()
    .use(swagger())
    .use(AuthController)
    .get('/', () => 'Hello Elysia')
    .listen(3001);

console.log(
    `🦊 Elysia is running at http://${api.server?.hostname}:${api.server?.port}/swagger`
);
