import { t } from 'elysia';

export const SignOutResponseDto = t.Object({
    message: t.Literal('Sign out successful'),
});
