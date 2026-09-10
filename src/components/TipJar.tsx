import React, { useState } from 'react'
import { QrCode, Check, HeartHandshake, Share2, Sparkles } from 'lucide-react'
import type { WalletState } from '../types'
import { executeCookTransfer } from '../services/cookieChain'

interface TipJarProps {
  wallet: WalletState
}

export const TipJar: React.FC<TipJarProps> = ({ wallet }) => {
  const [payeeName, setPayeeName] = useState('Cookie Creator & Dev')
  const [recipientAddress, setRecipientAddress] = useState(
    wallet.publicKey || 'Cook1ePayeeRece1verAddressDem07777777777777'
  )
  const [tipAmount, setTipAmount] = useState('2.0')
  const [memo, setMemo] = useState('Grazie per il contributo alla community Cookie!')
  const [copiedLink, setCopiedLink] = useState(false)
  const [paying, setPaying] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState<string | null>(null)

  const paymentLink = `https://robzombai.github.io/cookie-pulse/?recipient=${encodeURIComponent(
    recipientAddress
  )}&amount=${tipAmount}&memo=${encodeURIComponent(memo)}`

  const handleCopyLink = () => {
    navigator.clipboard.writeText(paymentLink)
    setCopiedLink(true)
    setTimeout(() => setCopiedLink(false), 2000)
  }

  const handlePayNow = async () => {
    if (!wallet.connected || !wallet.publicKey) {
      alert('Connetti prima il tuo wallet per inviare la mancia!')
      return
    }

    const numAmount = parseFloat(tipAmount)
    if (isNaN(numAmount) || numAmount <= 0) {
      alert('Importo non valido!')
      return
    }

    setPaying(true)
    setPaymentSuccess(null)

    try {
      const provider =
        wallet.walletType === 'nightly'
          ? (window as any).nightly?.solana
          : (window as any).solana

      const res = await executeCookTransfer(
        wallet.publicKey,
        recipientAddress,
        numAmount,
        provider
      )

      setPaymentSuccess(res.signature)
    } catch (e: any) {
      alert('Errore pagamento: ' + e.message)
    } finally {
      setPaying(false)
    }
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <HeartHandshake className="w-5 h-5 text-amber-400" />
              Cookie <span className="text-amber-400">TipJar & PayLink</span>
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Merchant & Creator Tool
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Genera link di pagamento e codici QR per ricevere mance e pagamenti istantanei su Cookie Chain
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Configuration Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Nome Destinatario / Negozio
            </label>
            <input
              type="text"
              value={payeeName}
              onChange={(e) => setPayeeName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Indirizzo Wallet Ricevente
            </label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-amber-300 font-mono focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Importo COOK Predefinito
            </label>
            <div className="flex gap-2">
              {['0.5', '1.0', '2.0', '5.0', '10.0'].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setTipAmount(amt)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                    tipAmount === amt
                      ? 'bg-amber-400 text-slate-950 font-bold'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {amt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Messaggio / Memo Ricevuta
            </label>
            <input
              type="text"
              value={memo}
              onChange={(e) => setMemo(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-400 transition"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 transition"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
              <span>{copiedLink ? 'Link Copiato!' : 'Copia PayLink'}</span>
            </button>

            <button
              type="button"
              onClick={handlePayNow}
              disabled={paying}
              className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold py-3 rounded-xl text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>{paying ? 'Invio in corso...' : 'Paga Subito ' + tipAmount + ' COOK'}</span>
            </button>
          </div>
        </div>

        {/* Live QR Code & Card Preview */}
        <div className="flex flex-col items-center justify-center p-6 rounded-3xl bg-slate-950/70 border border-slate-800 text-center space-y-4">
          <div className="p-4 bg-white rounded-2xl shadow-xl flex items-center justify-center">
            {/* Visual QR Code Generator */}
            <div className="w-40 h-40 bg-slate-950 rounded-xl p-3 flex flex-col items-center justify-center border-4 border-amber-400">
              <QrCode className="w-28 h-28 text-white" />
              <span className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-widest mt-1">
                COOKIE-SVM
              </span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-base">{payeeName}</h4>
            <p className="text-xs text-amber-400 font-mono mt-0.5">
              Richiesta: <strong>{tipAmount} COOK</strong>
            </p>
            <p className="text-[11px] text-slate-400 mt-1 max-w-xs">{memo}</p>
          </div>

          {paymentSuccess && (
            <div className="p-3 rounded-xl bg-emerald-950/50 border border-emerald-500/40 text-xs text-emerald-300 w-full animate-in fade-in">
              <span className="font-bold block text-emerald-200">Mancia inviata con successo!</span>
              <span className="font-mono text-[10px] break-all text-emerald-400">{paymentSuccess}</span>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
