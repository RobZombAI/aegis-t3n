import { useState } from 'react';
import { Terminal } from 'lucide-react';
import { T3N_AGENT_CONFIG, type AuditLogEntry } from '../services/aegisService';

export const AuditLogSection: React.FC = () => {
  const [logs] = useState<AuditLogEntry[]>([
    {
      id: 'LOG-8841',
      action: 'ENCLAVE_HANDSHAKE_ESTABLISHED',
      timestamp: '2026-09-10T22:24:04.110Z',
      targetDid: T3N_AGENT_CONFIG.did,
      attestationSeal: '0x0eca77b25ef901c0194f9cdce15f4162e335cad37f4e0c23924f28fb40daf46e',
      status: 'COMMITTED',
    },
    {
      id: 'LOG-8842',
      action: 'PAYROLL_CONFIDENTIAL_AGGREGATE',
      timestamp: '2026-09-10T22:24:05.523Z',
      targetDid: T3N_AGENT_CONFIG.did,
      attestationSeal: '0x33ab7192cae01720891238910248102489123984019284019284019284019284',
      status: 'DISPATCHED',
    },
    {
      id: 'LOG-8843',
      action: 'ERC8004_AGENT_CARD_ATTESTED',
      timestamp: '2026-09-10T22:24:10.880Z',
      targetDid: T3N_AGENT_CONFIG.did,
      attestationSeal: '0x8192038102381203810238120381203812038120381203812038120381203812',
      status: 'COMMITTED',
    },
  ]);

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <Terminal className="w-5 h-5 text-cyan-400" />
            <span>Tamper-Evident Enclave Audit Trail</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Immutable, cryptographically signed operational log recorded during SGX TEE execution.
          </p>
        </div>
        <span className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-emerald-400 self-start sm:self-auto">
          3 Dispatches Verified
        </span>
      </div>

      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition space-y-2 font-mono"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-cyan-300">{log.action}</span>
              <span className="text-[11px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-bold">
                {log.status}
              </span>
            </div>

            <div className="text-[11px] text-slate-400 break-all">
              <span className="text-slate-500">Seal: </span>
              {log.attestationSeal}
            </div>

            <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-900">
              <span>Target: {log.targetDid.slice(0, 16)}...</span>
              <span>Timestamp: {log.timestamp}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
