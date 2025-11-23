export const curlToHttpClient = (curlCommand: string): string => {
    try {
        if (!curlCommand || !curlCommand.trim().startsWith('curl')) {
            throw new Error('Invalid CURL command');
        }

        // Extract URL - look for http(s):// pattern
        const urlMatch = curlCommand.match(/https?:\/\/[^\s'"]+/);
        const url = urlMatch ? urlMatch[0] : '';

        if (!url) {
            throw new Error('Invalid URL in CURL command');
        }

        // Extract method
        const methodMatch = curlCommand.match(/-X\s+(\w+)/);
        const method = methodMatch ? methodMatch[1] : 'GET';

        // Extract headers
        const headerMatches = [...curlCommand.matchAll(/-H\s+["']([^"']+)["']/g)];
        const headers = headerMatches.map(match => {
            const [key, ...valueParts] = match[1].split(':');
            return { key: key.trim(), value: valueParts.join(':').trim() };
        });

        // Extract data - handle both single and double quotes, and escaped quotes inside
        const dataMatch = curlCommand.match(/-d\s+'([^']+)'/) || curlCommand.match(/-d\s+"([^"]+)"/);
        const data = dataMatch ? dataMatch[1] : null;

        // Build HttpRequest
        let code = `HttpRequest request = HttpRequest.newBuilder()\n    .uri(URI.create("${url}"))`;

        // Add headers
        headers.forEach(header => {
            code += `\n    .header("${header.key}", "${header.value}")`;
        });

        // Add method and body
        if (method === 'GET') {
            code += `\n    .GET()`;
        } else if (method === 'POST' && data) {
            const escapedData = data.replace(/"/g, '\\"');
            code += `\n    .POST(HttpRequest.BodyPublishers.ofString("${escapedData}"))`;
        } else if (method === 'PUT' && data) {
            const escapedData = data.replace(/"/g, '\\"');
            code += `\n    .PUT(HttpRequest.BodyPublishers.ofString("${escapedData}"))`;
        } else if (method === 'DELETE') {
            code += `\n    .DELETE()`;
        } else {
            code += `\n    .method("${method}", HttpRequest.BodyPublishers.noBody())`;
        }

        code += `\n    .build();`;
        code += `\n\nHttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());`;

        return code;
    } catch (err) {
        return `Error: ${(err as Error).message}`;
    }
};
