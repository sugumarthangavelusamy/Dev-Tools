import cronstrue from 'cronstrue';
import * as parser from 'cron-parser';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const cronParser: any = (parser as any).default || parser;



export const validateCron = (expression: string): boolean => {
    try {
        cronParser.parse(expression);
        return true;
    } catch (err) {
        return false;
    }
};

export const getCronDescription = (expression: string): string => {
    try {
        return cronstrue.toString(expression);
    } catch (err) {
        return `Error: ${(err as Error).message}`;
    }
};

export const getNextRunTimes = (expression: string, count: number = 5): Date[] => {
    try {
        const interval = cronParser.parse(expression);
        const runs: Date[] = [];
        for (let i = 0; i < count; i++) {
            runs.push(interval.next().toDate());
        }
        return runs;
    } catch (err) {
        return [];
    }
};
