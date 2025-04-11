import { t } from 'elysia';

import { createSelectSchema } from 'drizzle-typebox';

import * as schema from '@api/shared/db/schema';

export const SignUpPayloadDto = t.Object({
    email: t.String({
        format: 'email',
    }),
    password: t.String(),
});

const selectUserSchema = createSelectSchema(schema.user);
export const SignUpResponseDto = t.Omit(selectUserSchema, ['password']);
