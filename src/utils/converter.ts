export const jsonToGroovy = (json: string): string => {
    try {
        const obj = JSON.parse(json);
        return toGroovy(obj);
    } catch (err) {
        return `Error: ${(err as Error).message}`;
    }
};

function toGroovy(obj: any): string {
    if (Array.isArray(obj)) {
        return `[${obj.map(toGroovy).join(', ')}]`;
    }
    if (typeof obj === 'object' && obj !== null) {
        const props = Object.entries(obj).map(([k, v]) => {
            const key = /^[a-zA-Z_]\w*$/.test(k) ? k : `"${k}"`;
            return `${key}: ${toGroovy(v)}`;
        });
        return `[${props.join(', ')}]`;
    }
    return JSON.stringify(obj);
}

export const groovyToJson = (groovy: string): string => {
    try {
        // Basic heuristic conversion
        // 1. Replace [ with { and ] with } (globally, might break strings)
        // 2. Quote keys

        // Better approach: Tokenize or use a more specific regex that avoids strings?
        // For now, simple regex.

        let jsonStr = groovy;

        // Replace [ ] with { } for objects/arrays (Groovy uses [] for both lists and maps)
        // We need to distinguish.
        // Actually, Groovy uses [] for Lists AND Maps.
        // [1, 2] -> List
        // [a: 1] -> Map
        // In JSON: [1, 2] -> Array, {a: 1} -> Object

        // If we just replace [ with { and ] with }, [1, 2] becomes {1, 2} which is invalid JSON.
        // So we need to be smarter.

        // Strategy:
        // 1. Quote keys: key: -> "key":
        // 2. If a block starts with [, check if it has : inside (at top level of that block).
        //    If yes -> { ... }
        //    If no -> [ ... ]

        // This is getting complex for regex.
        // Let's try a library-free simple parser or just the simple regex and see if it passes the simple test cases.
        // The test case: [name: "John", age: 30] -> {"name": "John", "age": 30}

        // Simple regex for keys:
        jsonStr = jsonStr.replace(/([a-zA-Z_]\w*)\s*:/g, '"$1":');

        // Now [ "key": val ] -> { "key": val }
        // And [ val, val ] -> [ val, val ] (keep as is? No, JSON uses [] for arrays too)

        // So if we have "key": val inside [], it should be {}.
        // If we don't, it should be [].

        // But wait, Groovy [1, 2] is valid JSON [1, 2].
        // Groovy [a: 1] needs to become { "a": 1 }.

        // So we only need to change [ to { IF it contains key-value pairs?
        // Or maybe just replace [ with { globally and then fix arrays?
        // No, {1, 2} is invalid.

        // Let's try to replace [ that is followed by something containing : with {.
        // This is hard.

        // Alternative: Use `json5`? No.

        // Let's assume the user input is well-formed Groovy map.
        // We can try to replace `[` with `{` and `]` with `}` ONLY if it looks like a map.
        // But nested structures...

        // Let's try the simple regex replacement of [ -> { and ] -> } and see if JSON.parse accepts it?
        // No, arrays will break.

        // Let's try to parse it manually.
        // Or just handle the specific test case for now and improve if needed.
        // The test case is a Map.

        // I'll implement a slightly better regex:
        // Replace [ with {
        // Replace ] with }
        // Replace "key": with "key":
        // Fix arrays: { v1, v2 } -> [ v1, v2 ]?

        // Actually, if I replace keys first: `name:` -> `"name":`
        // Then `[ "name": "John" ]`
        // Then replace `[` with `{` and `]` with `}` -> `{ "name": "John" }`
        // This works for Maps.
        // For Arrays: `[ 1, 2 ]` -> `{ 1, 2 }` -> Invalid.

        // Maybe I can detect if `[` is followed by `key:`?

        // Let's try this:
        // 1. Quote keys.
        // 2. Replace `[` with `{`
        // 3. Replace `]` with `}`
        // 4. Try to parse. If fails, maybe it was an array?

        // Actually, for the purpose of this tool, "Groovy Map" implies the input IS a map.
        // If it's a list, it's just JSON (mostly).
        // So I will assume it's a map and convert [ ] to { }.
        // But nested lists? `[a: [1, 2]]` -> `{ "a": {1, 2} }` -> Error.

        // I need to distinguish.
        // A block is a Map if it contains `:`.
        // A block is a List if it doesn't (at that level).

        // I'll stick to the simple "Map only" assumption for the top level, and maybe fail on nested lists for now, or try to fix them.
        // Actually, I can use a simple state machine parser.

        // Let's try a simple recursive parser approach.

        let i = 0;
        const parse = (): any => {
            skipWhitespace();
            if (i >= groovy.length) return null;

            const char = groovy[i];

            if (char === '[') {
                i++;
                skipWhitespace();
                if (groovy[i] === ']') {
                    i++;
                    return []; // Empty list or map? Assume list/empty object.
                }

                // Check if map or list
                // Look ahead for :
                let isMap = false;
                let tempI = i;
                let depth = 0;
                while (tempI < groovy.length) {
                    if (groovy[tempI] === '[') depth++;
                    if (groovy[tempI] === ']') {
                        if (depth === 0) break;
                        depth--;
                    }
                    if (groovy[tempI] === ':' && depth === 0 && groovy[tempI - 1] !== '"' && groovy[tempI - 1] !== "'") {
                        // Rough check for : not in string
                        isMap = true;
                        break;
                    }
                    tempI++;
                }

                if (isMap) {
                    const obj: any = {};
                    while (i < groovy.length && groovy[i] !== ']') {
                        skipWhitespace();
                        // Parse key
                        let key = '';
                        if (groovy[i] === '"' || groovy[i] === "'") {
                            key = parseString();
                        } else {
                            // Identifier
                            const start = i;
                            while (i < groovy.length && /[a-zA-Z0-9_]/.test(groovy[i])) i++;
                            key = groovy.slice(start, i);
                        }

                        skipWhitespace();
                        if (groovy[i] === ':') i++;

                        const value = parse();
                        obj[key] = value;

                        skipWhitespace();
                        if (groovy[i] === ',') i++;
                    }
                    if (groovy[i] === ']') i++;
                    return obj;
                } else {
                    const arr: any[] = [];
                    while (i < groovy.length && groovy[i] !== ']') {
                        arr.push(parse());
                        skipWhitespace();
                        if (groovy[i] === ',') i++;
                    }
                    if (groovy[i] === ']') i++;
                    return arr;
                }
            } else if (char === '"' || char === "'") {
                return parseString();
            } else if (/[0-9.-]/.test(char)) {
                // Number
                const start = i;
                while (i < groovy.length && /[0-9.eE+-]/.test(groovy[i])) i++;
                return Number(groovy.slice(start, i));
            } else if (groovy.startsWith('true', i)) {
                i += 4; return true;
            } else if (groovy.startsWith('false', i)) {
                i += 5; return false;
            } else if (groovy.startsWith('null', i)) {
                i += 4; return null;
            }

            return null;
        };

        const skipWhitespace = () => {
            while (i < groovy.length && /\s/.test(groovy[i])) i++;
        };

        const parseString = () => {
            const quote = groovy[i];
            i++;
            let str = '';
            while (i < groovy.length && groovy[i] !== quote) {
                if (groovy[i] === '\\') {
                    i++;
                    str += groovy[i];
                } else {
                    str += groovy[i];
                }
                i++;
            }
            i++;
            return str;
        };

        const result = parse();
        skipWhitespace();
        if (i < groovy.length) {
            throw new Error(`Unexpected character at ${i}: ${groovy[i]}`);
        }
        if (result === null) {
            throw new Error('Invalid Groovy Map');
        }
        return JSON.stringify(result, null, 2);

    } catch (err) {
        return `Error: ${(err as Error).message}`;
    }
};
