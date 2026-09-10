import React, { useState } from 'react'
import { Send, ArrowRight, CheckCircle2, AlertCircle, Loader2, ExternalLink, Sparkles } from 'lucide-react'
import type { WalletState, TransactionStatus } from '../types'
import { executeCookTransfer, COOKIE_EXPLORER_URL } from '../services/cookieChain'

interface TransferCardProps {
  wallet: WalletState
  onTransferSuccess: (amount: number) => void
}

export const TransferCard: React.FC<TransferCardProps> = ({
  wallet,
  onTransferSuccess,
}) => {
  const [recipient, setRecipient] = useState('')
  const [amount, setAmount] = useState('')
  const [txState, setTxState] = useState<TransactionStatus>({ status: 'idle' })

  // Fill sample address for quick test
  const handleFillSample = () => {
    setRecipient('Cook1eEcoSystemDem0Va1idat0rAddress111111111')
    setAmount('1.5')
  }

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!wallet.connected || !wallet.publicKey) {
      alert('Connetti prima il tuo wallet!')
      return
    }

    const numAmount = parseFloat(amount)
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Inserisci un importo COOK valido!')
      return
    }

    if (numAmount > wallet.balanceCook) {
      alert('Saldo COOK insufficiente per questa transazione!')
      return
    }

    try {
      setTxState({ status: 'signing' })

      // Get wallet provider if available
      const provider =
        wallet.walletType === 'nightly'
          ? (window as any).nightly?.solana
          : wallet.walletType === 'solana'
          ? (window as any).solana
          : null

      setTxState({ status: 'confirming' })

      const result = await executeCookTransfer(
        wallet.publicKey,
        recipient,
        numAmount,
        provider
      )

      setTxState({
        status: 'success',
        signature: result.signature,
        timestamp: Date.now(),
      })

      onTransferSuccess(numAmount)
    } catch (err: any) {
      console.error(err)
      setTxState({
        status: 'error',
        error: err?.message || 'Transazione non riuscita. Riprova.',
      })
    }
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Send className="w-5 h-5 text-amber-400" />
            Trasferimento <span className="text-amber-400">COOK</span> Istantaneo
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Esecuzione transazione nativa su Cookie Chain SVM con finalità ~0.8s
          </p>
        </div>
        <button
          type="button"
          onClick={handleFillSample}
          className="text-xs text-cyan-400 hover:text-cyan-300 bg-cyan-950/40 border border-cyan-800/40 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition"
        >
          <Sparkles className="w-3.5 h-3.5" /> Demo Address
        </button>
      </div>

      <form onSubmit={handleSend} className="space-y-4">
        
        {/* Recipient Input */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Indirizzo Destinatario (SVM)
          </label>
          <input
            type="text"
            required
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            placeholder="Es: Cook1e9... oppure indirizzo Base58"
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        {/* Amount Input */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Importo COOK
            </label>
            <span className="text-xs text-slate-400 font-mono">
              Saldo: <strong className="text-amber-400">{wallet.balanceCook.toFixed(3)} COOK</strong>
            </span>
          </div>
          <div className="relative">
            <input
              type="number"
              step="any"
              min="0.0001"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-slate-900/90 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 font-mono focus:outline-none focus:border-amber-400 transition pr-20"
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setAmount(Math.max(0, wallet.balanceCook - 0.001).toFixed(3))}
                className="text-[11px] font-bold text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800"
              >
                MAX
              </button>
              <span className="text-xs font-bold text-amber-400">COOK</span>
            </div>
          </div>
        </div>

        {/* Fee breakdown info */}
        <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
          <span>Commissione di rete stimata:</span>
          <span className="font-mono text-slate-200">~0.000005 COOK (&lt;$0.0001)</span>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!wallet.connected || txState.status === 'signing' || txState.status === 'confirming'}
          className="w-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm shadow-lg shadow-amber-500/20 transition flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {txState.status === 'signing' || txState.status === 'confirming' ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Conferma su Cookie Chain SVM...</span>
            </>
          ) : (
            <>
              <span>Invia Transazione</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>

      </form>

      {/* Real-time Status Feedback Alert */}
      {txState.status === 'success' && txState.signature && (
        <div className="mt-5 p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 animate-in fade-in duration-300">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="w-full">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm text-emerald-200">
                  Transazione Confermata su Cookie Chain!
                </span>
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                  Finalizzata (&lt;1s)
                </span>
              </div>
              <p className="text-xs text-emerald-400/90 mt-1 font-mono break-all">
                Firma: {txState.signature}
              </p>
              <div className="mt-2.5">
                <a
                  href={`${COOKIE_EXPLORER_URL}/tx/${txState.signature}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-300 hover:text-white underline underline-offset-2"
                >
                  Visualizza su CookieScan Explorer <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {txState.status === 'error' && (
        <div className="mt-5 p-4 rounded-2xl bg-red-950/40 border border-red-500/40 text-red-300 animate-in fade-in duration-300 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-sm text-red-200">Errore Transazione</span>
            <p className="text-xs text-red-400 mt-1">{txState.error}</p>
          </div>
        </div>
      )}

    </div>
  )
}
