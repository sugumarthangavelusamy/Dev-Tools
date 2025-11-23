import React, { useState } from 'react';
import { Search, Settings } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { searchProperties } from '../utils/properties';

export function PropertyExplorer() {
    const [query, setQuery] = useState('');
    const results = searchProperties(query);

    return (
        <Card className="w-full max-w-6xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Settings className="w-6 h-6 text-green-400" />
                    <CardTitle>Spring Boot Property Explorer</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-3 focus:border-green-500 focus:ring-1 focus:ring-green-500 outline-none transition-all"
                        placeholder="Search properties by name or description..."
                    />
                </div>

                <div className="text-sm text-slate-500">
                    Showing {results.length} {results.length === 1 ? 'property' : 'properties'}
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-950 text-slate-400 sticky top-0">
                                <tr>
                                    <th className="px-4 py-3 font-medium">Property Key</th>
                                    <th className="px-4 py-3 font-medium">Default Value</th>
                                    <th className="px-4 py-3 font-medium">Description</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-800">
                                {results.map((prop, i) => (
                                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-4 py-3 font-mono text-green-300">{prop.key}</td>
                                        <td className="px-4 py-3 font-mono text-slate-400">
                                            {prop.defaultValue || <span className="text-slate-600 italic">none</span>}
                                        </td>
                                        <td className="px-4 py-3 text-slate-300">{prop.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
