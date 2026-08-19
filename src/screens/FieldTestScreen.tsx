import { useState } from 'react'
import type { ScreenProps } from '../types'

const streakColors = [
  { name: 'White', bg: '#F8FAFC', border: '#E2E8F0' },
  { name: 'Pale Green', bg: '#86efac', border: '#4ade80' },
  { name: 'Black', bg: '#1a1a1a', border: '#374151' },
  { name: 'Red-Brown', bg: '#92400e', border: '#b45309' },
  { name: 'Yellow', bg: '#fbbf24', border: '#f59e0b' },
  { name: 'Blue-Grey', bg: '#64748b', border: '#475569' },
]

const mohsRef = [
  { val: 1, label: 'Talc', icon: '◌' },
  { val: 2.5, label: 'Fingernail', icon: '◌' },
  { val: 3.5, label: 'Penny', icon: '◌' },
  { val: 4, label: 'Iron nail', icon: '◌' },
  { val: 5.5, label: 'Knife blade', icon: '◌' },
  { val: 7, label: 'Quartz', icon: '◌' },
  { val: 10, label: 'Diamond', icon: '◌' },
]

export default function FieldTestScreen({ navigate }: ScreenProps) {
  const [mohs, setMohs] = useState(3.5)
  const [streak, setStreak] = useState('Pale Green')
  const [magnetism, setMagnetism] = useState('Non-Magnetic')
  const [acid, setAcid] = useState('Effervescent')
  const baseConf = 86
  const boost = streak === 'Pale Green' ? 6 : streak === 'White' ? 4 : 0
  const mohsBoost = mohs >= 3 && mohs <= 4.5 ? 3 : 0
  const newConf = Math.min(99, baseConf + boost + mohsBoost)
  const adjusted = newConf > baseConf

  const nearest = mohsRef.reduce((a, b) => Math.abs(b.val - mohs) < Math.abs(a.val - mohs) ? b : a)

  return (
    <div className="absolute inset-0 flex flex-col no-scrollbar" style={{ background: '#0F1217', overflowY: 'auto' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 mb-2">
        <button onClick={() => navigate('result')} style={{ color: '#8B929E' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <span className="font-mono text-[10px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          FIELD TEST REFINEMENT
        </span>
        <div className="w-5" />
      </div>

      {/* Confidence boost indicator */}
      <div
        className="mx-4 mb-4 rounded-2xl px-4 py-3 flex items-center justify-between"
        style={{
          background: adjusted ? 'rgba(0,200,83,0.08)' : 'rgba(30,35,48,0.8)',
          border: `1px solid ${adjusted ? 'rgba(0,200,83,0.3)' : '#1E2330'}`,
          transition: 'all 0.4s',
        }}
      >
        <div>
          <div className="font-mono text-[9px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
            CONFIDENCE ADJUSTED
          </div>
          <div className="font-display text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: adjusted ? '#00C853' : '#8B929E' }}>
            {baseConf}% → {newConf}%
          </div>
        </div>
        <div className="flex items-center gap-1">
          {adjusted && <span className="text-lg">↑</span>}
          <span className="font-mono text-sm font-bold" style={{ color: '#00C853', fontFamily: "'JetBrains Mono', monospace" }}>
            {adjusted ? `+${newConf - baseConf}%` : 'Adjust below'}
          </span>
        </div>
      </div>

      {/* Mohs Hardness */}
      <div className="mx-4 mb-4 rounded-2xl px-4 py-4" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px]" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
            MOHS HARDNESS SCALE
          </span>
          <span className="font-display font-bold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
            {mohs.toFixed(1)} — {nearest.label}
          </span>
        </div>
        <input
          type="range"
          min="1" max="10" step="0.5"
          value={mohs}
          onChange={(e) => setMohs(parseFloat(e.target.value))}
          className="w-full mb-3"
        />
        <div className="flex justify-between">
          {mohsRef.map((ref) => (
            <div key={ref.val} className="flex flex-col items-center gap-0.5">
              <div
                className="w-1 h-3 rounded-full"
                style={{ background: mohs >= ref.val ? '#D4AF37' : '#252B3A' }}
              />
              <span className="font-mono" style={{ fontSize: 7, color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
                {ref.val}
              </span>
              <span className="font-mono text-center" style={{ fontSize: 6, color: '#4B5563', fontFamily: "'JetBrains Mono', monospace", maxWidth: 28 }}>
                {ref.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Streak Test */}
      <div className="mx-4 mb-4 rounded-2xl px-4 py-4" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
        <div className="font-mono text-[10px] mb-3" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          STREAK PLATE TEST
        </div>
        <div className="grid grid-cols-3 gap-2">
          {streakColors.map((c) => (
            <button
              key={c.name}
              onClick={() => setStreak(c.name)}
              className="flex flex-col items-center gap-1.5 py-2 rounded-xl transition-all"
              style={{
                background: streak === c.name ? 'rgba(212,175,55,0.1)' : 'transparent',
                border: `1px solid ${streak === c.name ? '#D4AF37' : '#252B3A'}`,
              }}
            >
              <div
                className="w-7 h-7 rounded-full"
                style={{ background: c.bg, border: `2px solid ${streak === c.name ? '#D4AF37' : c.border}` }}
              />
              <span className="font-mono text-[8px] text-center" style={{ color: streak === c.name ? '#D4AF37' : '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
                {c.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Magnetism & Acid */}
      <div className="mx-4 mb-4 grid grid-cols-2 gap-2">
        <div className="rounded-2xl px-4 py-4" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
          <div className="font-mono text-[9px] mb-2" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>MAGNETISM</div>
          {['Non-Magnetic', 'Weak', 'Strong'].map((m) => (
            <button
              key={m}
              onClick={() => setMagnetism(m)}
              className="w-full text-left px-2 py-1.5 rounded-lg mb-1 font-mono text-[9px] transition-all"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: magnetism === m ? 'rgba(0,229,255,0.1)' : 'transparent',
                color: magnetism === m ? '#00E5FF' : '#4B5563',
                border: `1px solid ${magnetism === m ? 'rgba(0,229,255,0.3)' : 'transparent'}`,
              }}
            >
              {m}
            </button>
          ))}
        </div>
        <div className="rounded-2xl px-4 py-4" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
          <div className="font-mono text-[9px] mb-2" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>ACID REACTION</div>
          {['None', 'Slight', 'Effervescent'].map((a) => (
            <button
              key={a}
              onClick={() => setAcid(a)}
              className="w-full text-left px-2 py-1.5 rounded-lg mb-1 font-mono text-[9px] transition-all"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: acid === a ? 'rgba(0,200,83,0.1)' : 'transparent',
                color: acid === a ? '#00C853' : '#4B5563',
                border: `1px solid ${acid === a ? 'rgba(0,200,83,0.3)' : 'transparent'}`,
              }}
            >
              {a}
            </button>
          ))}
        </div>
      </div>

      {/* Update button */}
      <div className="mx-4 mb-6">
        <button
          onClick={() => navigate('result')}
          className="w-full py-4 rounded-2xl font-display font-semibold text-base transition-all active:scale-95"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: 'linear-gradient(135deg, #C58B2B, #D4AF37)',
            color: '#0F1217',
            boxShadow: '0 4px 20px rgba(212,175,55,0.25)',
          }}
        >
          Update Analysis → {newConf}% Confidence
        </button>
      </div>
    </div>
  )
}
