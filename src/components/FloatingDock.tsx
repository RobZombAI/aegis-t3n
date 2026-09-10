import React, { useState, useEffect } from 'react'
import {
  Send,
  ArrowDownUp,
  Gamepad2,
  HeartHandshake,
  Coins,
  ShieldCheck,
  Code2,
  Volume2,
  VolumeX,
  ArrowUp,
} from 'lucide-react'
import { playCyberClick } from '../services/soundFx'

interface FloatingDockProps {
  activeTab: string
  onSelectTab: (tab: any) => void
  soundEnabled: boolean
  onToggleSound: () => void
}

export const FloatingDock: React.FC<FloatingDockProps> = ({
  activeTab,
  onSelectTab,
  soundEnabled,
  onToggleSound,
}) => {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleTabClick = (tabKey: string) => {
    if (soundEnabled) playCyberClick()
    onSelectTab(tabKey)
    window.scrollTo({ top: 380, behavior: 'smooth' })
  }

  const scrollToTop = () => {
    if (soundEnabled) playCyberClick()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const items = [
    { key: 'terminal', label: 'Terminale', icon: <Send className="w-4 h-4" /> },
    { key: 'swap', label: 'DEX Swap', icon: <ArrowDownUp className="w-4 h-4" /> },
    { key: 'game', label: 'Game', icon: <Gamepad2 className="w-4 h-4" /> },
    { key: 'tipjar', label: 'TipJar', icon: <HeartHandshake className="w-4 h-4" /> },
    { key: 'tokenForge', label: 'Bakery', icon: <Coins className="w-4 h-4" /> },
    { key: 'validators', label: 'Validatori', icon: <ShieldCheck className="w-4 h-4" /> },
    { key: 'rpcConsole', label: 'Console', icon: <Code2 className="w-4 h-4" /> },
  ]

  return (
    <div className="fixed bottom-6 inset-x-0 z-40 flex items-center justify-center pointer-events-none px-4">
      <div className="pointer-events-auto flex items-center gap-1.5 p-2 rounded-2xl bg-slate-950/90 border border-slate-800/90 shadow-2xl backdrop-blur-2xl transition transform hover:scale-[1.02]">
        
        {/* Navigation Quick Pills */}
        <div className="flex items-center gap-1">
          {items.map((it) => (
            <button
              key={it.key}
              onClick={() => handleTabClick(it.key)}
              title={it.label}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition ${
                activeTab === it.key
                  ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/25'
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              {it.icon}
              <span className="hidden md:inline">{it.label}</span>
            </button>
          ))}
        </div>

        <div className="h-5 w-px bg-slate-800 mx-1"></div>

        {/* Audio Toggle */}
        <button
          onClick={onToggleSound}
          title={soundEnabled ? 'Disattiva Audio Cyber' : 'Attiva Audio Cyber'}
          className={`p-2 rounded-xl text-xs transition ${
            soundEnabled
              ? 'text-amber-400 bg-amber-500/10 hover:bg-amber-500/20'
              : 'text-slate-500 hover:text-slate-300'
          }`}
        >
          {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
        </button>

        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            title="Torna in cima"
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition animate-in fade-in"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

      </div>
    </div>
  )
}
