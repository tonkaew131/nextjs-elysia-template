import { t } from 'elysia';

import { createSelectSchema } from 'drizzle-typebox';

import * as schema from '@api/shared/db/schema';

const selectUserSchema = createSelectSchema(schema.user);
export const ProfileResponseDto = t.Omit(selectUserSchema, ['password']);
