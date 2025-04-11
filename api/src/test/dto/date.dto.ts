import { t } from 'elysia';

export const DatePayloadDto = t.Object({
    date: t.Date(),
    'optional-date': t.Optional(t.Date()),
    'nullable-date': t.Nullable(t.Date()),
});

export const DateResponseDto = t.Object({
    date: t.Date(),
});
