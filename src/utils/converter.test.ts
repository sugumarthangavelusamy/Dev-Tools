import { describe, it, expect } from 'vitest';
import { jsonToGroovy, groovyToJson } from './converter';

describe('JSON <-> Groovy Converter', () => {
    it('should convert JSON to Groovy Map', () => {
        const json = '{"name": "John", "age": 30, "active": true}';
        const expected = '[name: "John", age: 30, active: true]';
        expect(jsonToGroovy(json)).toBe(expected);
    });

    it('should convert nested JSON to Groovy Map', () => {
        const json = '{"user": {"id": 1, "roles": ["ADMIN", "USER"]}}';
        const expected = '[user: [id: 1, roles: ["ADMIN", "USER"]]]';
        expect(jsonToGroovy(json)).toBe(expected);
    });

    it('should convert Groovy Map to JSON', () => {
        const groovy = '[name: "John", age: 30, active: true]';
        const expected = '{\n  "name": "John",\n  "age": 30,\n  "active": true\n}';
        // We expect formatted JSON
        expect(JSON.parse(groovyToJson(groovy))).toEqual(JSON.parse(expected));
    });

    it('should handle invalid input', () => {
        expect(jsonToGroovy('invalid')).toContain('Error');
        expect(groovyToJson('invalid')).toContain('Error');
    });
});
