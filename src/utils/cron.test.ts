import { describe, it, expect } from 'vitest';
import { validateCron, getCronDescription, getNextRunTimes } from './cron';

describe('Cron Utility', () => {
    describe('validateCron', () => {
        it('should return true for valid cron expression', () => {
            expect(validateCron('0 0 * * *')).toBe(true);
            expect(validateCron('*/5 * * * *')).toBe(true);
        });

        it('should return false for invalid cron expression', () => {
            expect(validateCron('invalid')).toBe(false);
            expect(validateCron('0 0 * *')).toBe(false); // Too short
        });
    });

    describe('getCronDescription', () => {
        it('should return human readable description', () => {
            expect(getCronDescription('*/5 * * * *')).toBe('Every 5 minutes');
            expect(getCronDescription('0 0 * * *')).toBe('At 12:00 AM');
        });

        it('should return error message for invalid cron', () => {
            expect(getCronDescription('invalid')).toContain('Error');
        });
    });

    describe('getNextRunTimes', () => {
        it('should return next 5 run times', () => {
            const runs = getNextRunTimes('*/5 * * * *');
            expect(runs).toHaveLength(5);
            runs.forEach(run => {
                expect(run).toBeInstanceOf(Date);
            });
        });

        it('should return empty array for invalid cron', () => {
            expect(getNextRunTimes('invalid')).toEqual([]);
        });
    });
});
