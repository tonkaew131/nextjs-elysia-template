import { db } from '.';
import { APIError } from 'better-auth/api';
import { hashPassword } from 'better-auth/crypto';
import { eq } from 'drizzle-orm';

import { auth } from '@api/shared/auth';
import * as schema from '@api/shared/db/schema';

const seed = async () => {
    await seedAdmin();
};

const seedAdmin = async () => {
    console.log('[🛡️Adming]: Seeding admin...');
    try {
        const { user } = await auth.api.signUpEmail({
            body: {
                email: 'admin@test.com',
                password: 'aA112233',
                name: 'admin',
            },
        });

        // Set additional admin properties if needed
        await db
            .update(schema.user)
            .set({ name: 'admin' })
            .where(eq(schema.user.id, user.id));
    } catch (error) {
        if (error instanceof APIError) {
            if (
                error.status === 'UNPROCESSABLE_ENTITY' &&
                error.body?.code === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL'
            ) {
                const [user] = await db
                    .select()
                    .from(schema.user)
                    .where(eq(schema.user.email, 'admin@test.com'));

                // Set additional admin properties if needed
                await db
                    .update(schema.user)
                    .set({ name: 'admin' })
                    .where(eq(schema.user.id, user.id));
                await db
                    .update(schema.account)
                    .set({
                        password: await hashPassword('aA112233'),
                    })
                    .where(eq(schema.account.userId, user.id));
                return;
            }
        }

        throw error;
    }
    console.log('[🛡️Admin]: Email:    admin@test.com');
    console.log('[🛡️Admin]: Password: aA112233');
    console.log('[🛡️Admin]: Seeding admin done!');
};

seed();
