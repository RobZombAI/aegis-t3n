import { useState } from 'react';
import { FileJson, Copy, Check, Network } from 'lucide-react';
import { T3N_AGENT_CONFIG } from '../services/aegisService';

export const AgentCardSection: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const agentCardData = {
    type: "https://eips.ethereum.org/EIPS/eip-8004#registration-v1",
    name: "Aegis-T3N Confidential Enterprise Agent",
    description: "Enterprise-grade confidential compliance, verifiable credential validation, and private payroll computation agent running on Terminal 3 Network (T3N) confidential compute enclaves.",
    image: "https://raw.githubusercontent.com/RobZombAI/aegis-t3n/master/public/aegis-avatar.png",
    services: [
      {
        name: "A2A",
        endpoint: "https://robzombai.github.io/aegis-t3n/.well-known/agent-card.json",
        version: "0.3.0"
      },
      {
        name: "MCP",
        endpoint: "https://mcp.aegis-t3n.terminal3.io/v1",
        version: "2025-06-18"
      },
      {
        name: "DID",
        endpoint: T3N_AGENT_CONFIG.did,
        version: "v1"
      }
    ],
    x402Support: false,
    active: true,
    registrations: [
      {
        standard: "ERC-8004",
        scope: "enterprise:confidential-payroll-and-compliance"
      }
    ],
    supportedTrust: [
      "tee-attestation",
      "intel-sgx-dcap",
      "t3n-trust-anchor"
    ]
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(agentCardData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Overview Card */}
      <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-bold tracking-wide mb-2">
              <Network className="w-3.5 h-3.5 text-purple-400" />
              <span>ERC-8004 / A2A Standard Registration</span>
            </div>
            <h2 className="text-2xl font-black text-white tracking-tight">
              Agent Identity & Protocol Card
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1">
              Published on-chain and discoverable by other autonomous agents and enterprise clients.
            </p>
          </div>

          <button
            onClick={handleCopyJson}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs text-white transition font-mono self-start sm:self-auto"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Card Copied!' : 'Copy JSON Card'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Service 1: DID */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Primary Identity</span>
            <span className="text-emerald-400">Active</span>
          </div>
          <h4 className="text-base font-bold text-white">Decentralized Identifier (DID)</h4>
          <p className="text-xs font-mono text-cyan-400 break-all bg-slate-950 p-2.5 rounded-xl border border-slate-900">
            {T3N_AGENT_CONFIG.did}
          </p>
        </div>

        {/* Service 2: A2A Protocol */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Agent-to-Agent</span>
            <span className="text-purple-400">v0.3.0</span>
          </div>
          <h4 className="text-base font-bold text-white">A2A Protocol Endpoint</h4>
          <p className="text-xs font-mono text-purple-300 break-all bg-slate-950 p-2.5 rounded-xl border border-slate-900">
            https://robzombai.github.io/aegis-t3n/.well-known/agent-card.json
          </p>
        </div>

        {/* Service 3: MCP Endpoint */}
        <div className="glass-panel rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>Model Context Protocol</span>
            <span className="text-amber-400">2025-06-18</span>
          </div>
          <h4 className="text-base font-bold text-white">MCP Server Gateway</h4>
          <p className="text-xs font-mono text-amber-300 break-all bg-slate-950 p-2.5 rounded-xl border border-slate-900">
            https://mcp.aegis-t3n.terminal3.io/v1
          </p>
        </div>

      </div>

      {/* Raw JSON Card Viewer */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <FileJson className="w-4 h-4 text-cyan-400" />
            Raw ERC-8004 agent-card.json Payload
          </h3>
          <span className="text-xs font-mono text-slate-500">Self-hosted & Attested</span>
        </div>
        <pre className="p-4 rounded-2xl bg-slate-950 border border-slate-900 text-xs font-mono text-cyan-300/90 overflow-x-auto leading-relaxed">
          {JSON.stringify(agentCardData, null, 2)}
        </pre>
      </div>

    </div>
  );
};
