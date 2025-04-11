import { Static } from 'elysia';

import argon from 'argon2';
import { getTableColumns } from 'drizzle-orm';

import { createSession, generateSessionToken } from '@api/shared/auth/session';
import { db } from '@api/shared/db';
import * as schema from '@api/shared/db/schema';
import { generateId } from '@api/shared/utils';

import { SignUpPayloadDto } from './dto/sign-up.dto';

export const signUp = async (body: Static<typeof SignUpPayloadDto>) => {
    const { password: passwordColumn, ...column } = getTableColumns(
        schema.user
    );
    const { password, ...rest } = body;

    const passwordHashed = await argon.hash(password);
    const [user] = await db
        .insert(schema.user)
        .values({ id: generateId(), ...rest, password: passwordHashed })
        .returning(column);

    const token = generateSessionToken();
    const session = await createSession(token, user.id);

    return { user, session, token };
};
