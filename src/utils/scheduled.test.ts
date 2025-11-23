import { describe, it, expect } from 'vitest';
import { generateCron, type CronOptions } from './scheduled';

describe('Scheduled Generator', () => {
    it('should generate every X minutes', () => {
        const options: CronOptions = {
            type: 'every',
            unit: 'minutes',
            value: 5
        };
        expect(generateCron(options)).toBe('0 0/5 * * * ?');
    });

    it('should generate every day at specific time', () => {
        const options: CronOptions = {
            type: 'daily',
            hour: 14,
            minute: 30
        };
        expect(generateCron(options)).toBe('0 30 14 * * ?');
    });

    it('should generate specific days', () => {
        const options: CronOptions = {
            type: 'weekly',
            days: ['MON', 'WED', 'FRI'],
            hour: 9,
            minute: 0
        };
        expect(generateCron(options)).toBe('0 0 9 ? * MON,WED,FRI');
    });
});
