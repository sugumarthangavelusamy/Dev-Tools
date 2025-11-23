import { describe, it, expect } from 'vitest';
import { searchProperties } from './properties';

describe('Property Explorer', () => {
    it('should find properties by key', () => {
        const results = searchProperties('server.port');
        expect(results).toHaveLength(1);
        expect(results[0].key).toBe('server.port');
    });

    it('should find properties by description', () => {
        const results = searchProperties('database');
        expect(results.length).toBeGreaterThan(0);
        expect(results.some(p => p.key.includes('datasource'))).toBe(true);
    });

    it('should return all properties for empty query', () => {
        const results = searchProperties('');
        expect(results.length).toBeGreaterThan(10);
    });

    it('should be case insensitive', () => {
        const results = searchProperties('SERVER');
        expect(results.length).toBeGreaterThan(0);
    });
});
