import React, { useState } from 'react'
import { ArrowDownUp, Settings, Sparkles, CheckCircle2, Loader2, ExternalLink } from 'lucide-react'
import type { WalletState } from '../types'
import { COOKIE_EXPLORER_URL } from '../services/cookieChain'

interface DEXSwapProps {
  wallet: WalletState
}

interface TokenOption {
  symbol: string
  name: string
  icon: string
  rateAgainstCook: number // 1 COOK = X token
}

export const DEXSwap: React.FC<DEXSwapProps> = ({ wallet }) => {
  const tokens: TokenOption[] = [
    { symbol: 'COOK', name: 'Cookie Chain Native', icon: '🍪', rateAgainstCook: 1 },
    { symbol: 'USDC', name: 'USD Coin (Hyperlane)', icon: '💵', rateAgainstCook: 0.082 },
    { symbol: 'CHIP', name: 'ChocoChip Token', icon: '🍫', rateAgainstCook: 142.5 },
    { symbol: 'BAKE', name: 'Bakery Yield DAO', icon: '🥐', rateAgainstCook: 18.4 },
  ]

  const [fromToken, setFromToken] = useState<TokenOption>(tokens[0])
  const [toToken, setToToken] = useState<TokenOption>(tokens[1])
  const [fromAmount, setFromAmount] = useState('10')
  const [slippage, setSlippage] = useState('0.5')
  const [swapping, setSwapping] = useState(false)
  const [swapSuccess, setSwapSuccess] = useState<string | null>(null)

  // Calculate output amount
  const calculatedOutput = (() => {
    const val = parseFloat(fromAmount)
    if (isNaN(val) || val <= 0) return '0.00'
    const amountInCook = val / fromToken.rateAgainstCook
    const finalOut = amountInCook * toToken.rateAgainstCook
    return finalOut.toFixed(4)
  })()

  const handleFlipTokens = () => {
    const temp = fromToken
    setFromToken(toToken)
    setToToken(temp)
  }

  const handleSwap = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wallet.connected) {
      alert('Connetti prima il tuo wallet per fare lo swap!')
      return
    }

    setSwapping(true)
    setSwapSuccess(null)

    await new Promise((r) => setTimeout(r, 1100))

    const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
    const fakeSig =
      'Swap' + Array.from({ length: 44 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')

    setSwapSuccess(fakeSig)
    setSwapping(false)
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <ArrowDownUp className="w-5 h-5 text-amber-400" />
              Cookie<span className="text-amber-400">Swap DEX</span>
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              AMM Routing
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Scambia token istantaneamente sull'ecosistema Cookie Chain SVM con slippage garantito
          </p>
        </div>

        <div className="flex items-center space-x-1 bg-slate-900 border border-slate-800 p-1 rounded-xl text-xs">
          {['0.1', '0.5', '1.0'].map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlippage(s)}
              className={`px-2 py-0.5 rounded-lg font-mono transition ${
                slippage === s
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {s}%
            </button>
          ))}
          <Settings className="w-3.5 h-3.5 text-slate-500 ml-1" />
        </div>
      </div>

      <form onSubmit={handleSwap} className="space-y-3">
        
        {/* From Box */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Paghi</span>
            <span>
              Saldo: <strong className="text-amber-400">{wallet.balanceCook.toFixed(2)} {fromToken.symbol}</strong>
            </span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <input
              type="number"
              step="any"
              min="0.01"
              required
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent text-2xl font-mono font-bold text-white focus:outline-none placeholder-slate-600"
            />
            <select
              value={fromToken.symbol}
              onChange={(e) => {
                const found = tokens.find((t) => t.symbol === e.target.value)
                if (found) setFromToken(found)
              }}
              className="bg-slate-900 text-white font-bold text-sm px-3 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-amber-400 shrink-0"
            >
              {tokens.map((t) => (
                <option key={t.symbol} value={t.symbol}>
                  {t.icon} {t.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Flip Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            type="button"
            onClick={handleFlipTokens}
            className="p-2 rounded-xl bg-slate-900 border border-slate-700 text-amber-400 hover:text-white hover:border-amber-400 shadow-md transition transform active:scale-90"
            title="Inverti coppia"
          >
            <ArrowDownUp className="w-4 h-4" />
          </button>
        </div>

        {/* To Box */}
        <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Ricevi (Stima minima)</span>
            <span className="font-mono text-slate-500">Slippage {slippage}%</span>
          </div>
          <div className="flex items-center justify-between gap-3">
            <input
              type="text"
              readOnly
              value={calculatedOutput}
              className="w-full bg-transparent text-2xl font-mono font-bold text-emerald-400 focus:outline-none"
            />
            <select
              value={toToken.symbol}
              onChange={(e) => {
                const found = tokens.find((t) => t.symbol === e.target.value)
                if (found) setToToken(found)
              }}
              className="bg-slate-900 text-white font-bold text-sm px-3 py-2 rounded-xl border border-slate-700/80 focus:outline-none focus:border-amber-400 shrink-0"
            >
              {tokens.map((t) => (
                <option key={t.symbol} value={t.symbol}>
                  {t.icon} {t.symbol}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Route Details */}
        <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 text-xs text-slate-400 space-y-1.5 font-mono">
          <div className="flex justify-between">
            <span>Tasso di cambio:</span>
            <span className="text-slate-200 font-semibold">
              1 {fromToken.symbol} ≈ {(toToken.rateAgainstCook / fromToken.rateAgainstCook).toFixed(4)} {toToken.symbol}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Commissione di routing DEX:</span>
            <span className="text-emerald-400 font-semibold">0.15% (Liquidity Providers)</span>
          </div>
          <div className="flex justify-between">
            <span>Costo Gas su Cookie Chain:</span>
            <span className="text-amber-400 font-semibold">&lt; 0.00001 COOK (~$0.00005)</span>
          </div>
        </div>

        {/* Swap Button */}
        <button
          type="submit"
          disabled={swapping || !wallet.connected}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {swapping ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Esecuzione Swap su Cookie Chain...</span>
            </>
          ) : !wallet.connected ? (
            <span>Connetti Wallet per fare Swap</span>
          ) : (
            <>
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Esegui Swap Istantaneo</span>
            </>
          )}
        </button>

      </form>

      {/* Success Notification */}
      {swapSuccess && (
        <div className="mt-4 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="w-full">
              <span className="font-bold text-sm text-emerald-200">
                Swap Eseguito con Successo!
              </span>
              <p className="text-xs text-emerald-400 mt-1 font-mono break-all">
                Firma: {swapSuccess}
              </p>
              <div className="mt-2">
                <a
                  href={`${COOKIE_EXPLORER_URL}/tx/${swapSuccess}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-300 hover:text-white underline"
                >
                  Visualizza su CookieScan <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
