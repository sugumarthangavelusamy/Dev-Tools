import React, { useState } from 'react';
import { KeyRound, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { decodeJwt, type DecodedJwt } from '../utils/jwt';

export function JwtDecoder() {
    const [token, setToken] = useState('');
    const [decoded, setDecoded] = useState<DecodedJwt | null>(null);
    const [error, setError] = useState('');

    const handleTokenChange = (value: string) => {
        setToken(value);
        setError('');
        if (!value) {
            setDecoded(null);
            return;
        }
        const res = decodeJwt(value);
        if (res) {
            setDecoded(res);
        } else {
            setDecoded(null);
            // Only show error if it looks like a token (has dots) but fails
            if (value.includes('.')) {
                setError('Invalid JWT format');
            }
        }
    };

    const isExpired = (exp?: number) => {
        if (!exp) return false;
        return Date.now() >= exp * 1000;
    };

    const formatTime = (timestamp?: number) => {
        if (!timestamp) return 'N/A';
        return new Date(timestamp * 1000).toLocaleString();
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <KeyRound className="w-6 h-6 text-pink-400" />
                    <CardTitle>JWT Decoder</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">JWT Token</label>
                    <textarea
                        value={token}
                        onChange={(e) => handleTokenChange(e.target.value)}
                        className={`w-full h-32 bg-slate-900 border rounded-lg p-3 font-mono text-sm focus:outline-none focus:ring-1 resize-none transition-all
              ${error
                                ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                                : 'border-slate-700 focus:border-pink-500 focus:ring-pink-500/20'
                            }`}
                        placeholder="Paste your JWT here..."
                    />
                    {error && <p className="text-red-400 text-sm">{error}</p>}
                </div>

                {decoded && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <h3 className="text-sm font-medium text-slate-400">Header</h3>
                            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-auto max-h-96">
                                <pre>{JSON.stringify(decoded.header, null, 2)}</pre>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-sm font-medium text-slate-400">Payload</h3>
                                {decoded.payload.exp && (
                                    <div className={`flex items-center gap-1.5 text-xs px-2 py-1 rounded-full border ${isExpired(decoded.payload.exp)
                                            ? 'bg-red-500/10 text-red-400 border-red-500/20'
                                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                        }`}>
                                        {isExpired(decoded.payload.exp) ? (
                                            <>
                                                <AlertTriangle className="w-3 h-3" />
                                                Expired
                                            </>
                                        ) : (
                                            <>
                                                <CheckCircle className="w-3 h-3" />
                                                Valid
                                            </>
                                        )}
                                    </div>
                                )}
                            </div>
                            <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm text-slate-300 overflow-auto max-h-96 relative">
                                <pre>{JSON.stringify(decoded.payload, null, 2)}</pre>
                            </div>

                            {(decoded.payload.iat || decoded.payload.exp) && (
                                <div className="grid grid-cols-2 gap-4 pt-2">
                                    {decoded.payload.iat && (
                                        <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
                                            <span className="text-xs text-slate-500 block">Issued At</span>
                                            <div className="flex items-center gap-1.5 text-sm text-slate-300">
                                                <Clock className="w-3 h-3" />
                                                {formatTime(decoded.payload.iat)}
                                            </div>
                                        </div>
                                    )}
                                    {decoded.payload.exp && (
                                        <div className="bg-slate-900/50 p-2 rounded border border-slate-800">
                                            <span className="text-xs text-slate-500 block">Expires At</span>
                                            <div className="flex items-center gap-1.5 text-sm text-slate-300">
                                                <Clock className="w-3 h-3" />
                                                {formatTime(decoded.payload.exp)}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
