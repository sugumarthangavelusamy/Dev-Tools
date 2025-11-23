import { describe, it, expect } from 'vitest';
import { generateUuid, generateUlid, generateIds } from './uuid';

describe('UUID/ULID Generator', () => {
    it('should generate valid UUID v4', () => {
        const uuid = generateUuid();
        expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
    });

    it('should generate valid ULID', () => {
        const ulid = generateUlid();
        expect(ulid).toMatch(/^[0-9A-Z]{26}$/);
    });

    it('should generate multiple IDs', () => {
        const uuids = generateIds('uuid', 5);
        expect(uuids).toHaveLength(5);
        uuids.forEach(id => {
            expect(id).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i);
        });

        const ulids = generateIds('ulid', 3);
        expect(ulids).toHaveLength(3);
        ulids.forEach(id => {
            expect(id).toMatch(/^[0-9A-Z]{26}$/);
        });
    });
});
