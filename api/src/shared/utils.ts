import { customAlphabet } from 'nanoid';

export const generateId = (size: number = 16) => {
    const nanoid = customAlphabet(
        '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
        size
    );
    return nanoid();
};
