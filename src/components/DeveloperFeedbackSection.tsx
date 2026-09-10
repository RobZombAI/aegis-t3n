import { Bug } from 'lucide-react';

export const DeveloperFeedbackSection: React.FC = () => {
  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-950/40 via-slate-950 to-slate-900 border border-amber-500/30 shadow-xl">
        <div className="max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
            <Bug className="w-3.5 h-3.5 text-amber-400" />
            <span>Official Superteam Challenge Requirement: Bug & DX Submission</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            T3N ADK Developer Experience & Audit Report
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
            As requested by the bounty evaluators, our team conducted an exhaustive technical audit of
            <code className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300 text-xs mx-1">
              @terminal3/t3n-sdk@5.2.0
            </code>
            and the refreshed documentation at <a href="https://docs.terminal3.io" target="_blank" rel="noreferrer" className="text-cyan-400 underline">docs.terminal3.io</a>.
            Below are our actionable findings and recommended improvements for Terminal 3 core engineers.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Finding 1 */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[11px] font-bold font-mono">
              DX Finding #1 • Medium Severity
            </span>
            <span className="text-xs font-mono text-slate-500">loadWasmComponent()</span>
          </div>
          <h3 className="text-base font-bold text-white">
            WASM Component Bundler Conflicts in Modern Frameworks
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In Vite 5+, Next.js Turbopack, and Webpack 5, the dynamic import of the internal WASM cryptographic component triggers MIME-type and memory initialization issues.
          </p>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-900 space-y-1.5 font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Recommended Documentation Snippet:</span>
            <p className="text-emerald-400 text-[11px]">
              Document <code className="text-white">serverExternalPackages: ['@terminal3/t3n-sdk']</code> in <code className="text-white">next.config.js</code> and provide a headless Node/TSX agent architecture pattern.
            </p>
          </div>
        </div>

        {/* Finding 2 */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 text-[11px] font-bold font-mono">
              DX Finding #2 • Low Severity
            </span>
            <span className="text-xs font-mono text-slate-500">TypeScript Typings</span>
          </div>
          <h3 className="text-base font-bold text-white">
            TypeScript Typings Mismatch for fetchTrustedManifest()
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            In strict TypeScript builds, passing <code className="text-cyan-300">await fetchTrustedManifest("testnet")</code> into <code className="text-cyan-300">new T3nClient</code> can trigger a union type mismatch in tsconfig strict mode.
          </p>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-900 space-y-1.5 font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Recommended Fix:</span>
            <p className="text-emerald-400 text-[11px]">
              Export a unified <code className="text-white">TrustAnchor</code> interface in the root SDK package so casting is never required.
            </p>
          </div>
        </div>

        {/* Finding 3 */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 text-[11px] font-bold font-mono">
              DX Finding #3 • Documentation Gap
            </span>
            <span className="text-xs font-mono text-slate-500">CLI vs SDK</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Package Demarcation: @terminal3/t3n-sdk vs t3n CLI
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The agent card guide shows <code className="text-purple-300">t3n agent create-card</code>, but developers installing only the SDK don't have the global <code className="text-purple-300">t3n</code> binary installed.
          </p>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-900 space-y-1.5 font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Recommended Fix:</span>
            <p className="text-emerald-400 text-[11px]">
              Add <code className="text-white">npm install -g @terminal3/t3n-cli</code> to the prerequisites section of <code className="text-white">register-agent.md</code>.
            </p>
          </div>
        </div>

        {/* Finding 4 */}
        <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold font-mono">
              DX Finding #4 • Major Value Add
            </span>
            <span className="text-xs font-mono text-slate-500">Autonomous Agents</span>
          </div>
          <h3 className="text-base font-bold text-white">
            Headless Autonomous Authentication Without Interactive SSO
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            The community link prompts for Google OAuth. However, autonomous agents in swarm architectures or CI/CD pipelines cannot click interactive browser buttons.
          </p>
          <div className="p-3 rounded-2xl bg-slate-950 border border-slate-900 space-y-1.5 font-mono text-xs">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Proven Discovery:</span>
            <p className="text-emerald-400 text-[11px]">
              Aegis proved that raw Ethereum private keys can authenticate directly to T3N via <code className="text-white">metamask_sign</code> in headless scripts. Highlight this prominently!
            </p>
          </div>
        </div>

      </div>

      {/* Full Report Link */}
      <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
        <span>Complete Technical Audit File: <code className="text-white font-bold">T3N_DEVELOPER_FEEDBACK.md</code></span>
        <span className="text-emerald-400 font-bold">Ready for Superteam Evaluation</span>
      </div>

    </div>
  );
};
