import { describe, it, expect } from 'vitest';
import { decodeJwt } from './jwt';

describe('JWT Decoder', () => {
    it('should decode valid JWT', () => {
        // Mock token (header.payload.signature)
        // Header: {"alg":"HS256","typ":"JWT"} -> eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
        // Payload: {"sub":"1234567890","name":"John Doe","iat":1516239022} -> eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ
        // Signature: SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

        const decoded = decodeJwt(token);
        expect(decoded).not.toBeNull();
        expect(decoded?.header).toEqual({ alg: 'HS256', typ: 'JWT' });
        expect(decoded?.payload).toEqual({ sub: '1234567890', name: 'John Doe', iat: 1516239022 });
    });

    it('should return null for invalid JWT', () => {
        expect(decodeJwt('invalid')).toBeNull();
    });
});
