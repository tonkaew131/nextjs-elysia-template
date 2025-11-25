import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';

import { db } from '@api/shared/db';

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: 'pg',
    }),
    emailAndPassword: {
        enabled: true,
    },
    trustedOrigins: [
        process.env.BETTER_AUTH_TRUSTED_ORIGINS || 'http://localhost:3000',
    ],
});
