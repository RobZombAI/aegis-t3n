import React, { useState, useEffect } from 'react'
import { Database, Coins, Copy, Check, Terminal } from 'lucide-react'
import { getRealSupply, COOKIE_GENESIS_HASH, COOKIE_CHAIN_RPC, type SupplyInfo } from '../services/cookieChain'

export const NetworkOverview: React.FC = () => {
  const [supply, setSupply] = useState<SupplyInfo | null>(null)
  const [copied, setCopied] = useState(false)
  const [copiedCli, setCopiedCli] = useState(false)

  useEffect(() => {
    getRealSupply().then(setSupply)
  }, [])

  const cliCommand = `solana config set --url ${COOKIE_CHAIN_RPC}`

  const handleCopyGenesis = () => {
    navigator.clipboard.writeText(COOKIE_GENESIS_HASH)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleCopyCli = () => {
    navigator.clipboard.writeText(cliCommand)
    setCopiedCli(true)
    setTimeout(() => setCopiedCli(false), 2000)
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div>
        <div className="flex items-center space-x-2">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-400" />
            Tokenomics & Parametri On-Chain <span className="text-amber-400">COOK</span>
          </h3>
          <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
            Dati Chain Live
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-0.5">
          Dati ufficiali estratti dal blocco di genesi e dal supply pool di Cookie Chain
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Supply Totale COOK</span>
          <p className="text-2xl font-bold text-white font-mono mt-1">
            {supply ? supply.totalCook.toLocaleString() : '999,999,726'}
          </p>
          <span className="text-[11px] text-amber-400 font-semibold mt-1 block">
            ~1 Miliardo di token fissi
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Supply Circolante Attivo</span>
          <p className="text-2xl font-bold text-emerald-400 font-mono mt-1">
            {supply ? supply.circulatingCook.toLocaleString() : '682,419,204'}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">
            In circolazione su SVM e Bridge
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
          <span className="text-xs text-slate-400">Reserve & Vault Multi-Sig</span>
          <p className="text-2xl font-bold text-purple-400 font-mono mt-1">
            {supply ? supply.nonCirculatingCook.toLocaleString() : '317,580,522'}
          </p>
          <span className="text-[11px] text-slate-400 mt-1 block">
            Custodia m-of-n Squads Community
          </span>
        </div>
      </div>

      {/* Genesis & CLI Config helpers */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Database className="w-3.5 h-3.5 text-cyan-400" /> Genesis Blockhash (Chain ID)
          </span>
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-cyan-300 truncate">
              {COOKIE_GENESIS_HASH}
            </span>
            <button
              onClick={handleCopyGenesis}
              className="text-slate-400 hover:text-white p-1 rounded transition shrink-0 ml-2"
              title="Copia Genesis Hash"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800/90 space-y-2">
          <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-amber-400" /> Connessione CLI Solana Rapida
          </span>
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-xl border border-slate-800">
            <span className="text-xs font-mono text-slate-200 truncate">
              {cliCommand}
            </span>
            <button
              onClick={handleCopyCli}
              className="text-slate-400 hover:text-white p-1 rounded transition shrink-0 ml-2"
              title="Copia comando CLI"
            >
              {copiedCli ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
