import Elysia from 'elysia';

import { auth } from '.';
import { UnauthorizedError } from '../error';

export const AuthGuard = new Elysia().derive(
    { as: 'scoped' },
    async ({ request }) => {
        const session = await auth.api.getSession({
            headers: request.headers,
        });

        if (!session) throw new UnauthorizedError();

        return {
            user: session.user,
            session: session.session,
        };
    }
);
