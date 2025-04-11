import Elysia from 'elysia';

import * as authService from './auth.service';
import { SignUpPayloadDto } from './dto/sign-up.dto';

export const AuthController = new Elysia({
    prefix: '/auth',
    tags: ['Auth'],
}).post(
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
    }
);
