import React, { useState } from 'react';
import { Fingerprint, Copy, RefreshCw, Trash2, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { generateIds } from '../utils/uuid';

export function UuidGenerator() {
    const [ids, setIds] = useState<string[]>([]);
    const [count, setCount] = useState(1);
    const [type, setType] = useState<'uuid' | 'ulid'>('uuid');
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleGenerate = () => {
        const newIds = generateIds(type, count);
        setIds(newIds);
    };

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    const handleClear = () => {
        setIds([]);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Fingerprint className="w-6 h-6 text-purple-400" />
                    <CardTitle>UUID / ULID Generator</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex flex-wrap items-end gap-4 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Type</label>
                        <div className="flex bg-slate-950 rounded-lg p-1 border border-slate-800">
                            <button
                                onClick={() => setType('uuid')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${type === 'uuid'
                                        ? 'bg-purple-500 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                UUID v4
                            </button>
                            <button
                                onClick={() => setType('ulid')}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${type === 'ulid'
                                        ? 'bg-purple-500 text-white shadow-lg'
                                        : 'text-slate-400 hover:text-slate-200'
                                    }`}
                            >
                                ULID
                            </button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Count</label>
                        <input
                            type="number"
                            min="1"
                            max="50"
                            value={count}
                            onChange={(e) => setCount(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                            className="block w-20 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                        />
                    </div>

                    <div className="flex gap-2 ml-auto">
                        <button
                            onClick={handleClear}
                            className="p-2.5 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                            title="Clear list"
                        >
                            <Trash2 className="w-5 h-5" />
                        </button>
                        <button
                            onClick={handleGenerate}
                            className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-lg shadow-purple-500/20"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Generate
                        </button>
                    </div>
                </div>

                {ids.length > 0 && (
                    <div className="space-y-2">
                        <div className="flex items-center justify-between px-2">
                            <span className="text-sm font-medium text-slate-500">{ids.length} generated</span>
                        </div>
                        <div className="bg-slate-950 border border-slate-800 rounded-lg divide-y divide-slate-800 max-h-[300px] overflow-y-auto">
                            {ids.map((id, i) => (
                                <div key={i} className="flex items-center justify-between p-3 group hover:bg-slate-900/50 transition-colors">
                                    <code className="font-mono text-slate-300 text-sm">{id}</code>
                                    <button
                                        onClick={() => handleCopy(id, i)}
                                        className="p-1.5 text-slate-500 hover:text-purple-400 hover:bg-purple-500/10 rounded transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                                        title="Copy"
                                    >
                                        {copiedIndex === i ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
