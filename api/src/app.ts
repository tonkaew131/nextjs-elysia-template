import swagger from '@elysiajs/swagger';
import { Elysia } from 'elysia';

const api = new Elysia()
    .use(swagger())
    .get('/', () => 'Hello Elysia')
    .listen(3001);

console.log(
    `🦊 Elysia is running at ${api.server?.hostname}:${api.server?.port}`
);
