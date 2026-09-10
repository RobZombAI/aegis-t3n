import React, { useState, useEffect } from 'react'
import { ArrowUpRight, Zap, Repeat, Coins } from 'lucide-react'
import { COOKIE_EXPLORER_URL } from '../services/cookieChain'

interface ActivityItem {
  id: string
  type: 'transfer' | 'swap' | 'mint'
  desc: string
  amount: string
  slot: number
  timeAgo: string
  signature: string
}

export const LiveActivityFeed: React.FC = () => {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'swap',
      desc: 'Swap COOK ➔ USDC',
      amount: '450.00 COOK',
      slot: 24392410,
      timeAgo: '1s fa',
      signature: '5CookieSwap998412891924871249817249124',
    },
    {
      id: '2',
      type: 'transfer',
      desc: 'Trasferimento Nativo',
      amount: '12.50 COOK',
      slot: 24392408,
      timeAgo: '3s fa',
      signature: '5CookieTx8712391283719827391827391827',
    },
    {
      id: '3',
      type: 'mint',
      desc: 'Token Mint ($CHIP)',
      amount: '10,000 CHIP',
      slot: 24392405,
      timeAgo: '6s fa',
      signature: '5CookieMint1230918230918230918230912',
    },
  ])

  // Stream in new live simulated transactions periodically
  useEffect(() => {
    const types: ('transfer' | 'swap' | 'mint')[] = ['transfer', 'swap', 'mint']
    const descs = [
      'Swap COOK ➔ USDC',
      'Trasferimento Nativo',
      'TipJar Mancia Creatore',
      'Cookieswap Liquidity Add',
      'Fortune Cookie Mint',
    ]

    const interval = setInterval(() => {
      const selectedType = types[Math.floor(Math.random() * types.length)]
      const selectedDesc = descs[Math.floor(Math.random() * descs.length)]
      const randomAmt = (Math.random() * 85 + 1).toFixed(2)
      const randomSlot = 24392415 + Math.floor(Math.random() * 50)
      const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
      const sig = '5Cookie' + Array.from({ length: 30 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')

      const newItem: ActivityItem = {
        id: Math.random().toString(),
        type: selectedType,
        desc: selectedDesc,
        amount: `${randomAmt} COOK`,
        slot: randomSlot,
        timeAgo: 'Adesso',
        signature: sig,
      }

      setActivities((prev) => [newItem, ...prev.slice(0, 4)])
    }, 3800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-panel rounded-3xl p-6 border border-slate-800 space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
        <div className="flex items-center space-x-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <h4 className="text-sm font-bold text-white uppercase tracking-wider">
            Attività Live on Cookie Chain
          </h4>
        </div>
        <span className="text-[11px] font-mono text-slate-500">Sub-second Feed</span>
      </div>

      <div className="space-y-2.5">
        {activities.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition animate-in fade-in slide-in-from-top-1 duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-amber-400">
                {item.type === 'swap' ? (
                  <Repeat className="w-3.5 h-3.5 text-cyan-400" />
                ) : item.type === 'mint' ? (
                  <Coins className="w-3.5 h-3.5 text-purple-400" />
                ) : (
                  <Zap className="w-3.5 h-3.5 text-amber-400" />
                )}
              </div>
              <div>
                <span className="text-xs font-semibold text-white block">{item.desc}</span>
                <span className="text-[10px] font-mono text-slate-500">
                  Slot #{item.slot.toLocaleString()} • {item.timeAgo}
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-amber-400 block">{item.amount}</span>
              <a
                href={`${COOKIE_EXPLORER_URL}/tx/${item.signature}`}
                target="_blank"
                rel="noreferrer"
                className="text-[10px] text-slate-500 hover:text-white inline-flex items-center gap-0.5 font-mono"
              >
                Explorer <ArrowUpRight className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
