import Elysia from 'elysia';

import { validateSessionToken } from '@api/shared/auth/session';
import { UnauthorizedError } from '@api/shared/error';

export const SignInGuard = new Elysia().derive(
    {
        as: 'scoped',
    },
    async (context) => {
        const { cookie } = context;
        const token = cookie.session.value;

        if (!token) {
            throw new UnauthorizedError('Please sign in and try again');
        }

        const { user, session } = await validateSessionToken(token);
        if (!session || !user) {
            throw new UnauthorizedError('Please sign in and try again');
        }

        return {
            user: user,
            session: session,
        };
    }
);
