import React, { useState, useEffect } from 'react';
import { CalendarClock, Copy, Check } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { generateCron, type CronOptions } from '../utils/scheduled';

export function ScheduledGenerator() {
    const [type, setType] = useState<'every' | 'daily' | 'weekly'>('every');
    const [unit, setUnit] = useState<'seconds' | 'minutes' | 'hours'>('minutes');
    const [value, setValue] = useState(5);
    const [hour, setHour] = useState(0);
    const [minute, setMinute] = useState(0);
    const [days, setDays] = useState<string[]>(['MON']);
    const [generated, setGenerated] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        let options: CronOptions;
        if (type === 'every') {
            options = { type, unit, value };
        } else if (type === 'daily') {
            options = { type, hour, minute };
        } else {
            options = { type, days, hour, minute };
        }
        setGenerated(`@Scheduled(cron = "${generateCron(options)}")`);
    }, [type, unit, value, hour, minute, days]);

    const handleCopy = () => {
        navigator.clipboard.writeText(generated);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const toggleDay = (day: string) => {
        if (days.includes(day)) {
            setDays(days.filter(d => d !== day));
        } else {
            setDays([...days, day]);
        }
    };

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <CalendarClock className="w-6 h-6 text-emerald-400" />
                    <CardTitle>Spring @Scheduled Generator</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex gap-4">
                    {['every', 'daily', 'weekly'].map((t) => (
                        <button
                            key={t}
                            onClick={() => setType(t as any)}
                            className={`px-4 py-2 rounded-lg capitalize transition-colors ${type === t
                                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50'
                                    : 'bg-slate-900 text-slate-400 border border-slate-800 hover:bg-slate-800'
                                }`}
                        >
                            {t}
                        </button>
                    ))}
                </div>

                <div className="space-y-4 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
                    {type === 'every' && (
                        <div className="flex items-center gap-4">
                            <span className="text-slate-300">Run every</span>
                            <input
                                type="number"
                                min="1"
                                value={value}
                                onChange={(e) => setValue(parseInt(e.target.value) || 1)}
                                className="bg-slate-950 border border-slate-700 rounded px-3 py-1 w-20 text-center focus:border-emerald-500 outline-none"
                            />
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value as any)}
                                className="bg-slate-950 border border-slate-700 rounded px-3 py-1 focus:border-emerald-500 outline-none"
                            >
                                <option value="seconds">Seconds</option>
                                <option value="minutes">Minutes</option>
                                <option value="hours">Hours</option>
                            </select>
                        </div>
                    )}

                    {(type === 'daily' || type === 'weekly') && (
                        <div className="flex items-center gap-4">
                            <span className="text-slate-300">At</span>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    min="0"
                                    max="23"
                                    value={hour}
                                    onChange={(e) => setHour(parseInt(e.target.value) || 0)}
                                    className="bg-slate-950 border border-slate-700 rounded px-3 py-1 w-16 text-center focus:border-emerald-500 outline-none"
                                />
                                <span className="text-slate-500">:</span>
                                <input
                                    type="number"
                                    min="0"
                                    max="59"
                                    value={minute}
                                    onChange={(e) => setMinute(parseInt(e.target.value) || 0)}
                                    className="bg-slate-950 border border-slate-700 rounded px-3 py-1 w-16 text-center focus:border-emerald-500 outline-none"
                                />
                            </div>
                        </div>
                    )}

                    {type === 'weekly' && (
                        <div className="space-y-2">
                            <span className="text-slate-300 block">On days</span>
                            <div className="flex flex-wrap gap-2">
                                {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                                    <button
                                        key={day}
                                        onClick={() => toggleDay(day)}
                                        className={`px-3 py-1 rounded text-sm transition-colors ${days.includes(day)
                                                ? 'bg-emerald-500 text-white'
                                                : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-600'
                                            }`}
                                    >
                                        {day}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-lg blur opacity-75 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-slate-950 border border-slate-800 rounded-lg p-4 flex items-center justify-between">
                        <code className="font-mono text-emerald-300 text-sm sm:text-base break-all">
                            {generated}
                        </code>
                        <button
                            onClick={handleCopy}
                            className="ml-4 p-2 hover:bg-slate-800 rounded-lg transition-colors text-slate-400 hover:text-white"
                            title="Copy to clipboard"
                        >
                            {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Copy className="w-5 h-5" />}
                        </button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
