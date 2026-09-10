import React, { useState, useEffect } from 'react'
import { Trophy, Cookie as CookieIcon, Gift } from 'lucide-react'
import { playCookieCrunch, playCyberClick, playSuccessChime } from '../services/soundFx'

export const CookieGame: React.FC = () => {
  const [cookies, setCookies] = useState(100)
  const [cps, setCps] = useState(0)
  const [clickMultiplier, setClickMultiplier] = useState(1)
  const [isBouncing, setIsBouncing] = useState(false)
  const [openedFortune, setOpenedFortune] = useState<string | null>(null)

  const fortunes = [
    '🥠 "I tuoi blocchi saranno sempre confermati in meno di 1 secondo su Cookie Chain."',
    '🥠 "Una balena farà bridge di 500.000 COOK nel tuo prossimo slot preferito."',
    '🥠 "Chi accumula briciole oggi raccoglierà intere teglie di COOK domani."',
    '🥠 "La commissione da $0.00005 proteggerà il tuo portafoglio da ogni tempesta gas."',
    '🥠 "Il tuo token SPL raggiungerà la luna prima che Solana L1 finisca l\'epoca."',
  ]

  // Auto-generate cookies per second
  useEffect(() => {
    if (cps <= 0) return
    const interval = setInterval(() => {
      setCookies((prev) => prev + cps)
    }, 1000)
    return () => clearInterval(interval)
  }, [cps])

  const handleClickCookie = () => {
    setIsBouncing(true)
    playCookieCrunch()
    setCookies((prev) => prev + clickMultiplier)
    setTimeout(() => setIsBouncing(false), 150)
  }

  const handleBuyUpgrade = (cost: number, addCps: number, addClick: number = 0) => {
    if (cookies < cost) {
      alert('Non hai abbastanza biscotti per questo potenziamento!')
      return
    }
    playCyberClick()
    setCookies((prev) => prev - cost)
    setCps((prev) => prev + addCps)
    if (addClick > 0) setClickMultiplier((prev) => prev + addClick)
  }

  const handleCrackFortune = () => {
    if (cookies < 50) {
      alert('Servono almeno 50 biscotti per aprire un biscotto della fortuna!')
      return
    }
    playSuccessChime()
    setCookies((prev) => prev - 50)
    const random = fortunes[Math.floor(Math.random() * fortunes.length)]
    setOpenedFortune(random)
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <CookieIcon className="w-5 h-5 text-amber-400" />
              Cookie <span className="text-amber-400">Clicker & Degen Fortune</span>
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
              On-Chain Game
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Clicca per sfornare COOK, acquista forni automatici e rompi i biscotti della fortuna
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-800 text-xs">
          <Trophy className="w-4 h-4 text-amber-400" />
          <span className="text-slate-400">Velocità:</span>
          <span className="font-bold text-amber-300 font-mono">+{cps} COOK/sec</span>
        </div>
      </div>

      {/* Main Game Arena */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        
        {/* Clicker Area */}
        <div className="flex flex-col items-center justify-center p-8 rounded-3xl bg-slate-950/60 border border-slate-800/80 text-center">
          <div className="mb-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
              Biscotti Sfornati
            </span>
            <div className="text-4xl sm:text-5xl font-black text-amber-400 font-mono tracking-tight mt-1">
              {cookies.toLocaleString()}
            </div>
            <span className="text-xs text-slate-500 font-mono">+{clickMultiplier} per click</span>
          </div>

          <button
            onClick={handleClickCookie}
            className={`relative select-none transition-transform duration-100 cursor-pointer focus:outline-none ${
              isBouncing ? 'scale-90' : 'hover:scale-105 active:scale-95'
            }`}
          >
            <div className="w-44 h-44 sm:w-52 sm:h-52 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-300 flex items-center justify-center shadow-2xl shadow-amber-500/30 glow-cookie border-4 border-amber-300/40">
              <CookieIcon className="w-28 h-28 sm:w-36 sm:h-36 text-slate-950/90 drop-shadow-md" />
            </div>
          </button>
          <span className="text-xs text-slate-500 mt-4">Clicca sul biscotto gigante!</span>
        </div>

        {/* Upgrades & Fortune Cookie */}
        <div className="space-y-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Potenziamenti del Forno
          </span>

          {/* Upgrade 1 */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">👵</span>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">Nonna Fornaia</h4>
                <p className="text-[11px] text-slate-400">+1 COOK al secondo</p>
              </div>
            </div>
            <button
              onClick={() => handleBuyUpgrade(30, 1)}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold px-3 py-1.5 rounded-xl text-xs transition"
            >
              Compra (30)
            </button>
          </div>

          {/* Upgrade 2 */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🔥</span>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">Forno Industriale SVM</h4>
                <p className="text-[11px] text-slate-400">+5 COOK/sec & +1 click</p>
              </div>
            </div>
            <button
              onClick={() => handleBuyUpgrade(120, 5, 1)}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold px-3 py-1.5 rounded-xl text-xs transition"
            >
              Compra (120)
            </button>
          </div>

          {/* Upgrade 3 */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">⚡</span>
              <div>
                <h4 className="font-bold text-white text-xs sm:text-sm">Acceleratore Agave 4.1.2</h4>
                <p className="text-[11px] text-slate-400">+25 COOK al secondo</p>
              </div>
            </div>
            <button
              onClick={() => handleBuyUpgrade(400, 25)}
              className="bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold px-3 py-1.5 rounded-xl text-xs transition"
            >
              Compra (400)
            </button>
          </div>

          {/* Fortune Cookie Action */}
          <div className="pt-2">
            <button
              onClick={handleCrackFortune}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl text-xs shadow-lg shadow-purple-500/20 transition flex items-center justify-center gap-2"
            >
              <Gift className="w-4 h-4 text-amber-300" />
              <span>Spezza il Biscotto della Fortuna (Costo: 50)</span>
            </button>

            {openedFortune && (
              <div className="mt-3 p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 text-xs text-purple-200 animate-in fade-in duration-200">
                <span className="font-bold text-amber-300 block mb-1">Profezia Svelata:</span>
                <p className="italic font-serif leading-relaxed">{openedFortune}</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  )
}
