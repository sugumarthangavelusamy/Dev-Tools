export const toBase64 = (text: string): string => {
    try {
        const bytes = new TextEncoder().encode(text);
        const binString = Array.from(bytes, (byte) =>
            String.fromCodePoint(byte)
        ).join("");
        return btoa(binString);
    } catch (err) {
        return '';
    }
};

export const fromBase64 = (encoded: string): string => {
    try {
        const binString = atob(encoded);
        const bytes = Uint8Array.from(binString, (m) => m.codePointAt(0)!);
        return new TextDecoder().decode(bytes);
    } catch (err) {
        return '';
    }
};
