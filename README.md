# 🍪 CookiePulse — The Ultimate Cookie Chain SVM Terminal & dApp Suite

[![Cookie Chain](https://img.shields.io/badge/Network-Cookie%20Chain%20SVM-amber.svg)](https://docs.cookiechain.wtf/)
[![RPC Status](https://img.shields.io/badge/RPC-Active%20(Sub--second)-emerald.svg)](https://rpc.cookiescan.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**CookiePulse** is a high-performance, modern Web3 terminal and dApp suite built specifically for **Cookie Chain** — an independent, memetic, high-speed SVM (Solana Virtual Machine) network offering sub-second finality and minimal transaction fees.

Built for the official **[Create an App on Cookie Chain (1,000 USDC)](https://superteam.fun/listings/bounties/create-an-app-on-cookie-chain-app)** bounty on Superteam Earn.

---

## 🌟 Key Features

### 1. ⚡ Live Network Telemetry & RPC Monitor
* Direct connection to `https://rpc.cookiescan.io`.
* Real-time slot progress (`getSlot`), epoch progress, block finality tracker (~0.8s), cluster health, and ping latency meter.
* Direct links to block details on [CookieScan Explorer](https://cookiescan.io/).

### 2. 🌙 Multi-Wallet Hub (Nightly & Standard SVM)
* First-class integration with **[Nightly Wallet](https://nightly.app/)** (official Cookie Chain recommended wallet).
* Native support for standard Solana wallets (Phantom, Solflare, Backpack).
* Built-in **Sandbox Demo Wallet** for judges and reviewers to test the entire flow instantly without needing pre-funded wallets.
* Live native **COOK** balance tracker.

### 3. 💸 Sub-Second On-Chain COOK Transfer
* Instant token transfer with real-time feedback states: `Preparing` ➔ `Signing` ➔ `Confirming on SVM` ➔ `Finalized`.
* Estimated network fee display (`~0.000005 COOK`, <$0.0001).
* Generates verifiable transaction signatures linking directly to the block explorer.

### 4. 🪙 Cookie Token Forge (cApp Deployer Tool)
* Interactive generator and previewer for launching SPL tokens on Cookie Chain.
* Allows configuring Token Name, Symbol, Decimals, Initial Supply, and Metaplex metadata.
* Demonstrates the massive cost advantage of deploying on Cookie Chain (~$0.05 vs $2.50+ on Solana Mainnet).

### 5. 🧭 Ecosystem Radar & Bridge Gateway
* Direct access and guides to core Cookie Chain infrastructure:
  * **[Hyperlane Bridge](https://hyperlane.cookiescan.io/)**: Instant COOK bridging between Solana and Cookie Chain via warp routes.
  * **[Cookieswap](https://cookieswap.fun/)**: Decentralized Exchange (DEX) & AMM.
  * **[CookieScan](https://cookiescan.io/)**: Block explorer and contract verification.
  * **[Cookiebox](https://cookiebox.app/)**: Community tools and app launcher.

---

## 🛠️ Tech Stack

* **Framework:** React 18 + TypeScript + Vite
* **Styling:** Tailwind CSS v4 + Lucide Icons + Glassmorphism Dark Theme
* **Web3 Engine:** `@solana/web3.js` + Custom Cookie Chain RPC Connector
* **RPC Endpoint:** `https://rpc.cookiescan.io`
* **Target Network:** Cookie Chain SVM (Chain ID: `cookie-mainnet`)
* **Native Asset:** `$COOK`

---

## 🚀 Quick Start & Local Setup

### Prerequisites
* Node.js v18+ or v20+
* npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/RobZombAI/cookie-pulse.git
cd cookie-pulse

# Install dependencies
npm install

# Start local development server
npm run dev
```

The application will be available at `http://localhost:5173`.

### Production Build

```bash
npm run build
```

The optimized static assets will be compiled into the `dist/` directory.

---

## 🌉 Bridging to Cookie Chain

To fund your wallet with native **COOK**:
1. Visit the official **[Hyperlane Cookie Bridge](https://hyperlane.cookiescan.io/)**.
2. Connect your Solana wallet holding COOK.
3. Bridge COOK over to your Cookie Chain address.
4. Enjoy dirt-cheap transaction fees and sub-second execution!

---

## 📄 License

MIT © [RobZombAI](https://github.com/RobZombAI)
