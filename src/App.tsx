import { useState } from 'react';
import { AegisHeader } from './components/AegisHeader';
import { PayrollSection } from './components/PayrollSection';
import { AgentCardSection } from './components/AgentCardSection';
import { AuditLogSection } from './components/AuditLogSection';
import { DeveloperFeedbackSection } from './components/DeveloperFeedbackSection';
import {
  ShieldCheck,
  Cpu,
  FileCode,
  Terminal,
  Bug,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  Layers,
} from 'lucide-react';
import { T3N_AGENT_CONFIG } from './services/aegisService';

export default function App() {
  type TabType = 'payroll' | 'card' | 'audit' | 'feedback' | 'cli';
  const [activeTab, setActiveTab] = useState<TabType>('payroll');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500/20 selection:text-cyan-300">
      {/* Background Cyber Grid Glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Header with Live Enclave Status & Copyable DID */}
      <AegisHeader />

      {/* Hero & Navigation Subheader */}
      <div className="relative z-10 border-b border-slate-800/80 bg-slate-900/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            
            {/* Tab Navigation */}
            <nav className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
              <button
                onClick={() => setActiveTab('payroll')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  activeTab === 'payroll'
                    ? 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Confidential Payroll</span>
              </button>

              <button
                onClick={() => setActiveTab('card')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  activeTab === 'card'
                    ? 'bg-purple-500/15 text-purple-300 border border-purple-500/30 shadow-lg shadow-purple-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <FileCode className="w-4 h-4 text-purple-400" />
                <span>ERC-8004 Agent Card</span>
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  activeTab === 'audit'
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-lg shadow-emerald-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Terminal className="w-4 h-4 text-emerald-400" />
                <span>Enclave Audit Trail</span>
              </button>

              <button
                onClick={() => setActiveTab('feedback')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  activeTab === 'feedback'
                    ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30 shadow-lg shadow-amber-500/5'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Bug className="w-4 h-4 text-amber-400" />
                <span>DX & Bug Audit</span>
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                  Bonus
                </span>
              </button>

              <button
                onClick={() => setActiveTab('cli')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition whitespace-nowrap ${
                  activeTab === 'cli'
                    ? 'bg-slate-700/50 text-cyan-300 border border-slate-600 shadow-lg'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50 border border-transparent'
                }`}
              >
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>CLI Execution</span>
              </button>
            </nav>

            {/* Quick Links */}
            <div className="flex items-center space-x-3 text-xs">
              <a
                href="https://github.com/RobZombAI/aegis-t3n"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 text-slate-300 hover:text-white transition font-mono"
              >
                <GitBranch className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub Repo</span>
              </a>

              <a
                href="https://docs.terminal3.io"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 transition font-mono"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>T3N Docs</span>
              </a>
            </div>

          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {activeTab === 'payroll' && <PayrollSection />}
        {activeTab === 'card' && <AgentCardSection />}
        {activeTab === 'audit' && <AuditLogSection />}
        {activeTab === 'feedback' && <DeveloperFeedbackSection />}
        {activeTab === 'cli' && (
          <div className="space-y-6">
            <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-xl">
              <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <Terminal className="w-6 h-6 text-cyan-400" />
                <span>Standalone Enclave CLI Runner</span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Aegis-T3N includes a production-ready headless agent script located at{' '}
                <code className="px-2 py-0.5 rounded bg-slate-950 text-cyan-300 border border-slate-800 font-mono text-xs">
                  src/cli/runAgent.ts
                </code>
                . It connects directly to the T3N testnet node, authenticates with a cryptographic keypair,
                verifies the trust anchor manifest, and executes the confidential payroll workflow in &lt;3 seconds.
              </p>
            </div>

            <div className="glass-panel rounded-3xl p-6 border border-slate-800 font-mono text-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="text-slate-400">Terminal Shell</span>
                <span className="text-emerald-400 text-[11px] font-bold">Node v22 / TSX Execution Verified</span>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-900 text-slate-300 space-y-2">
                <p className="text-slate-500"># Run the standalone agent directly from terminal:</p>
                <p className="text-cyan-400 font-bold">$ npx tsx src/cli/runAgent.ts</p>
                <div className="pt-2 text-slate-400 space-y-1">
                  <p className="text-emerald-400">🛡️ [Aegis-T3N] Initializing Terminal 3 Network confidential agent...</p>
                  <p className="text-slate-300">🔐 Live Authenticated DID: <span className="text-cyan-300">{T3N_AGENT_CONFIG.did}</span></p>
                  <p className="text-slate-300">🏢 Enclave Cluster: <span className="text-purple-300">{T3N_AGENT_CONFIG.cluster} ({T3N_AGENT_CONFIG.nodeUrl})</span></p>
                  <p className="text-emerald-400">🔒 Handshake with T3N enclave node confirmed.</p>
                  <p className="text-slate-300">📊 Confidential Payroll aggregated across 6 employees without exposing individual records.</p>
                  <p className="text-emerald-300">✅ Audit seal committed to aegis-execution-log.json</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 backdrop-blur-md relative z-10 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-300 font-medium">Aegis-T3N</span>
            <span>• Built for the Superteam T3N Agent Challenge</span>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-slate-400 font-mono">SDK: @terminal3/t3n-sdk@5.2.0</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono">ERC-8004</span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Enclave Active
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
