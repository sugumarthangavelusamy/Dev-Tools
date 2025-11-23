import { jwtDecode } from 'jwt-decode';

export interface DecodedJwt {
    header: any;
    payload: any;
}

export const decodeJwt = (token: string): DecodedJwt | null => {
    try {
        const header = jwtDecode(token, { header: true });
        const payload = jwtDecode(token);
        return { header, payload };
    } catch (err) {
        return null;
    }
};
