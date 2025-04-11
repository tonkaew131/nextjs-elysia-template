import Elysia from 'elysia';

import {
    invalidateSession,
    validateSessionToken,
} from '@api/shared/auth/session';

import * as authService from './auth.service';
import { SignInPayloadDto, SignInResponseDto } from './dto/sign-in.dto';
import { SignOutResponseDto } from './dto/sign-out.dto';
import { SignUpPayloadDto, SignUpResponseDto } from './dto/sign-up.dto';

export const AuthController = new Elysia({
    prefix: '/auth',
    tags: ['Auth'],
})
    .post(
        '/signup',
        async (context) => {
            const { body, cookie } = context;

            const signUpResult = await authService.signUp(body);
            cookie.session.set({
                value: signUpResult.token,
            });

            return signUpResult.user;
        },
        {
            body: SignUpPayloadDto,
            response: {
                200: SignUpResponseDto,
            },
        }
    )
    .post(
        '/signin',
        async (context) => {
            const { body, cookie } = context;

            const signInResult = await authService.signIn(body);
            cookie.session.set({
                value: signInResult.token,
            });

            return signInResult.user;
        },
        { body: SignInPayloadDto, response: { 200: SignInResponseDto } }
    )
    .post(
        '/signout',
        async (context) => {
            const { cookie } = context;

            const token = cookie.session.value;
            if (token) {
                const { session } = await validateSessionToken(token);
                if (session) {
                    await invalidateSession(session.id);
                }
            }
            cookie.session.remove();

            return {
                message: 'Sign out successful',
            };
        },
        {
            response: {
                200: SignOutResponseDto,
            },
        }
    );
