import React, { useState } from 'react';
import { Terminal, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { curlToHttpClient } from '../utils/curl-converter';

export function CurlConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleConvert = () => {
        const result = curlToHttpClient(input);
        setOutput(result);
    };

    const exampleCurl = `curl -X POST https://api.example.com/users -H "Authorization: Bearer token" -d '{"name":"John"}'`;

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Terminal className="w-6 h-6 text-teal-400" />
                    <CardTitle>CURL → HttpClient Converter</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-400">CURL Command</label>
                            <button
                                onClick={() => setInput(exampleCurl)}
                                className="text-xs text-teal-400 hover:text-teal-300 transition-colors"
                            >
                                Load Example
                            </button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-80 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm focus:border-teal-500 focus:ring-1 focus:ring-teal-500 outline-none resize-none"
                            placeholder="Paste your CURL command here..."
                        />
                    </div>

                    <div className="hidden md:flex flex-col items-center justify-center">
                        <button
                            onClick={handleConvert}
                            className="p-4 bg-teal-500/20 hover:bg-teal-500/30 rounded-full transition-colors border border-teal-500/50"
                            title="Convert to HttpClient"
                        >
                            <ArrowRight className="w-6 h-6 text-teal-400" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Java HttpClient Code</label>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-80 bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm text-teal-300 resize-none"
                            placeholder="Java HttpClient code will appear here..."
                        />
                    </div>
                </div>

                <div className="flex justify-center md:hidden">
                    <button
                        onClick={handleConvert}
                        className="px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-teal-500/20"
                    >
                        Convert to HttpClient
                    </button>
                </div>

                {output.startsWith('Error') && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm">
                        {output}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
