import React, { useState } from 'react'
import { Terminal, Play, CheckCircle2, AlertCircle, Copy, Check, Clock } from 'lucide-react'
import { executeRawRpc, COOKIE_CHAIN_RPC } from '../services/cookieChain'

interface PresetMethod {
  name: string
  desc: string
  method: string
  params: any[]
}

export const RpcPlayground: React.FC = () => {
  const presets: PresetMethod[] = [
    { name: 'getSlot', desc: 'Ottiene lo slot corrente confermato', method: 'getSlot', params: [] },
    { name: 'getVoteAccounts', desc: 'Validatori e stake attivi', method: 'getVoteAccounts', params: [] },
    { name: 'getSupply', desc: 'Supply totale e circolante di COOK', method: 'getSupply', params: [] },
    { name: 'getClusterNodes', desc: 'Nodi del cluster e gossip IP', method: 'getClusterNodes', params: [] },
    { name: 'getHealth', desc: 'Stato di salute del nodo RPC', method: 'getHealth', params: [] },
    { name: 'getLatestBlockhash', desc: 'Ultimo blockhash e validità', method: 'getLatestBlockhash', params: [] },
    { name: 'getGenesisHash', desc: 'Hash del blocco di genesi', method: 'getGenesisHash', params: [] },
    { name: 'getEpochSchedule', desc: 'Configurazione epoche SVM', method: 'getEpochSchedule', params: [] },
  ]

  const [selectedMethod, setSelectedMethod] = useState('getSlot')
  const [paramsInput, setParamsInput] = useState('[]')
  const [responseJson, setResponseJson] = useState<string | null>(null)
  const [executionTime, setExecutionTime] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleSelectPreset = (p: PresetMethod) => {
    setSelectedMethod(p.method)
    setParamsInput(JSON.stringify(p.params, null, 2))
  }

  const handleExecute = async () => {
    setLoading(true)
    setError(null)
    setResponseJson(null)
    const start = performance.now()

    try {
      let parsedParams = []
      try {
        parsedParams = JSON.parse(paramsInput)
      } catch {
        throw new Error('I parametri devono essere un array JSON valido (es. [])')
      }

      const res = await executeRawRpc(selectedMethod, parsedParams)
      setExecutionTime(Math.round(performance.now() - start))
      setResponseJson(JSON.stringify(res, null, 2))
    } catch (err: any) {
      setError(err?.message || 'Chiamata RPC fallita')
      setExecutionTime(Math.round(performance.now() - start))
    } finally {
      setLoading(false)
    }
  }

  const handleCopy = () => {
    if (!responseJson) return
    navigator.clipboard.writeText(responseJson)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Terminal className="w-5 h-5 text-amber-400" />
              Console <span className="text-amber-400">JSON-RPC</span> Interattiva
            </h3>
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
              Developer Tool
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Esegui chiamate RPC dirette all'endpoint ufficiale <code className="text-slate-300">{COOKIE_CHAIN_RPC}</code>
          </p>
        </div>
      </div>

      {/* Preset Buttons */}
      <div>
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-2">
          Seleziona un metodo rapido:
        </span>
        <div className="flex flex-wrap gap-2">
          {presets.map((p) => (
            <button
              key={p.name}
              onClick={() => handleSelectPreset(p)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition ${
                selectedMethod === p.method
                  ? 'bg-amber-400 text-slate-950 font-bold shadow-md shadow-amber-400/20'
                  : 'bg-slate-900 border border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Method & Params Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Metodo RPC
          </label>
          <input
            type="text"
            value={selectedMethod}
            onChange={(e) => setSelectedMethod(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-amber-300 font-mono focus:outline-none focus:border-amber-400 transition"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
            Parametri (JSON Array)
          </label>
          <input
            type="text"
            value={paramsInput}
            onChange={(e) => setParamsInput(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-300 font-mono focus:outline-none focus:border-amber-400 transition"
          />
        </div>
      </div>

      {/* Execute Button */}
      <button
        onClick={handleExecute}
        disabled={loading}
        className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold px-6 py-3 rounded-xl text-sm shadow-lg shadow-amber-500/25 transition flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Play className="w-4 h-4 fill-slate-950" />
        <span>{loading ? 'Interrogazione RPC...' : 'Esegui Chiamata RPC Live'}</span>
      </button>

      {/* Response Box */}
      {(responseJson || error) && (
        <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 space-y-2 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800/80 text-xs">
            <div className="flex items-center space-x-2">
              {error ? (
                <span className="text-red-400 flex items-center gap-1 font-semibold">
                  <AlertCircle className="w-3.5 h-3.5" /> Errore
                </span>
              ) : (
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Risposta Ricevuta (200 OK)
                </span>
              )}
              {executionTime !== null && (
                <span className="text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {executionTime}ms
                </span>
              )}
            </div>

            {responseJson && (
              <button
                onClick={handleCopy}
                className="text-slate-400 hover:text-white flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 transition"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copiato' : 'Copia JSON'}</span>
              </button>
            )}
          </div>

          <pre className="text-xs font-mono text-emerald-300 max-h-80 overflow-y-auto overflow-x-auto p-2 leading-relaxed">
            {error ? <span className="text-red-400">{error}</span> : responseJson}
          </pre>
        </div>
      )}
    </div>
  )
}
