import { t } from 'elysia';

export const SignUpPayloadDto = t.Object({
    email: t.String({
        format: 'email',
    }),
    password: t.String(),
});
