import React, { useState } from 'react';
import { Braces, ArrowRightLeft, Copy, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { jsonToGroovy, groovyToJson } from '../utils/converter';

export function JsonGroovyConverter() {
    const [json, setJson] = useState('');
    const [groovy, setGroovy] = useState('');
    const [error, setError] = useState('');
    const [copied, setCopied] = useState<'json' | 'groovy' | null>(null);

    const handleJsonToGroovy = () => {
        setError('');
        const res = jsonToGroovy(json);
        if (res.startsWith('Error:')) {
            setError(res);
        } else {
            setGroovy(res);
        }
    };

    const handleGroovyToJson = () => {
        setError('');
        const res = groovyToJson(groovy);
        if (res.startsWith('Error:')) {
            setError(res);
        } else {
            setJson(res);
        }
    };

    const handleCopy = (text: string, type: 'json' | 'groovy') => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Braces className="w-6 h-6 text-yellow-400" />
                    <CardTitle>JSON ↔ Groovy Map Converter</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-400">JSON</label>
                            <button
                                onClick={() => handleCopy(json, 'json')}
                                className="text-slate-500 hover:text-yellow-400 transition-colors"
                                title="Copy JSON"
                            >
                                {copied === 'json' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                        <textarea
                            value={json}
                            onChange={(e) => setJson(e.target.value)}
                            className="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none resize-none"
                            placeholder='{"key": "value"}'
                        />
                    </div>

                    <div className="hidden md:flex flex-col items-center justify-center gap-4">
                        <button
                            onClick={handleJsonToGroovy}
                            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-full transition-colors text-yellow-400"
                            title="Convert JSON to Groovy"
                        >
                            <ArrowRightLeft className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-400">Groovy Map</label>
                            <button
                                onClick={() => handleCopy(groovy, 'groovy')}
                                className="text-slate-500 hover:text-yellow-400 transition-colors"
                                title="Copy Groovy"
                            >
                                {copied === 'groovy' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                            </button>
                        </div>
                        <textarea
                            value={groovy}
                            onChange={(e) => setGroovy(e.target.value)}
                            className="w-full h-64 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 outline-none resize-none"
                            placeholder='[key: "value"]'
                        />
                    </div>
                </div>

                <div className="flex justify-center gap-4 md:hidden">
                    <button
                        onClick={handleJsonToGroovy}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-yellow-400 font-medium"
                    >
                        JSON to Groovy
                    </button>
                    <button
                        onClick={handleGroovyToJson}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-yellow-400 font-medium"
                    >
                        Groovy to JSON
                    </button>
                </div>

                {error && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {error}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
