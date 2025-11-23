import { describe, it, expect } from 'vitest';
import { toBase64, fromBase64 } from './base64';

describe('Base64 Converter', () => {
    it('should encode text to base64', () => {
        expect(toBase64('Hello World')).toBe('SGVsbG8gV29ybGQ=');
    });

    it('should decode base64 to text', () => {
        expect(fromBase64('SGVsbG8gV29ybGQ=')).toBe('Hello World');
    });

    it('should handle empty string', () => {
        expect(toBase64('')).toBe('');
        expect(fromBase64('')).toBe('');
    });

    it('should handle unicode characters', () => {
        const text = '👋 Hello';
        const encoded = toBase64(text);
        expect(fromBase64(encoded)).toBe(text);
    });
});
