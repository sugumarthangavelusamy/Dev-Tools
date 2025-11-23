import { ulid } from 'ulid';

export const generateUuid = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    // Fallback for environments without crypto.randomUUID (unlikely in modern browsers/Node)
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

export const generateUlid = (): string => {
    return ulid();
};

export const generateIds = (type: 'uuid' | 'ulid', count: number): string[] => {
    const ids: string[] = [];
    for (let i = 0; i < count; i++) {
        if (type === 'uuid') {
            ids.push(generateUuid());
        } else {
            ids.push(generateUlid());
        }
    }
    return ids;
};
