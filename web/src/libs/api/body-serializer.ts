export type JsonToFormDataBody = {
    [key: string]:
        | string
        | Blob
        | boolean
        | File
        | File[]
        | number
        | null
        | undefined;
};

export function JsonToFormData(body: JsonToFormDataBody) {
    const formData = new FormData();
    for (const key in body) {
        if (body[key] === undefined) continue;
        if (body[key] === null) {
            formData.append(key, '');
            continue;
        }

        if (
            Array.isArray(body[key]) &&
            body[key].every((item) => item instanceof File)
        ) {
            body[key].forEach((file) => formData.append(key, file));
            continue;
        }

        if (body[key] instanceof File || body[key] instanceof Blob) {
            formData.append(key, body[key]);
            continue;
        }

        if (typeof body[key] === 'object' || typeof body[key] === 'boolean') {
            formData.append(key, JSON.stringify(body[key]));
            continue;
        }

        if (typeof body[key] === 'number') {
            formData.append(key, body[key].toString());
            continue;
        }

        formData.append(key, body[key]);
    }
    return formData;
}
