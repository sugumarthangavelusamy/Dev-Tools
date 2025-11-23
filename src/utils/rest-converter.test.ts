import { describe, it, expect } from 'vitest';
import { restTemplateToWebClient } from './rest-converter';

describe('RestTemplate to WebClient Converter', () => {
    it('should convert simple GET request', () => {
        const restTemplate = `RestTemplate restTemplate = new RestTemplate();
String result = restTemplate.getForObject("https://api.example.com/users", String.class);`;

        const expected = `WebClient webClient = WebClient.create();
String result = webClient.get()
    .uri("https://api.example.com/users")
    .retrieve()
    .bodyToMono(String.class)
    .block();`;

        expect(restTemplateToWebClient(restTemplate)).toBe(expected);
    });

    it('should convert POST request with body', () => {
        const restTemplate = `User user = new User("John", "Doe");
User result = restTemplate.postForObject("https://api.example.com/users", user, User.class);`;

        const expected = `User user = new User("John", "Doe");
User result = webClient.post()
    .uri("https://api.example.com/users")
    .bodyValue(user)
    .retrieve()
    .bodyToMono(User.class)
    .block();`;

        expect(restTemplateToWebClient(restTemplate)).toBe(expected);
    });

    it('should convert exchange with headers', () => {
        const restTemplate = `HttpHeaders headers = new HttpHeaders();
headers.set("Authorization", "Bearer token");
HttpEntity<String> entity = new HttpEntity<>(headers);
ResponseEntity<String> response = restTemplate.exchange(
    "https://api.example.com/data",
    HttpMethod.GET,
    entity,
    String.class
);`;

        const expected = `HttpHeaders headers = new HttpHeaders();
headers.set("Authorization", "Bearer token");
ResponseEntity<String> response = webClient.get()
    .uri("https://api.example.com/data")
    .headers(h -> h.addAll(headers))
    .retrieve()
    .toEntity(String.class)
    .block();`;

        expect(restTemplateToWebClient(restTemplate)).toBe(expected);
    });

    it('should handle invalid input', () => {
        expect(restTemplateToWebClient('invalid code')).toContain('Error');
    });
});
