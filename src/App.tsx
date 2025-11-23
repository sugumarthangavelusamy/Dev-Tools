import React from 'react';
import { CronAnalyzer } from './tools/CronAnalyzer';
import { ScheduledGenerator } from './tools/ScheduledGenerator';
import { UuidGenerator } from './tools/UuidGenerator';
import { Base64Converter } from './tools/Base64Converter';
import { JsonGroovyConverter } from './tools/JsonGroovyConverter';
import { JwtDecoder } from './tools/JwtDecoder';
import { RegexTester } from './tools/RegexTester';
import { PropertyExplorer } from './tools/PropertyExplorer';
import { Hammer } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="flex items-center gap-3 pb-8 border-b border-slate-800">
          <div className="p-3 bg-indigo-500/10 rounded-xl">
            <Hammer className="w-8 h-8 text-indigo-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
              DevToolkit
            </h1>
            <p className="text-slate-400">Essential utilities for Java/Spring developers</p>
          </div>
        </header>

        <main className="grid grid-cols-1 gap-8">
          <section>
            <CronAnalyzer />
          </section>
          <section>
            <ScheduledGenerator />
          </section>
          <section>
            <UuidGenerator />
          </section>
          <section>
            <Base64Converter />
          </section>
          <section>
            <JsonGroovyConverter />
          </section>
          <section>
            <JwtDecoder />
          </section>
          <section>
            <RegexTester />
          </section>
          <section>
            <PropertyExplorer />
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
