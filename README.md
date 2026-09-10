# 🍪 CookieVerse OS — The Sovereign Cookie Chain (SVM) Super-App & Terminal

[![Cookie Chain](https://img.shields.io/badge/Network-Cookie%20Chain%20SVM-amber.svg)](https://docs.cookiechain.wtf/)
[![Consensus](https://img.shields.io/badge/Consensus-Agave%20v4.1.2-purple.svg)](https://cookiescan.io/)
[![RPC Status](https://img.shields.io/badge/RPC-Active%20(Sub--second)-emerald.svg)](https://rpc.cookiescan.io/)
[![Live App](https://img.shields.io/badge/Live%20App-https%3A%2F%2Frobzombai.github.io%2Fcookie--pulse%2F-cyan.svg)](https://robzombai.github.io/cookie-pulse/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

**CookieVerse OS** is the ultimate all-in-one Web3 ecosystem terminal, DeFi hub, creator platform, and on-chain gaming suite built exclusively for **Cookie Chain** — the independent, memetic, sub-second SVM (Solana Virtual Machine) network.

Developed for the official **[Create an App on Cookie Chain (1,000 USDC)](https://superteam.fun/listings/bounties/create-an-app-on-cookie-chain-app)** challenge on Superteam Earn.

---

## 🌟 The Unbeatable Feature Matrix

While other competitors build fragmented, single-feature prototypes, **CookieVerse OS** integrates the entire spectrum of Web3 utilities into a unified, high-performance operating system:

| Feature Area | Module in CookieVerse OS | What It Does |
| :--- | :--- | :--- |
| **DeFi & Trading** | **Cookieswap DEX Terminal** | AMM swap interface with live price calculation, slippage controls (0.1%, 0.5%, 1.0%), and instant route execution between COOK, USDC, $CHIP, and $BAKE. |
| **Gaming & Culture** | **Cookie Clicker & Degen Fortune** | Interactive on-chain idle clicker with upgradeable ovens (Grandma, Industrial SVM Oven, Agave Particle Accelerator) + Fortune Cookie cracker with Web3 prophecies. |
| **Merchant & Payments** | **Cookie PayJar & TipLink** | Instant payment link and visual QR code generator for creators, streamers, and merchants on Cookie Chain with custom memo receipts. |
| **Token Creation** | **Bakery & Bulk Airdrop** | Low-cost (<$0.05) SPL Token deployer with metadata configurator + CSV mass airdrop dispatcher in a single SVM block. |
| **Consensus & Security** | **Live On-Chain Validators** | 100% real-time queries to `getVoteAccounts`: tracks active Agave v4.1.2 consensus nodes, >1.5B COOK active stake, commission rates, and voting slots. |
| **Developer Playground** | **Interactive JSON-RPC Console** | In-app developer console allowing raw execution of JSON-RPC calls (`getSlot`, `getSupply`, `getClusterNodes`, `getHealth`) directly to `https://rpc.cookiescan.io`. |
| **Tokenomics & Bridge** | **Network Overview & Radar** | Live circulating vs multi-sig vault supply metrics (`getSupply`), Genesis Hash verification (`9wDaBR...`), and direct integration with Hyperlane Bridge. |

---

## 🚀 Live Demo & Repository

* **Live Application:** [https://robzombai.github.io/cookie-pulse/](https://robzombai.github.io/cookie-pulse/)
* **Open-Source Repository:** [https://github.com/RobZombAI/cookie-pulse](https://github.com/RobZombAI/cookie-pulse)

---

## 🛠️ Tech Stack & Architecture

* **Framework:** React 18 + TypeScript + Vite
* **Styling:** Tailwind CSS v4 + Lucide Icons + Glassmorphism Dark Theme
* **Web3 Engine:** `@solana/web3.js` + Custom Cookie Chain RPC Connector
* **RPC Endpoint:** `https://rpc.cookiescan.io`
* **Consensus Engine:** Agave v4.1.2 (Solana Virtual Machine)
* **Genesis Blockhash:** `9wDaBRDgArEUpvhHxGguNkwozsZh4UpGZB9o2EoEcBB2`
* **Native Asset:** `$COOK` (Total Supply: `999,999,726`)

---

## ⚡ Local Setup

```bash
# Clone the repository
git clone https://github.com/RobZombAI/cookie-pulse.git
cd cookie-pulse

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

---

## 📄 License

MIT © [RobZombAI](https://github.com/RobZombAI)
