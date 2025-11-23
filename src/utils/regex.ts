export interface RegexMatch {
    text: string;
    index: number;
    groups?: { [key: string]: string };
}

export interface RegexResult {
    isValid: boolean;
    error?: string;
    matches: RegexMatch[];
}

export const testRegex = (pattern: string, flags: string, text: string): RegexResult => {
    try {
        const regex = new RegExp(pattern, flags);
        const matches: RegexMatch[] = [];

        if (!pattern) {
            return { isValid: true, matches: [] };
        }

        // Prevent infinite loop with empty matches if global flag is set
        // But empty matches are valid (e.g. ^).
        // matchAll is safer for global.

        if (flags.includes('g')) {
            const iterator = text.matchAll(regex);
            for (const match of iterator) {
                matches.push({
                    text: match[0],
                    index: match.index!,
                    groups: match.groups
                });
            }
        } else {
            const match = regex.exec(text);
            if (match) {
                matches.push({
                    text: match[0],
                    index: match.index,
                    groups: match.groups
                });
            }
        }

        return { isValid: true, matches };
    } catch (err) {
        return { isValid: false, error: (err as Error).message, matches: [] };
    }
};
