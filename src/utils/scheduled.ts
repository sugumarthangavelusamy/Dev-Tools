export type CronOptions =
    | { type: 'every'; unit: 'seconds' | 'minutes' | 'hours'; value: number }
    | { type: 'daily'; hour: number; minute: number }
    | { type: 'weekly'; days: string[]; hour: number; minute: number };

export const generateCron = (options: CronOptions): string => {
    switch (options.type) {
        case 'every':
            if (options.unit === 'minutes') {
                return `0 0/${options.value} * * * ?`;
            }
            if (options.unit === 'hours') {
                return `0 0 0/${options.value} * * ?`;
            }
            if (options.unit === 'seconds') {
                return `0/${options.value} * * * * ?`;
            }
            return '';
        case 'daily':
            return `0 ${options.minute} ${options.hour} * * ?`;
        case 'weekly':
            return `0 ${options.minute} ${options.hour} ? * ${options.days.join(',')}`;
        default:
            return '';
    }
};
