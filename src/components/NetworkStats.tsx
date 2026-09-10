import React from 'react'
import { Cpu, Zap, Clock, Server, ArrowUpRight } from 'lucide-react'
import type { NetworkStats as NetworkStatsType } from '../types'
import { COOKIE_EXPLORER_URL } from '../services/cookieChain'

interface Props {
  stats: NetworkStatsType | null
  loading?: boolean
}

export const NetworkStats: React.FC<Props> = ({ stats }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      
      {/* Current Slot */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-amber-500/30 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Slot Corrente</span>
          <Cpu className="w-4 h-4 text-amber-400" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
            {stats?.slot.toLocaleString() || '24,391,429'}
          </span>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
            Blocchi live
          </span>
          <a
            href={`${COOKIE_EXPLORER_URL}/slot/${stats?.slot || ''}`}
            target="_blank"
            rel="noreferrer"
            className="text-amber-400/80 hover:text-amber-300 flex items-center gap-0.5"
          >
            Explorer <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-amber-500/5 rounded-full blur-xl pointer-events-none"></div>
      </div>

      {/* Finality & Speed */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-cyan-500/30 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Finalità Blocco</span>
          <Zap className="w-4 h-4 text-cyan-400" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-cyan-400 tracking-tight">
            ~0.8s
          </span>
          <span className="text-xs text-slate-400">Sub-second</span>
        </div>
        <div className="mt-3 text-xs text-slate-400 flex items-center justify-between">
          <span>Throughput:</span>
          <span className="font-mono text-slate-200 font-semibold">
            {stats?.tpsEstimated || 920} TPS
          </span>
        </div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-cyan-500/5 rounded-full blur-xl pointer-events-none"></div>
      </div>

      {/* Epoch Progress */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-purple-500/30 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">
            Epoca {stats?.epoch || 58}
          </span>
          <Clock className="w-4 h-4 text-purple-400" />
        </div>
        <div className="flex items-baseline space-x-2">
          <span className="text-2xl sm:text-3xl font-mono font-bold text-white tracking-tight">
            {stats?.epochProgress || 68}%
          </span>
        </div>
        <div className="mt-3">
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-500 to-amber-400 h-full rounded-full transition-all duration-1000"
              style={{ width: `${stats?.epochProgress || 68}%` }}
            ></div>
          </div>
        </div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-purple-500/5 rounded-full blur-xl pointer-events-none"></div>
      </div>

      {/* Node Health & Cluster */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden group hover:border-emerald-500/30 transition">
        <div className="flex items-center justify-between text-slate-400 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider">Cluster SVM</span>
          <Server className="w-4 h-4 text-emerald-400" />
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 font-bold text-sm border border-emerald-500/20">
            {stats?.health === 'ok' ? 'Online 100%' : 'Degraded'}
          </span>
          <span className="text-xs font-mono text-slate-400">
            {stats?.latencyMs || 42}ms ping
          </span>
        </div>
        <div className="mt-3 text-xs text-slate-400 truncate">
          {stats?.clusterVersion || 'Cookie SVM Engine'}
        </div>
        <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-emerald-500/5 rounded-full blur-xl pointer-events-none"></div>
      </div>

    </div>
  )
}
