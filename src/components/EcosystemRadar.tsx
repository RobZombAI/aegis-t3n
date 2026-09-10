import React from 'react'
import { ArrowUpRight, Repeat, Compass, Box, BookOpen, ShieldCheck } from 'lucide-react'
import {
  HYPERLANE_BRIDGE_URL,
  COOKIESWAP_URL,
  COOKIEBOX_URL,
  COOKIE_EXPLORER_URL,
} from '../services/cookieChain'

export const EcosystemRadar: React.FC = () => {
  const apps = [
    {
      title: 'Hyperlane Bridge',
      desc: 'Sposta COOK tra Solana e Cookie Chain istantaneamente con route warp e multi-sig.',
      url: HYPERLANE_BRIDGE_URL,
      icon: <Repeat className="w-5 h-5 text-amber-400" />,
      badge: 'Bridge Ufficiale',
      badgeColor: 'bg-amber-500/10 text-amber-300 border-amber-500/30',
    },
    {
      title: 'Cookieswap',
      desc: 'Decentralized Exchange (DEX) per trading e liquidità su Cookie Chain SVM.',
      url: COOKIESWAP_URL,
      icon: <Box className="w-5 h-5 text-cyan-400" />,
      badge: 'DEX & Swaps',
      badgeColor: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    },
    {
      title: 'CookieScan Explorer',
      desc: 'Esplora blocchi, programmi distribuiti, validatori e transazioni in tempo reale.',
      url: COOKIE_EXPLORER_URL,
      icon: <Compass className="w-5 h-5 text-emerald-400" />,
      badge: 'Explorer',
      badgeColor: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    },
    {
      title: 'Cookiebox',
      desc: 'Suite di strumenti e launcher di app per la community di sviluppatori Cookie.',
      url: COOKIEBOX_URL,
      icon: <ShieldCheck className="w-5 h-5 text-purple-400" />,
      badge: 'Community Hub',
      badgeColor: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    },
    {
      title: 'Documentazione Ufficiale',
      desc: 'Guida per programmatori per integrare la chain, SDK SVM e CLI Solana.',
      url: 'https://docs.cookiechain.wtf/',
      icon: <BookOpen className="w-5 h-5 text-blue-400" />,
      badge: 'Docs',
      badgeColor: 'bg-blue-500/10 text-blue-300 border-blue-500/30',
    },
  ]

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            Radar Ecosistema <span className="text-amber-400">Cookie Chain</span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Accesso rapido a tutti i protocolli, bridge e strumenti verificati del network
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apps.map((app) => (
          <a
            key={app.title}
            href={app.url}
            target="_blank"
            rel="noreferrer"
            className="group flex flex-col justify-between p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 transition shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                  {app.icon}
                </div>
                <span
                  className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md border ${app.badgeColor}`}
                >
                  {app.badge}
                </span>
              </div>
              <h4 className="font-bold text-white text-base group-hover:text-amber-400 transition flex items-center gap-1.5">
                {app.title}
                <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-amber-400" />
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{app.desc}</p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
              <span className="font-mono text-[11px] truncate max-w-[200px]">
                {app.url.replace('https://', '')}
              </span>
              <span className="text-slate-400 group-hover:text-amber-400 transition">Apri</span>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
