import { t } from 'elysia';

import { createSelectSchema } from 'drizzle-typebox';

import * as schema from '@api/shared/db/schema';

export const SignInPayloadDto = t.Object({
    email: t.String({
        format: 'email',
    }),
    password: t.String(),
});

const selectUserSchema = createSelectSchema(schema.user);
export const SignInResponseDto = t.Omit(selectUserSchema, ['password']);
