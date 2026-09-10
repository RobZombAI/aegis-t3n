import React, { useState } from 'react'
import { Coins, Sparkles, Check, Copy, Terminal, Layers, Send, FileSpreadsheet } from 'lucide-react'
import type { TokenForgeConfig, WalletState } from '../types'

interface TokenForgeProps {
  wallet?: WalletState
}

export const TokenForge: React.FC<TokenForgeProps> = () => {
  const [activeSubTab, setActiveSubTab] = useState<'deploy' | 'airdrop'>('deploy')

  // Deploy state
  const [config, setConfig] = useState<TokenForgeConfig>({
    name: 'ChocoChip Token',
    symbol: 'CHIP',
    decimals: 9,
    initialSupply: 1000000,
    description: 'The sweetest utility token on Cookie Chain SVM.',
    iconUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=128&q=80',
  })

  const [deployed, setDeployed] = useState(false)
  const [mintAddress, setMintAddress] = useState('')
  const [copied, setCopied] = useState(false)
  const [deploying, setDeploying] = useState(false)

  // Airdrop state
  const [airdropRecipients, setAirdropRecipients] = useState(
    'Cook1eCommunityMember1Address111111111111111, 50\nCook1eCommunityMember2Address222222222222222, 100\nCook1eCommunityMember3Address333333333333333, 25'
  )
  const [airdropping, setAirdropping] = useState(false)
  const [airdropDone, setAirdropDone] = useState(false)

  const handleDeploy = async (e: React.FormEvent) => {
    e.preventDefault()
    setDeploying(true)

    await new Promise((r) => setTimeout(r, 1200))

    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    const mockMint =
      'Cook' + Array.from({ length: 40 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')

    setMintAddress(mockMint)
    setDeployed(true)
    setDeploying(false)
  }

  const handleAirdrop = async (e: React.FormEvent) => {
    e.preventDefault()
    setAirdropping(true)
    await new Promise((r) => setTimeout(r, 1400))
    setAirdropDone(true)
    setAirdropping(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(mintAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Coins className="w-5 h-5 text-amber-400" />
              Cookie <span className="text-amber-400">Bakery & Token Forge</span>
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 border border-purple-500/30">
              cApp Suite
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Crea nuovi token SPL e gestisci airdrop massivi su Cookie Chain SVM per &lt;$0.05
          </p>
        </div>

        {/* Subtab Toggle */}
        <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          <button
            type="button"
            onClick={() => setActiveSubTab('deploy')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeSubTab === 'deploy'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Deploy Token
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('airdrop')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeSubTab === 'airdrop'
                ? 'bg-purple-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Bulk Airdrop
          </button>
        </div>
      </div>

      {activeSubTab === 'deploy' && (
        <form onSubmit={handleDeploy} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Nome Token
              </label>
              <input
                type="text"
                required
                value={config.name}
                onChange={(e) => setConfig({ ...config, name: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white font-medium focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Simbolo
              </label>
              <input
                type="text"
                required
                maxLength={8}
                value={config.symbol}
                onChange={(e) => setConfig({ ...config, symbol: e.target.value.toUpperCase() })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white font-mono uppercase focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Supply Iniziale
              </label>
              <input
                type="number"
                min="1"
                required
                value={config.initialSupply}
                onChange={(e) => setConfig({ ...config, initialSupply: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400 transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                Decimali (Standard SVM)
              </label>
              <input
                type="number"
                min="0"
                max="9"
                required
                value={config.decimals}
                onChange={(e) => setConfig({ ...config, decimals: parseInt(e.target.value) || 0 })}
                className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-amber-400 transition"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-purple-950/30 border border-purple-800/30 flex items-center justify-between text-xs">
            <span className="text-purple-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4" /> Costo deploy stimato su Cookie Chain:
            </span>
            <span className="font-mono font-bold text-amber-300">
              ~0.002 COOK (~$0.05) vs $2.50+ su Solana Mainnet
            </span>
          </div>

          <button
            type="submit"
            disabled={deploying}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-purple-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {deploying ? (
              <span>Compilazione e deploy su Cookie Chain...</span>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Genera & Inizializza SPL Token</span>
              </>
            )}
          </button>
        </form>
      )}

      {/* Airdrop Tool Subtab */}
      {activeSubTab === 'airdrop' && (
        <form onSubmit={handleAirdrop} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Destinatari & Quantità (Indirizzo, Importo)
              </label>
              <span className="text-[11px] text-slate-500 flex items-center gap-1">
                <FileSpreadsheet className="w-3.5 h-3.5" /> CSV Formatted
              </span>
            </div>
            <textarea
              rows={4}
              value={airdropRecipients}
              onChange={(e) => setAirdropRecipients(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl p-3 text-xs text-white font-mono focus:outline-none focus:border-amber-400 leading-relaxed"
            />
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex justify-between text-xs text-slate-400 font-mono">
            <span>Transazioni batch stimate:</span>
            <span className="text-emerald-400 font-bold">1 Singolo Blocco SVM (&lt;1s)</span>
          </div>

          <button
            type="submit"
            disabled={airdropping}
            className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm shadow-lg shadow-purple-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {airdropping ? (
              <span>Distribuzione batch airdrop in corso...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Esegui Bulk Airdrop</span>
              </>
            )}
          </button>

          {airdropDone && (
            <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs animate-in fade-in">
              <span className="font-bold block text-emerald-200">Airdrop Eseguito con Successo!</span>
              <p className="mt-1">Tutti i token sono stati recapitati agli indirizzi indicati con costo totale &lt;0.0001 COOK.</p>
            </div>
          )}
        </form>
      )}

      {/* Deployment result card */}
      {deployed && activeSubTab === 'deploy' && (
        <div className="p-4 rounded-2xl bg-slate-900/90 border border-purple-500/40 text-slate-200 animate-in fade-in duration-300">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-purple-300 flex items-center gap-1.5">
              <Terminal className="w-4 h-4" /> Token Mint Creato con Successo
            </span>
            <span className="text-[11px] font-mono bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded">
              Stato: Attivo
            </span>
          </div>
          <div className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-amber-400 break-all">{mintAddress}</span>
            <button
              onClick={handleCopy}
              className="ml-2 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition shrink-0"
              title="Copia indirizzo"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
