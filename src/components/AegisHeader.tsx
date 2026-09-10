import { useState } from 'react';
import { ShieldCheck, Copy, Check, Lock, ExternalLink } from 'lucide-react';
import { T3N_AGENT_CONFIG } from '../services/aegisService';

export const AegisHeader: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyDid = () => {
    navigator.clipboard.writeText(T3N_AGENT_CONFIG.did);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
                  <span>AEGIS</span>
                  <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    T3N Confidential
                  </span>
                </h1>
              </div>
              <p className="text-xs text-slate-400">
                Enterprise Confidential Agent • Terminal 3 Network (T3N)
              </p>
            </div>
          </div>

          {/* Enclave Status & DID Pill */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* TEE Node Status */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs font-mono">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-300">SGX Enclave:</span>
              <span className="text-emerald-400 font-bold">cn-api.sg.testnet</span>
            </div>

            {/* DID Badge */}
            <div className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-xs font-mono">
              <Lock className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-slate-400">DID:</span>
              <span className="text-cyan-300 font-bold">
                {T3N_AGENT_CONFIG.did.slice(0, 12)}...{T3N_AGENT_CONFIG.did.slice(-8)}
              </span>
              <button
                onClick={copyDid}
                className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition"
                title="Copy full DID"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Docs Link */}
            <a
              href="https://docs.terminal3.io"
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs text-slate-300 hover:text-white transition flex items-center gap-1.5"
            >
              <span>T3N Docs</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

          </div>

        </div>
      </div>
    </header>
  );
};
