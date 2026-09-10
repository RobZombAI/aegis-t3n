# Terminal 3 (T3N) ADK Developer Experience & Bug Report
**Audit of `@terminal3/t3n-sdk@5.2.0` and Refreshed Documentation**
*Submitted by Aegis-T3N Engineering Team for the T3N Superteam Earn Challenge*

---

## Executive Summary

During the end-to-end integration and testing of **Aegis-T3N** on the Terminal 3 Network testnet (`cn-api.sg.testnet.t3n.terminal3.io`), we conducted a rigorous audit of the newly refreshed Agent Developer Kit (ADK) documentation and `@terminal3/t3n-sdk@5.2.0`.

Overall, the architectural design of T3N's confidential compute enclave, cryptographic handshake, and DID authentication is remarkably clean, sub-second fast, and resilient. However, we identified several developer experience (DX) friction points, bundling edge-cases, and documentation gaps that, if addressed, will significantly accelerate developer adoption.

---

## 🔍 Issue #1: WASM Component Bundler Resolution in Vite & Next.js

### Severity: Medium (High impact on frontend builders)
### Location: `loadWasmComponent()` in `@terminal3/t3n-sdk`

* **Observation:** The SDK relies on an internal WASM component for enclave crypto. In browser/frontend environments using Vite 5+ or Next.js (Turbopack/Webpack), bundlers attempt to process the internal `.wasm` asset, leading to MIME-type (`application/wasm`) and memory initialization errors.
* **Current Doc Status:** The documentation includes an accordion noting that "a handful of teams have hit WASM-loading errors", but does not provide ready-to-use configuration fixes.
* **Recommended Fix:**
  1. For Next.js: Document `serverExternalPackages: ['@terminal3/t3n-sdk']` in `next.config.js`.
  2. For Vite: Provide a recommended polyfill configuration:
     ```ts
     // vite.config.ts
     export default defineConfig({
       optimizeDeps: {
         exclude: ['@terminal3/t3n-sdk']
       },
       plugins: [/* ... */]
     });
     ```
  3. Provide a dual-mode pattern: running backend TEE agents in Node/TSX while streaming state to lightweight web frontends via REST or WebSocket.

---

## 🔍 Issue #2: TypeScript Typings for `fetchTrustedManifest()`

### Severity: Low
### Location: `@terminal3/t3n-sdk/dist/types`

* **Observation:** In strict TypeScript configurations (`"strict": true`, `"noImplicitAny": true`), passing the return value of `await fetchTrustedManifest("testnet")` into `new T3nClient({ trustAnchor: ... })` requires an explicit type cast in certain tsconfig setups because `fetchTrustedManifest` resolves to `Promise<ManifestPayload>` which slightly diverges from the union type expected by `T3nClientConfig.trustAnchor`.
* **Reproduction:**
  ```ts
  const trustAnchor = await fetchTrustedManifest("testnet");
  // TS2322: Type 'ManifestPayload' is not assignable to type 'TrustAnchor'.
  ```
* **Recommended Fix:** Unify the exported `TrustAnchor` type interface across both `fetchTrustedManifest` and `T3nClientConfig`.

---

## 🔍 Issue #3: Clarification on CLI vs SDK Package Separation

### Severity: Low
### Location: `/developers/agents/register-agent.md`

* **Observation:** The guide illustrates agent card scaffolding via `t3n agent create-card --did "$AGENT_DID"`. Developers installing only `@terminal3/t3n-sdk` via `npm install @terminal3/t3n-sdk` find that the `t3n` binary is not in their path unless they install `@terminal3/t3n-cli` globally or execute it via `npx`.
* **Recommended Fix:** Explicitly state in the header of `register-agent.md`:
  ```bash
  npm install -g @terminal3/t3n-cli
  # or use programmatic scaffolding with the SDK directly
  ```

---

## 🔍 Issue #4: Headless / Agentic Onboarding Without Interactive Google SSO

### Severity: Enhancement / DX Opportunity
### Location: `https://go.terminal3.io/adk-community`

* **Observation:** The community claim link redirects to an interactive landing page that prompts for interactive Google OAuth. However, autonomous AI agents and headless CI/CD pipelines cannot click interactive browser buttons.
* **Positive Finding:** We proved that `@terminal3/t3n-sdk` can programmatically authenticate to the T3N testnet cluster and generate authentic DIDs (`did:t3n:...`) using standalone raw Ethereum private keys (`metamask_sign`) without needing human OAuth.
* **Recommendation:** Document this headless authentication mode as a first-class feature for autonomous AI agents in `developers/adk/get-started/quickstart.md`.

---

## 🏆 Summary Scorecard

| Area | Rating | Notes |
| :--- | :--- | :--- |
| **Network Speed** | ⭐⭐⭐⭐⭐ (5/5) | Sub-3s enclave handshake and DID generation. |
| **Security & Privacy** | ⭐⭐⭐⭐⭐ (5/5) | Real SGX/TEE verification and tamper-evident attestation. |
| **API Clarity** | ⭐⭐⭐⭐☆ (4.5/5) | Concise, expressive, and predictable methods. |
| **Documentation** | ⭐⭐⭐⭐☆ (4/5) | Vastly improved with llms.txt, minor bundler config gaps. |
