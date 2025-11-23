import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, CheckCircle2, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/Card';
import { validateCron, getCronDescription, getNextRunTimes } from '../utils/cron';

export function CronAnalyzer() {
    const [expression, setExpression] = useState('*/5 * * * *');
    const [isValid, setIsValid] = useState(true);
    const [description, setDescription] = useState('');
    const [nextRuns, setNextRuns] = useState<Date[]>([]);

    useEffect(() => {
        const valid = validateCron(expression);
        setIsValid(valid);
        if (valid) {
            setDescription(getCronDescription(expression));
            setNextRuns(getNextRunTimes(expression));
        } else {
            setDescription('Invalid cron expression');
            setNextRuns([]);
        }
    }, [expression]);

    return (
        <Card className="w-full max-w-2xl mx-auto">
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Clock className="w-6 h-6 text-indigo-400" />
                    <CardTitle>Cron Expression Analyzer</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Cron Expression</label>
                    <div className="relative">
                        <input
                            type="text"
                            value={expression}
                            onChange={(e) => setExpression(e.target.value)}
                            className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-lg font-mono focus:outline-none focus:ring-2 transition-all
                ${isValid
                                    ? 'border-slate-700 focus:border-indigo-500 focus:ring-indigo-500/20'
                                    : 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                                }`}
                            placeholder="* * * * *"
                        />
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                            {isValid ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                            ) : (
                                <AlertCircle className="w-5 h-5 text-red-500" />
                            )}
                        </div>
                    </div>
                    <p className={`text-sm ${isValid ? 'text-indigo-300' : 'text-red-400'}`}>
                        {description}
                    </p>
                </div>

                {isValid && nextRuns.length > 0 && (
                    <div className="space-y-3">
                        <h4 className="text-sm font-medium text-slate-400 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Next 5 Runs
                        </h4>
                        <div className="bg-slate-900/50 rounded-lg p-4 space-y-2">
                            {nextRuns.map((run, i) => (
                                <div key={i} className="flex items-center justify-between text-sm">
                                    <span className="text-slate-300 font-mono">
                                        {run.toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                                    </span>
                                    <span className="text-indigo-300 font-mono">
                                        {run.toLocaleTimeString()}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
