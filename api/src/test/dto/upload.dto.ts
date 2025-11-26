import { t } from 'elysia';

export const UploadPayloadDto = t.Object({
    file: t.File(),
    'optional-file': t.Optional(t.File()),
});

export const UploadResponseDto = t.File();
