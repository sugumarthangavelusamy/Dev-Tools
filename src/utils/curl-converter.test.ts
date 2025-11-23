import { describe, it, expect } from 'vitest';
import { curlToHttpClient } from './curl-converter';

describe('CURL to HttpClient Converter', () => {
    it('should convert simple GET request', () => {
        const curl = `curl https://api.example.com/users`;

        const expected = `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .GET()
    .build();

HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());`;

        expect(curlToHttpClient(curl)).toBe(expected);
    });

    it('should convert POST request with data', () => {
        const curl = `curl -X POST https://api.example.com/users -d '{"name":"John"}'`;

        const expected = `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users"))
    .POST(HttpRequest.BodyPublishers.ofString("{\\"name\\":\\"John\\"}"))
    .build();

HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());`;

        expect(curlToHttpClient(curl)).toBe(expected);
    });

    it('should convert request with headers', () => {
        const curl = `curl -H "Authorization: Bearer token" -H "Content-Type: application/json" https://api.example.com/data`;

        const expected = `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/data"))
    .header("Authorization", "Bearer token")
    .header("Content-Type", "application/json")
    .GET()
    .build();

HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());`;

        expect(curlToHttpClient(curl)).toBe(expected);
    });

    it('should convert PUT request', () => {
        const curl = `curl -X PUT https://api.example.com/users/1 -d '{"name":"Jane"}'`;

        const expected = `HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com/users/1"))
    .PUT(HttpRequest.BodyPublishers.ofString("{\\"name\\":\\"Jane\\"}"))
    .build();

HttpResponse<String> response = httpClient.send(request, HttpResponse.BodyHandlers.ofString());`;

        expect(curlToHttpClient(curl)).toBe(expected);
    });

    it('should handle invalid input', () => {
        expect(curlToHttpClient('invalid')).toContain('Error');
    });
});
