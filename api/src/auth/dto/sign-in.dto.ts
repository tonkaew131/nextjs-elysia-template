import { t } from 'elysia';

export const SignInPayloadDto = t.Object({
    email: t.String({
        format: 'email',
    }),
    password: t.String(),
});
