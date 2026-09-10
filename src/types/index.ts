export interface NetworkStats {
  slot: number
  blockHeight: number
  epoch: number
  epochProgress: number
  health: 'ok' | 'degraded' | 'offline'
  latencyMs: number
  clusterVersion: string
  tpsEstimated: number
  slotsInEpoch?: number
  slotIndex?: number
}

export interface WalletState {
  connected: boolean
  publicKey: string | null
  balanceCook: number
  walletType: 'nightly' | 'solana' | 'demo' | 'none'
  connecting: boolean
}

export interface TransactionStatus {
  status: 'idle' | 'preparing' | 'signing' | 'confirming' | 'success' | 'error'
  signature?: string
  error?: string
  timestamp?: number
}

export interface TokenForgeConfig {
  name: string
  symbol: string
  decimals: number
  initialSupply: number
  description: string
  iconUrl: string
}

export interface RecentBlock {
  slot: number
  timestamp: number
  txCount: number
}
