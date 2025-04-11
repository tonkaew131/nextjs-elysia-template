import { t } from 'elysia';

export const UploadPayloadDto = t.Object({
    file: t.File(),
    'optional-file': t.Optional(t.File()),
    'nullable-file': t.Nullable(t.File()),
});

export const UploadResponseDto = t.File();
