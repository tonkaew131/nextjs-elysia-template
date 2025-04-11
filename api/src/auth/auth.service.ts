import { Static } from 'elysia';

import argon from 'argon2';
import { eq, getTableColumns } from 'drizzle-orm';

import { createSession, generateSessionToken } from '@api/shared/auth/session';
import { db } from '@api/shared/db';
import * as schema from '@api/shared/db/schema';
import { UnauthorizedError } from '@api/shared/error';
import { generateId } from '@api/shared/utils';

import { SignInPayloadDto } from './dto/sign-in.dto';
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

export const signIn = async (body: Static<typeof SignInPayloadDto>) => {
    const [user] = await db
        .select()
        .from(schema.user)
        .where(eq(schema.user.email, body.email));

    if (!user) {
        throw new UnauthorizedError('Invalid email or password');
    }

    const { password, ...userInfo } = user;
    const isPasswordValid = await argon.verify(user.password, body.password);
    if (!isPasswordValid) {
        throw new UnauthorizedError('Invalid email or password');
    }

    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    return { user: userInfo, session, token };
};
