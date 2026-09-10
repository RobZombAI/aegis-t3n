// Web Audio API Sound Synthesizer (Zero external dependencies)
let audioCtx: AudioContext | null = null

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext
    if (AudioContextClass) {
      audioCtx = new AudioContextClass()
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

export function playCyberClick() {
  const ctx = getAudioContext()
  if (!ctx) return
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(800, ctx.currentTime)
  osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05)

  gain.gain.setValueAtTime(0.08, ctx.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start()
  osc.stop(ctx.currentTime + 0.05)
}

export function playSuccessChime() {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime

  const notes = [523.25, 659.25, 783.99, 1046.5] // C5, E5, G5, C6 arpeggio
  notes.forEach((freq, idx) => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()

    osc.type = 'triangle'
    osc.frequency.setValueAtTime(freq, now + idx * 0.07)

    gain.gain.setValueAtTime(0, now + idx * 0.07)
    gain.gain.linearRampToValueAtTime(0.1, now + idx * 0.07 + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.07 + 0.25)

    osc.connect(gain)
    gain.connect(ctx.destination)

    osc.start(now + idx * 0.07)
    osc.stop(now + idx * 0.07 + 0.25)
  })
}

export function playCookieCrunch() {
  const ctx = getAudioContext()
  if (!ctx) return
  const now = ctx.currentTime

  const osc = ctx.createOscillator()
  const gain = ctx.createGain()

  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(240, now)
  osc.frequency.exponentialRampToValueAtTime(120, now + 0.08)

  gain.gain.setValueAtTime(0.15, now)
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08)

  osc.connect(gain)
  gain.connect(ctx.destination)

  osc.start(now)
  osc.stop(now + 0.08)
}
