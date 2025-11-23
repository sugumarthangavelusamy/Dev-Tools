import { springProperties, type SpringProperty } from '../data/spring-properties';

export const searchProperties = (query: string): SpringProperty[] => {
    if (!query) {
        return springProperties;
    }
    const lowerQuery = query.toLowerCase();
    return springProperties.filter(p =>
        p.key.toLowerCase().includes(lowerQuery) ||
        p.description.toLowerCase().includes(lowerQuery)
    );
};
