import Elysia from 'elysia';

import { s3 } from '@api/shared/s3';

import { DatePayloadDto, DateResponseDto } from './dto/date.dto';
import { UploadPayloadDto, UploadResponseDto } from './dto/upload.dto';

export const TestController = new Elysia({
    prefix: '/test',
})
    .post(
        '/upload-file',
        async (context) => {
            const { body, headers } = context;

            await s3.write(
                `uploads/${Date.now()}-${body.file.name}`,
                body.file,
                {
                    type: body.file.type,
                }
            );

            headers['content-type'] = body.file.type;
            return body.file;
        },
        {
            body: UploadPayloadDto,
            response: {
                200: UploadResponseDto,
            },
        }
    )
    .post(
        '/date',
        (context) => {
            const { body } = context;

            console.log(body.date);
            return body;
        },
        {
            body: DatePayloadDto,
            response: {
                200: DateResponseDto,
            },
        }
    );
