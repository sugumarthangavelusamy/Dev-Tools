import React, { useState, useMemo } from 'react';
import { Regex, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { testRegex, type RegexMatch } from '../utils/regex';

export function RegexTester() {
    const [pattern, setPattern] = useState('\\d+');
    const [flags, setFlags] = useState('g');
    const [text, setText] = useState('There are 123 apples and 456 oranges.');

    const result = useMemo(() => testRegex(pattern, flags, text), [pattern, flags, text]);

    const highlightedText = useMemo(() => {
        if (!result.isValid || result.matches.length === 0) return text;

        const parts: React.ReactNode[] = [];
        let lastIndex = 0;

        result.matches.forEach((match, i) => {
            // Add text before match
            if (match.index > lastIndex) {
                parts.push(<span key={`text-${i}`}>{text.slice(lastIndex, match.index)}</span>);
            }
            // Add match
            parts.push(
                <mark key={`match-${i}`} className="bg-yellow-500/30 text-yellow-200 rounded px-0.5">
                    {match.text}
                </mark>
            );
            lastIndex = match.index + match.text.length;
        });

        // Add remaining text
        if (lastIndex < text.length) {
            parts.push(<span key="text-end">{text.slice(lastIndex)}</span>);
        }

        return parts;
    }, [text, result]);

    const toggleFlag = (flag: string) => {
        if (flags.includes(flag)) {
            setFlags(flags.replace(flag, ''));
        } else {
            setFlags(flags + flag);
        }
    };

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Regex className="w-6 h-6 text-blue-400" />
                    <CardTitle>Regex Tester</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Regular Expression</label>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">/</span>
                            <input
                                type="text"
                                value={pattern}
                                onChange={(e) => setPattern(e.target.value)}
                                className={`w-full bg-slate-900 border rounded-lg pl-6 pr-4 py-2 font-mono text-sm focus:outline-none focus:ring-1 transition-all
                  ${!result.isValid
                                        ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                                        : 'border-slate-700 focus:border-blue-500 focus:ring-blue-500/20'
                                    }`}
                                placeholder="Pattern..."
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 font-mono">/</span>
                        </div>
                        <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-2">
                            {['g', 'i', 'm', 's', 'u', 'y'].map((flag) => (
                                <button
                                    key={flag}
                                    onClick={() => toggleFlag(flag)}
                                    className={`px-2 py-1 rounded text-xs font-mono transition-colors ${flags.includes(flag)
                                            ? 'bg-blue-500/20 text-blue-300'
                                            : 'text-slate-500 hover:text-slate-300'
                                        }`}
                                >
                                    {flag}
                                </button>
                            ))}
                        </div>
                    </div>
                    {!result.isValid && (
                        <p className="text-red-400 text-sm flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {result.error}
                        </p>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Test String</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full h-48 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none resize-none"
                            placeholder="Text to match against..."
                        />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <label className="text-sm font-medium text-slate-400">Match Preview</label>
                            <span className="text-xs text-slate-500">
                                {result.matches.length} match{result.matches.length !== 1 ? 'es' : ''}
                            </span>
                        </div>
                        <div className="w-full h-48 bg-slate-950 border border-slate-800 rounded-lg p-3 font-mono text-sm overflow-auto whitespace-pre-wrap text-slate-300">
                            {highlightedText}
                        </div>
                    </div>
                </div>

                {result.matches.length > 0 && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Match Details</label>
                        <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-slate-950 text-slate-400">
                                    <tr>
                                        <th className="px-4 py-2 font-medium">#</th>
                                        <th className="px-4 py-2 font-medium">Match</th>
                                        <th className="px-4 py-2 font-medium">Index</th>
                                        <th className="px-4 py-2 font-medium">Groups</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-800">
                                    {result.matches.map((match, i) => (
                                        <tr key={i} className="hover:bg-slate-800/50">
                                            <td className="px-4 py-2 text-slate-500">{i + 1}</td>
                                            <td className="px-4 py-2 font-mono text-blue-300">{match.text}</td>
                                            <td className="px-4 py-2 font-mono text-slate-400">{match.index}</td>
                                            <td className="px-4 py-2 font-mono text-slate-400">
                                                {match.groups ? JSON.stringify(match.groups) : '-'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
