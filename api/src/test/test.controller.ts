import Elysia from 'elysia';

import { DatePayloadDto, DateResponseDto } from './dto/date.dto';
import { UploadPayloadDto, UploadResponseDto } from './dto/upload.dto';

export const TestController = new Elysia({
    prefix: '/test',
})
    .post(
        '/upload-file',
        async (context) => {
            const { body, headers } = context;

            console.log(body.file);
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
