import { describe, it, expect } from 'vitest';
import { testRegex } from './regex';

describe('Regex Tester', () => {
    it('should find matches', () => {
        const regex = '\\d+';
        const flags = 'g';
        const text = 'There are 123 apples and 456 oranges.';

        const result = testRegex(regex, flags, text);
        expect(result.isValid).toBe(true);
        expect(result.matches).toHaveLength(2);
        expect(result.matches[0].text).toBe('123');
        expect(result.matches[0].index).toBe(10);
        expect(result.matches[1].text).toBe('456');
        expect(result.matches[1].index).toBe(25);
    });

    it('should handle invalid regex', () => {
        const regex = '[';
        const result = testRegex(regex, '', 'test');
        expect(result.isValid).toBe(false);
        expect(result.error).toBeDefined();
    });

    it('should handle no matches', () => {
        const result = testRegex('abc', '', 'def');
        expect(result.isValid).toBe(true);
        expect(result.matches).toHaveLength(0);
    });
});
