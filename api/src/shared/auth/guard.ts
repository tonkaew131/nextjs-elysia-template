import Elysia from 'elysia';

import { auth } from '.';
import { UnauthorizedError } from '../error';

export const AuthGuard = new Elysia().macro({
    auth: {
        async resolve({ request: { headers } }) {
            const session = await auth.api.getSession({
                headers,
            });

            if (!session) throw new UnauthorizedError();

            return {
                user: session.user,
                session: session.session,
            };
        },
    },
});
