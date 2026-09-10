import React, { useState } from 'react'
import { TrendingUp, Activity, ArrowUpRight } from 'lucide-react'

export const PriceChart: React.FC = () => {
  const [timeframe, setTimeframe] = useState<'1H' | '24H' | '7D' | '30D'>('24H')

  // Synthetic price curve data points for the SVG chart
  const dataPoints = [
    32, 34, 31, 38, 42, 39, 45, 48, 44, 52, 56, 54, 62, 68, 65, 74, 82, 80, 88, 92, 89, 96, 100
  ]

  const maxVal = Math.max(...dataPoints)
  const minVal = Math.min(...dataPoints)
  const range = maxVal - minVal || 1

  // Map to SVG coordinates (width: 600, height: 180)
  const svgPoints = dataPoints
    .map((val, idx) => {
      const x = (idx / (dataPoints.length - 1)) * 600
      const y = 170 - ((val - minVal) / range) * 140
      return `${x},${y}`
    })
    .join(' ')

  const areaPoints = `0,180 ${svgPoints} 600,180`

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-2xl">🍪</span>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-white tracking-tight">COOK / USDC</h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold font-mono flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> +14.85%
                </span>
              </div>
              <span className="text-xs text-slate-400">Cookie Chain SVM Native Pair (Cookieswap AMM)</span>
            </div>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs self-start sm:self-auto">
          {(['1H', '24H', '7D', '30D'] as const).map((tf) => (
            <button
              key={tf}
              onClick={() => setTimeframe(tf)}
              className={`px-3 py-1 rounded-lg font-mono font-bold transition ${
                timeframe === tf
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
        <div>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Prezzo COOK</span>
          <span className="text-2xl font-black text-white font-mono">$0.0864</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Volume 24h</span>
          <span className="text-2xl font-black text-amber-300 font-mono">$1,420,850</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">TVL su Cookieswap</span>
          <span className="text-2xl font-black text-cyan-400 font-mono">$4,190,000</span>
        </div>
        <div>
          <span className="text-[11px] text-slate-400 uppercase tracking-wider block">Market Cap</span>
          <span className="text-2xl font-black text-purple-400 font-mono">$86.4M</span>
        </div>
      </div>

      {/* Interactive SVG Chart */}
      <div className="relative w-full h-48 bg-slate-950/60 rounded-2xl border border-slate-800/80 p-2 overflow-hidden flex items-end">
        <svg viewBox="0 0 600 180" className="w-full h-full overflow-visible" preserveAspectRatio="none">
          <defs>
            <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <line x1="0" y1="45" x2="600" y2="45" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="0" y1="90" x2="600" y2="90" stroke="#1e293b" strokeDasharray="3 3" />
          <line x1="0" y1="135" x2="600" y2="135" stroke="#1e293b" strokeDasharray="3 3" />

          {/* Area Fill */}
          <polygon points={areaPoints} fill="url(#chartGradient)" />

          {/* Smooth Line */}
          <polyline
            points={svgPoints}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Pulsing End Dot */}
          <circle cx="600" cy="30" r="5" fill="#f59e0b" className="animate-ping opacity-75" />
          <circle cx="600" cy="30" r="4" fill="#fbbf24" />
        </svg>

        <div className="absolute top-3 right-4 flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-slate-900/90 px-2.5 py-1 rounded-lg border border-slate-800">
          <Activity className="w-3 h-3 animate-pulse" /> Live Orderbook
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
        <span>Routing pool: <code className="text-slate-400">COOK-USDC (Hyperlane Warp)</code></span>
        <a
          href="https://cookieswap.fun"
          target="_blank"
          rel="noreferrer"
          className="text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
        >
          Vedi su Cookieswap <ArrowUpRight className="w-3 h-3" />
        </a>
      </div>
    </div>
  )
}
