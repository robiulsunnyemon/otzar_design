import { useState } from 'react'
import type { ScreenProps } from '../types'

const keys = ['1','2','3','4','5','6','7','8','9','','0','⌫']

export default function PinScreen({ navigate }: ScreenProps) {
  const [pin, setPin] = useState('')
  const [shake, setShake] = useState(false)

  const handleKey = (k: string) => {
    if (k === '') return
    if (k === '⌫') { setPin((p) => p.slice(0, -1)); return }
    if (pin.length >= 4) return
    const next = pin + k
    setPin(next)
    if (next.length === 4) {
      setTimeout(() => {
        if (next === '1234') navigate('dashboard')
        else { setShake(true); setTimeout(() => { setShake(false); setPin('') }, 600) }
      }, 200)
    }
  }

  return (
    <div
      className="absolute inset-0 flex flex-col items-center"
      style={{ background: 'linear-gradient(180deg, #181C24 0%, #0F1217 100%)' }}
    >
      {/* Header */}
      <div className="flex flex-col items-center pt-10 pb-8">
        <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4" style={{ background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
          </svg>
        </div>
        <div className="font-display text-base font-semibold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
          FIELD ACCESS
        </div>
        <div className="font-mono text-[10px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}>
          OTZAR GEOLOGICAL SYSTEM — SECURE LOGIN
        </div>
      </div>

      {/* PIN dots */}
      <div className={`flex gap-4 mb-8 ${shake ? 'animate-bounce' : ''}`}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full transition-all duration-200"
            style={{
              background: i < pin.length ? '#D4AF37' : 'transparent',
              border: `2px solid ${i < pin.length ? '#D4AF37' : '#4B5563'}`,
              boxShadow: i < pin.length ? '0 0 8px rgba(212,175,55,0.5)' : 'none',
            }}
          />
        ))}
      </div>

      {/* Hint */}
      <div className="font-mono text-[10px] mb-8" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
        ENTER 4-DIGIT FIELD PIN · DEMO: 1234
      </div>

      {/* Keypad */}
      <div className="grid grid-cols-3 gap-3 w-64 mb-8">
        {keys.map((k, i) => (
          <button
            key={i}
            onClick={() => handleKey(k)}
            disabled={k === ''}
            className="h-14 rounded-2xl font-display text-xl font-medium flex items-center justify-center transition-all active:scale-90"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: k === '' ? 'transparent' : '#181C24',
              color: k === '⌫' ? '#8B929E' : '#F8FAFC',
              border: k === '' ? 'none' : '1px solid #1E2330',
              fontSize: k === '⌫' ? 16 : 22,
            }}
          >
            {k}
          </button>
        ))}
      </div>

      {/* Biometric */}
      <button
        onClick={() => navigate('dashboard')}
        className="flex flex-col items-center gap-2 active:opacity-70"
      >
        <div className="w-14 h-14 rounded-full flex items-center justify-center" style={{ background: 'rgba(0,200,83,0.08)', border: '1px solid rgba(0,200,83,0.25)' }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2C8.5 2 5.5 4.5 5.5 8c0 3.5 2.5 6.5 5.5 7.5V22" />
            <path d="M8 10c0-2.2 1.8-4 4-4s4 1.8 4 4c0 2-1.2 3.7-3 4.5" />
            <path d="M12 8v4" />
            <path d="M16 10c0 2.2-1.8 5-4 6" />
            <path d="M19 8c0-3.9-3.1-7-7-7" />
            <path d="M5.5 8c0-3.5 2.9-6 6.5-6" />
          </svg>
        </div>
        <span className="font-mono text-[10px]" style={{ color: '#00C853', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          BIOMETRIC
        </span>
      </button>
    </div>
  )
}
