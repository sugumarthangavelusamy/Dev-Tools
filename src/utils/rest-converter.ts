export const restTemplateToWebClient = (restTemplateCode: string): string => {
    try {
        if (!restTemplateCode || !restTemplateCode.includes('restTemplate')) {
            throw new Error('Invalid RestTemplate code');
        }

        let converted = restTemplateCode;

        // Convert getForObject
        converted = converted.replace(
            /restTemplate\.getForObject\s*\(\s*"([^"]+)"\s*,\s*(\w+\.class)\s*\)/g,
            'webClient.get()\n    .uri("$1")\n    .retrieve()\n    .bodyToMono($2)\n    .block()'
        );

        // Convert postForObject
        converted = converted.replace(
            /restTemplate\.postForObject\s*\(\s*"([^"]+)"\s*,\s*(\w+)\s*,\s*(\w+\.class)\s*\)/g,
            'webClient.post()\n    .uri("$1")\n    .bodyValue($2)\n    .retrieve()\n    .bodyToMono($3)\n    .block()'
        );

        // Convert exchange (GET with headers)
        const exchangePattern = /restTemplate\.exchange\s*\(\s*"([^"]+)"\s*,\s*HttpMethod\.GET\s*,\s*entity\s*,\s*(\w+\.class)\s*\)/g;
        if (exchangePattern.test(restTemplateCode)) {
            converted = converted.replace(exchangePattern,
                'webClient.get()\n    .uri("$1")\n    .headers(h -> h.addAll(headers))\n    .retrieve()\n    .toEntity($2)\n    .block()'
            );
            // Remove HttpEntity creation line
            converted = converted.replace(/HttpEntity<[^>]+>\s+entity\s*=\s*new\s+HttpEntity<>[^;]+;\s*/g, '');
        }

        // Replace RestTemplate declaration with WebClient
        converted = converted.replace(
            /RestTemplate\s+restTemplate\s*=\s*new\s+RestTemplate\(\);/g,
            'WebClient webClient = WebClient.create();'
        );

        // Replace ResponseEntity<String> response = restTemplate with ResponseEntity<String> response = webClient
        converted = converted.replace(/ResponseEntity<(\w+)>\s+response\s*=\s*restTemplate/g,
            'ResponseEntity<$1> response = webClient'
        );

        return converted;
    } catch (err) {
        return `Error: ${(err as Error).message}`;
    }
};
