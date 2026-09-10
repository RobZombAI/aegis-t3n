import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { NetworkStats } from './components/NetworkStats'
import { TransferCard } from './components/TransferCard'
import { TokenForge } from './components/TokenForge'
import { EcosystemRadar } from './components/EcosystemRadar'
import { ValidatorDashboard } from './components/ValidatorDashboard'
import { RpcPlayground } from './components/RpcPlayground'
import { NetworkOverview } from './components/NetworkOverview'
import { WalletModal } from './components/WalletModal'
import { getNetworkTelemetry, getCookBalance } from './services/cookieChain'
import type { WalletState, NetworkStats as NetworkStatsType } from './types'
import {
  Cookie,
  Send,
  Coins,
  Compass,
  Sparkles,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  Terminal,
  ShieldCheck,
  Code2,
} from 'lucide-react'

export default function App() {
  const [stats, setStats] = useState<NetworkStatsType | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'terminal' | 'validators' | 'tokenForge' | 'rpcConsole' | 'ecosystem'>('terminal')

  const [wallet, setWallet] = useState<WalletState>({
    connected: false,
    publicKey: null,
    balanceCook: 0,
    walletType: 'none',
    connecting: false,
  })

  // Poll live telemetry from Cookie Chain RPC
  useEffect(() => {
    let mounted = true

    const fetchStats = async () => {
      try {
        const data = await getNetworkTelemetry()
        if (mounted) {
          setStats(data)
          setLoadingStats(false)
        }
      } catch (e) {
        console.error('Failed to fetch network telemetry:', e)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 2500)
    return () => {
      mounted = false
      clearInterval(interval)
    }
  }, [])

  // Auto-refresh balance when wallet connected
  useEffect(() => {
    if (wallet.connected && wallet.publicKey && wallet.walletType !== 'demo') {
      getCookBalance(wallet.publicKey).then((balance) => {
        setWallet((prev) => ({ ...prev, balanceCook: balance }))
      })
    }
  }, [wallet.connected, wallet.publicKey, wallet.walletType])

  const handleConnectWallet = (type: 'nightly' | 'solana' | 'demo') => {
    setIsWalletModalOpen(false)

    if (type === 'demo') {
      setWallet({
        connected: true,
        publicKey: 'Cook1eDemonstrat1onWa11etAddressForJudges777',
        balanceCook: 45.285,
        walletType: 'demo',
        connecting: false,
      })
      return
    }

    if (type === 'nightly') {
      const nightly = (window as any).nightly?.solana
      if (nightly) {
        nightly
          .connect()
          .then((res: any) => {
            const pubKey = res?.publicKey?.toString() || nightly.publicKey?.toString()
            setWallet({
              connected: true,
              publicKey: pubKey,
              balanceCook: 0,
              walletType: 'nightly',
              connecting: false,
            })
          })
          .catch((err: any) => console.error('Nightly connection rejected:', err))
      }
      return
    }

    if (type === 'solana') {
      const solana = (window as any).solana
      if (solana) {
        solana
          .connect()
          .then((res: any) => {
            const pubKey = res?.publicKey?.toString() || solana.publicKey?.toString()
            setWallet({
              connected: true,
              publicKey: pubKey,
              balanceCook: 0,
              walletType: 'solana',
              connecting: false,
            })
          })
          .catch((err: any) => console.error('Solana wallet connection rejected:', err))
      }
      return
    }
  }

  const handleDisconnect = () => {
    setWallet({
      connected: false,
      publicKey: null,
      balanceCook: 0,
      walletType: 'none',
      connecting: false,
    })
  }

  const handleTransferSuccess = (amountSent: number) => {
    setWallet((prev) => ({
      ...prev,
      balanceCook: Math.max(0, prev.balanceCook - amountSent),
    }))
  }

  return (
    <div className="min-h-screen bg-[#070b13] text-slate-100 flex flex-col selection:bg-amber-400 selection:text-slate-950">
      
      {/* Background radial glow decorations */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-1/4 right-1/4 w-[30rem] h-[30rem] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      {/* Header */}
      <Navbar
        wallet={wallet}
        stats={stats}
        onConnectWallet={() => setIsWalletModalOpen(true)}
        onDisconnectWallet={handleDisconnect}
      />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8">
        
        {/* Hero Section */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-slate-900/90 via-slate-950/80 to-slate-950 border border-slate-800/80 p-6 sm:p-10 shadow-2xl">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Cookie Chain SVM • Sub-second Execution Engine (Agave v4.1.2)</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
              Il Terminale Definitivo per{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-500">
                Cookie Chain
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Piattaforma professionale completa: monitoraggio RPC in tempo reale, set validatori on-chain,
              trasferimenti istantanei su SVM, deployer di token e console per sviluppatori.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {!wallet.connected ? (
              <button
                onClick={() => setIsWalletModalOpen(true)}
                className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 rounded-xl text-sm shadow-lg shadow-amber-400/20 transition transform active:scale-95 flex items-center gap-2"
              >
                <Cookie className="w-4 h-4" />
                <span>Collega Nightly Wallet</span>
              </button>
            ) : (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Wallet Attivo: {wallet.publicKey?.slice(0, 6)}...{wallet.publicKey?.slice(-6)}</span>
              </div>
            )}

            <a
              href="https://hyperlane.cookiescan.io"
              target="_blank"
              rel="noreferrer"
              className="bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 px-5 py-3 rounded-xl text-sm font-semibold transition flex items-center gap-2"
            >
              <span>Bridge COOK</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </section>

        {/* Live Network Telemetry Strip */}
        <section>
          <div className="flex items-center justify-between mb-3 px-1">
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              Telemetria Chain in Tempo Reale
            </h2>
            <span className="text-xs text-slate-500 font-mono flex items-center gap-1">
              <RefreshCw className="w-3 h-3 animate-spin text-amber-400" /> Polling RPC attivo (https://rpc.cookiescan.io)
            </span>
          </div>
          <NetworkStats stats={stats} loading={loadingStats} />
        </section>

        {/* Navigation Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-1 overflow-x-auto">
          
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'terminal'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Send className="w-4 h-4" />
            <span>Transazioni & Wallet</span>
          </button>

          <button
            onClick={() => setActiveTab('validators')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'validators'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Validatori On-Chain</span>
          </button>
          
          <button
            onClick={() => setActiveTab('tokenForge')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'tokenForge'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Coins className="w-4 h-4" />
            <span>Cookie Token Forge</span>
          </button>

          <button
            onClick={() => setActiveTab('rpcConsole')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'rpcConsole'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>Console RPC Live</span>
          </button>

          <button
            onClick={() => setActiveTab('ecosystem')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition whitespace-nowrap ${
              activeTab === 'ecosystem'
                ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-900'
            }`}
          >
            <Compass className="w-4 h-4" />
            <span>Ecosistema & Tokenomics</span>
          </button>
        </div>

        {/* Tab 1: Terminal & Transfer */}
        {activeTab === 'terminal' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Wallet Overview Status */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                  Dettagli Wallet Connesso
                </span>
                
                {wallet.connected && wallet.publicKey ? (
                  <div className="mt-4 space-y-4">
                    <div>
                      <span className="text-xs text-slate-500">Indirizzo pubblico</span>
                      <p className="text-xs font-mono text-white bg-slate-900 p-2.5 rounded-xl border border-slate-800 break-all mt-1">
                        {wallet.publicKey}
                      </p>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                      <span className="text-xs font-semibold text-amber-300">Saldo Disponibile</span>
                      <div className="flex items-baseline space-x-2 mt-1">
                        <span className="text-3xl font-black text-amber-400 font-mono">
                          {wallet.balanceCook.toFixed(3)}
                        </span>
                        <span className="text-sm font-bold text-amber-300">COOK</span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Valuta nativa utilizzata per gas e trasferimenti su Cookie SVM
                      </p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                      <span>Provider Attivo:</span>
                      <span className="font-semibold text-white uppercase text-[11px] px-2 py-0.5 rounded bg-slate-800">
                        {wallet.walletType}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 text-center py-8">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
                      <Cookie className="w-7 h-7" />
                    </div>
                    <h4 className="text-base font-bold text-white">Nessun Wallet Connesso</h4>
                    <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                      Collega Nightly Wallet o usa il Demo Sandbox per testare le funzioni.
                    </p>
                    <button
                      onClick={() => setIsWalletModalOpen(true)}
                      className="mt-4 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 font-bold px-4 py-2 rounded-xl text-xs transition"
                    >
                      Seleziona Wallet
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" /> SVM Live Node
                </span>
                <span className="font-mono">Cluster: Agave 4.1.2</span>
              </div>
            </div>

            {/* Transfer Card */}
            <div className="lg:col-span-2">
              <TransferCard wallet={wallet} onTransferSuccess={handleTransferSuccess} />
            </div>

          </div>
        )}

        {/* Tab 2: Validators On-Chain */}
        {activeTab === 'validators' && <ValidatorDashboard />}

        {/* Tab 3: Token Forge */}
        {activeTab === 'tokenForge' && (
          <div className="max-w-3xl mx-auto">
            <TokenForge wallet={wallet} />
          </div>
        )}

        {/* Tab 4: Interactive RPC Console */}
        {activeTab === 'rpcConsole' && <RpcPlayground />}

        {/* Tab 5: Ecosystem & Tokenomics */}
        {activeTab === 'ecosystem' && (
          <div className="space-y-8">
            <NetworkOverview />
            <EcosystemRadar />
          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950/80 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <Cookie className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400 font-semibold">CookiePulse</span>
            <span>— Prodotto ufficiale per Cookie Chain SVM (Bounty Superteam Earn)</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href="https://docs.cookiechain.wtf"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition"
            >
              Docs
            </a>
            <a
              href="https://cookiescan.io"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition"
            >
              Explorer
            </a>
            <a
              href="https://github.com/RobZombAI/cookie-pulse"
              target="_blank"
              rel="noreferrer"
              className="hover:text-amber-400 transition"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>

      {/* Wallet Selection Modal */}
      <WalletModal
        isOpen={isWalletModalOpen}
        onClose={() => setIsWalletModalOpen(false)}
        onSelectWallet={handleConnectWallet}
      />

    </div>
  )
}
