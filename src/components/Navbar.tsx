import React, { useState } from 'react'
import { Cookie, Wallet, Search, ArrowRight } from 'lucide-react'
import type { WalletState, NetworkStats } from '../types'
import { COOKIE_EXPLORER_URL } from '../services/cookieChain'

interface NavbarProps {
  wallet: WalletState
  stats: NetworkStats | null
  onConnectWallet: () => void
  onDisconnectWallet: () => void
}

export const Navbar: React.FC<NavbarProps> = ({
  wallet,
  stats,
  onConnectWallet,
  onDisconnectWallet,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const q = searchQuery.trim()
    if (!q) return

    // If numeric, it's a slot
    if (/^\d+$/.test(q)) {
      window.open(`${COOKIE_EXPLORER_URL}/slot/${q}`, '_blank')
    } else if (q.length > 50) {
      // Transaction signature is ~88 chars
      window.open(`${COOKIE_EXPLORER_URL}/tx/${q}`, '_blank')
    } else {
      // Address or token
      window.open(`${COOKIE_EXPLORER_URL}/address/${q}`, '_blank')
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        
        {/* Brand */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-amber-200 text-slate-950 shadow-lg shadow-amber-500/20 glow-cookie">
            <Cookie className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-extrabold text-2xl tracking-tight text-white">
                Cookie<span className="text-amber-400">Pulse</span>
              </span>
              <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                SVM
              </span>
            </div>
            <p className="text-xs text-slate-400 hidden sm:block">
              Cookie Chain Terminal & dApp Suite
            </p>
          </div>
        </div>

        {/* Global Explorer Search Bar */}
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-md relative items-center"
        >
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca Indirizzo, Tx Hash o Slot su CookieScan..."
            className="w-full bg-slate-900/90 border border-slate-800 hover:border-slate-700 rounded-full pl-9 pr-9 py-2 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400 transition"
          />
          <button
            type="submit"
            className="absolute right-2.5 text-slate-500 hover:text-amber-400 transition p-1"
            title="Cerca"
          >
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* Network status pill & Wallet Controls */}
        <div className="flex items-center space-x-3 shrink-0">
          <div className="hidden lg:flex items-center space-x-2.5 bg-slate-900/90 border border-slate-800 px-3 py-1.5 rounded-full text-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 font-medium">Mainnet</span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400 font-mono">
              {stats?.latencyMs ? `${stats.latencyMs}ms` : '42ms'}
            </span>
          </div>

          {wallet.connected && wallet.publicKey ? (
            <div className="flex items-center space-x-2">
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-mono text-amber-400 font-bold">
                  {wallet.balanceCook.toFixed(3)} COOK
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {wallet.publicKey.slice(0, 4)}...{wallet.publicKey.slice(-4)}
                </span>
              </div>
              <button
                onClick={onDisconnectWallet}
                className="flex items-center space-x-2 bg-slate-800/80 hover:bg-red-500/20 hover:border-red-500/40 border border-slate-700 text-slate-200 px-3.5 py-2 rounded-xl text-sm font-medium transition"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Disconnetti</span>
              </button>
            </div>
          ) : (
            <button
              onClick={onConnectWallet}
              disabled={wallet.connecting}
              className="flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-sm shadow-lg shadow-amber-500/25 transition transform active:scale-95"
            >
              <Wallet className="w-4 h-4" />
              <span>{wallet.connecting ? 'Connessione...' : 'Connetti Wallet'}</span>
            </button>
          )}
        </div>

      </div>
    </header>
  )
}
