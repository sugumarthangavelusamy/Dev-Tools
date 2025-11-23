import React, { useState } from 'react';
import { Code2, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { restTemplateToWebClient } from '../utils/rest-converter';

export function RestTemplateConverter() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const handleConvert = () => {
        const result = restTemplateToWebClient(input);
        setOutput(result);
    };

    const exampleCode = `RestTemplate restTemplate = new RestTemplate();
String result = restTemplate.getForObject("https://api.example.com/users", String.class);`;

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Code2 className="w-6 h-6 text-cyan-400" />
                    <CardTitle>RestTemplate → WebClient Converter</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-400">RestTemplate Code</label>
                            <button
                                onClick={() => setInput(exampleCode)}
                                className="text-xs text-cyan-400 hover:text-cyan-300 transition-colors"
                            >
                                Load Example
                            </button>
                        </div>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="w-full h-80 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 outline-none resize-none"
                            placeholder="Paste your RestTemplate code here..."
                        />
                    </div>

                    <div className="hidden md:flex flex-col items-center justify-center">
                        <button
                            onClick={handleConvert}
                            className="p-4 bg-cyan-500/20 hover:bg-cyan-500/30 rounded-full transition-colors border border-cyan-500/50"
                            title="Convert to WebClient"
                        >
                            <ArrowRight className="w-6 h-6 text-cyan-400" />
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">WebClient Code</label>
                        <textarea
                            value={output}
                            readOnly
                            className="w-full h-80 bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm text-cyan-300 resize-none"
                            placeholder="Converted WebClient code will appear here..."
                        />
                    </div>
                </div>

                <div className="flex justify-center md:hidden">
                    <button
                        onClick={handleConvert}
                        className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-medium transition-colors shadow-lg shadow-cyan-500/20"
                    >
                        Convert to WebClient
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
