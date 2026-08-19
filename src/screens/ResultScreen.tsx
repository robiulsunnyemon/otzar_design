import type { ScreenProps } from '../types'

const alts = [
  { name: 'Chrysocolla', pct: 11, color: '#00E5FF' },
  { name: 'Brochantite', pct: 3, color: '#00C853' },
]

function ConfidenceGauge({ value }: { value: number }) {
  const r = 40
  const circ = 2 * Math.PI * r
  const offset = circ - (value / 100) * circ
  return (
    <svg width="100" height="100" viewBox="0 0 100 100">
      <circle cx="50" cy="50" r={r} fill="none" stroke="#1E2330" strokeWidth="8" />
      <circle
        cx="50" cy="50" r={r} fill="none"
        stroke="url(#gaugeGrad)" strokeWidth="8"
        strokeLinecap="round"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        transform="rotate(-90 50 50)"
        style={{ transition: 'stroke-dashoffset 1.2s ease-out' }}
        className="animate-gauge-fill"
      />
      <defs>
        <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C58B2B" />
          <stop offset="100%" stopColor="#D4AF37" />
        </linearGradient>
      </defs>
      <text x="50" y="46" textAnchor="middle" fill="#D4AF37" fontSize="16" fontWeight="700" fontFamily="'Space Grotesk', sans-serif">{value}%</text>
      <text x="50" y="60" textAnchor="middle" fill="#8B929E" fontSize="7" fontFamily="'JetBrains Mono', monospace">MATCH</text>
    </svg>
  )
}

export default function ResultScreen({ navigate }: ScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col no-scrollbar" style={{ background: '#0F1217', overflowY: 'auto' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <button onClick={() => navigate('scanner')} style={{ color: '#8B929E' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <span className="font-mono text-[10px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          IDENTIFICATION RESULT
        </span>
        <button style={{ color: '#8B929E' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" />
          </svg>
        </button>
      </div>

      {/* Hero ID */}
      <div className="mx-4 mb-4 rounded-3xl p-5" style={{ background: 'linear-gradient(145deg, #181C24, #1E2330)', border: '1px solid rgba(212,175,55,0.15)' }}>
        <div className="flex items-start gap-4">
          {/* Mineral color swatch */}
          <div
            className="w-16 h-16 rounded-2xl flex-shrink-0 flex items-center justify-center"
            style={{ background: 'linear-gradient(145deg, #1a4a2e, #2d7a4a)', border: '1px solid rgba(0,200,83,0.3)' }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <polygon points="16,3 29,9.5 29,22.5 16,29 3,22.5 3,9.5" fill="rgba(0,200,83,0.2)" stroke="#00C853" strokeWidth="1.5" />
              <polygon points="16,9 23,12.5 23,19.5 16,23 9,19.5 9,12.5" fill="rgba(0,200,83,0.3)" stroke="rgba(0,200,83,0.5)" strokeWidth="1" />
            </svg>
          </div>
          <div className="flex-1">
            <div className="font-mono text-[9px] mb-1" style={{ color: '#00C853', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}>
              CARBONATES · CU-BEARING
            </div>
            <div className="font-display text-2xl font-bold mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
              Malachite
            </div>
            <div className="font-mono text-sm" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>
              Cu₂CO₃(OH)₂
            </div>
          </div>
          <ConfidenceGauge value={86} />
        </div>
      </div>

      {/* Properties grid */}
      <div className="mx-4 mb-4 grid grid-cols-2 gap-2">
        {[
          { label: 'MOHS HARDNESS', value: '3.5 – 4.0' },
          { label: 'LUSTER', value: 'Vitreous / Silky' },
          { label: 'STREAK', value: 'Pale Green' },
          { label: 'CRYSTAL SYSTEM', value: 'Monoclinic' },
          { label: 'CLEAVAGE', value: 'Perfect {201}' },
          { label: 'SPECIFIC GRAVITY', value: '3.6 – 4.05' },
        ].map((p) => (
          <div key={p.label} className="rounded-xl px-3 py-3" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
            <div className="font-mono text-[8px] mb-1" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.08em' }}>
              {p.label}
            </div>
            <div className="font-display text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
              {p.value}
            </div>
          </div>
        ))}
      </div>

      {/* Commercial value */}
      <div
        className="mx-4 mb-4 rounded-2xl px-4 py-4"
        style={{ background: 'rgba(212,175,55,0.06)', border: '1px solid rgba(212,175,55,0.2)' }}
      >
        <div className="font-mono text-[10px] mb-3" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          COMMERCIAL ESTIMATE
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="font-mono text-[8px] mb-1" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>RAW ORE GRADE</div>
            <div className="font-display text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#D4AF37' }}>$110/ton</div>
            <div className="font-mono text-[8px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>LME Cu ref. basis</div>
          </div>
          <div>
            <div className="font-mono text-[8px] mb-1" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>SPECIMEN GRADE</div>
            <div className="font-display text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#00C853' }}>$45/kg</div>
            <div className="font-mono text-[8px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>Crystal quality</div>
          </div>
        </div>
      </div>

      {/* Alternatives */}
      <div className="mx-4 mb-4">
        <div className="font-mono text-[10px] mb-2" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          ALTERNATIVE CANDIDATES
        </div>
        <div className="flex gap-2">
          {alts.map((alt) => (
            <div key={alt.name} className="flex-1 rounded-xl px-3 py-2" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
              <div className="font-display text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
                {alt.name}
              </div>
              <div className="font-mono text-[10px]" style={{ color: alt.color, fontFamily: "'JetBrains Mono', monospace" }}>
                {alt.pct}%
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="mx-4 mb-6 flex flex-col gap-2">
        <button
          onClick={() => navigate('fieldtest')}
          className="w-full py-3.5 rounded-2xl font-display font-semibold text-sm transition-all active:scale-95"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: 'rgba(0,229,255,0.1)',
            color: '#00E5FF',
            border: '1px solid rgba(0,229,255,0.3)',
          }}
        >
          Refine with Field Test (Recommended) +10%
        </button>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => navigate('logging')}
            className="py-3.5 rounded-2xl font-display font-semibold text-sm transition-all active:scale-95"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: 'linear-gradient(135deg, #C58B2B, #D4AF37)',
              color: '#0F1217',
            }}
          >
            Confirm & Log
          </button>
          <button
            onClick={() => navigate('scanner')}
            className="py-3.5 rounded-2xl font-display font-semibold text-sm transition-all active:scale-95"
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              background: '#181C24',
              color: '#8B929E',
              border: '1px solid #1E2330',
            }}
          >
            Discard
          </button>
        </div>
      </div>
    </div>
  )
}
