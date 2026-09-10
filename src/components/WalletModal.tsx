import React from 'react'
import { X, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react'

interface WalletModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectWallet: (type: 'nightly' | 'solana' | 'demo') => void
}

export const WalletModal: React.FC<WalletModalProps> = ({
  isOpen,
  onClose,
  onSelectWallet,
}) => {
  if (!isOpen) return null

  // Check if Nightly is injected in browser
  const hasNightly = typeof window !== 'undefined' && Boolean((window as any).nightly?.solana)
  const hasSolana = typeof window !== 'undefined' && Boolean((window as any).solana)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md glass-panel rounded-3xl p-6 sm:p-8 border border-slate-700/80 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-1 flex items-center gap-2">
          Connetti a <span className="text-amber-400">Cookie Chain</span>
        </h3>
        <p className="text-xs text-slate-400 mb-6">
          Seleziona il tuo wallet compatibile SVM per iniziare.
        </p>

        <div className="space-y-3">
          
          {/* Nightly Wallet (Highlighted for Bounty requirements) */}
          <div
            onClick={() => {
              if (hasNightly) {
                onSelectWallet('nightly')
              } else {
                window.open('https://nightly.app/', '_blank')
              }
            }}
            className="group relative flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-slate-900 to-slate-900 border border-amber-500/30 hover:border-amber-400 cursor-pointer transition"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-black text-lg group-hover:scale-105 transition">
                🌙
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">Nightly Wallet</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Ufficiale
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  {hasNightly ? 'Rilevato nel browser' : 'Clicca per installare Nightly'}
                </p>
              </div>
            </div>
            {hasNightly ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Pronto
              </span>
            ) : (
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-amber-400 transition" />
            )}
          </div>

          {/* Standard Solana Wallet (Phantom / Backpack / Solflare) */}
          <div
            onClick={() => {
              if (hasSolana) {
                onSelectWallet('solana')
              } else {
                window.open('https://phantom.app/', '_blank')
              }
            }}
            className="flex items-center justify-between p-4 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 cursor-pointer transition group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 font-black text-lg group-hover:scale-105 transition">
                👻
              </div>
              <div>
                <span className="font-bold text-white text-sm">Phantom / Solflare</span>
                <p className="text-xs text-slate-400">
                  {hasSolana ? 'Rilevato nel browser' : 'Installa wallet Solana'}
                </p>
              </div>
            </div>
            {hasSolana ? (
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4" /> Pronto
              </span>
            ) : (
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition" />
            )}
          </div>

          {/* Sandbox Judge Demo Mode */}
          <div
            onClick={() => onSelectWallet('demo')}
            className="flex items-center justify-between p-4 rounded-2xl bg-cyan-950/20 border border-cyan-500/20 hover:border-cyan-400/50 cursor-pointer transition group"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-11 h-11 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-sm">Sandbox Demo Wallet</span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                    Per Giudici
                  </span>
                </div>
                <p className="text-xs text-slate-400">
                  Testa subito tutte le feature con 50 COOK simulati
                </p>
              </div>
            </div>
            <span className="text-xs font-semibold text-cyan-400">Avvia</span>
          </div>

        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 text-center text-xs text-slate-500">
          Cookie Chain RPC: <span className="text-slate-400 font-mono">https://rpc.cookiescan.io</span>
        </div>

      </div>
    </div>
  )
}
