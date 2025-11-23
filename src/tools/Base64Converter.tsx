import React, { useState } from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { toBase64, fromBase64 } from '../utils/base64';

export function Base64Converter() {
    const [text, setText] = useState('');
    const [encoded, setEncoded] = useState('');
    const [error, setError] = useState('');

    const handleTextChange = (value: string) => {
        setText(value);
        setError('');
        if (!value) {
            setEncoded('');
            return;
        }
        const res = toBase64(value);
        if (res) {
            setEncoded(res);
        } else {
            setError('Failed to encode text');
        }
    };

    const handleEncodedChange = (value: string) => {
        setEncoded(value);
        setError('');
        if (!value) {
            setText('');
            return;
        }
        const res = fromBase64(value);
        if (res) {
            setText(res);
        } else {
            // Don't show error immediately while typing, but maybe if invalid
            // Actually fromBase64 returns empty string on error in my util
            // I might want to distinguish empty vs error
        }
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const result = e.target?.result as string;
            // result is data:mime;base64,encoded...
            // We just want the encoded part usually, or maybe the whole thing?
            // "Option to encode file -> Base64" usually implies the content.
            // FileReader.readAsDataURL returns the whole data URI.
            // I'll strip the prefix to get raw base64.
            const base64 = result.split(',')[1];
            setEncoded(base64);
            // We can't easily decode binary base64 to text if it's not text, so we leave text empty or show info
            setText(`[Binary file: ${file.name}]`);
        };
        reader.readAsDataURL(file);
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <FileText className="w-6 h-6 text-orange-400" />
                    <CardTitle>Base64 Encoder / Decoder</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Text Input</label>
                        <textarea
                            value={text}
                            onChange={(e) => handleTextChange(e.target.value)}
                            className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none"
                            placeholder="Type text to encode..."
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-400">Base64 Output</label>
                        <textarea
                            value={encoded}
                            onChange={(e) => handleEncodedChange(e.target.value)}
                            className="w-full h-40 bg-slate-900 border border-slate-700 rounded-lg p-3 font-mono text-sm focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none"
                            placeholder="Type Base64 to decode..."
                        />
                    </div>
                </div>

                {error && <p className="text-red-400 text-sm">{error}</p>}

                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                    <div className="relative">
                        <input
                            type="file"
                            onChange={handleFileUpload}
                            className="hidden"
                            id="file-upload"
                        />
                        <label
                            htmlFor="file-upload"
                            className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-orange-400 transition-colors"
                        >
                            <Upload className="w-4 h-4" />
                            <span className="text-sm">Encode File</span>
                        </label>
                    </div>
                    <button
                        onClick={() => { setText(''); setEncoded(''); setError(''); }}
                        className="text-slate-400 hover:text-slate-200 text-sm transition-colors"
                    >
                        Clear All
                    </button>
                </div>
            </CardContent>
        </Card>
    );
}
