import { useState } from 'react'
import type { ScreenProps } from '../types'

const pins = [
  { id: 1, x: 180, y: 180, name: 'Malachite', color: '#00C853', conf: 96 },
  { id: 2, x: 240, y: 220, name: 'Chalcopyrite', color: '#D4AF37', conf: 91 },
  { id: 3, x: 130, y: 260, name: 'Pyrite', color: '#FF9100', conf: 78 },
  { id: 4, x: 280, y: 160, name: 'Hematite', color: '#E65100', conf: 88 },
  { id: 5, x: 200, y: 310, name: 'Quartz', color: '#00E5FF', conf: 99 },
  { id: 6, x: 155, y: 200, name: 'Azurite', color: '#6366f1', conf: 82 },
]

export default function MapScreen({ navigate: _navigate }: ScreenProps) {
  const [selected, setSelected] = useState<typeof pins[0] | null>(pins[0])
  const [drawerOpen, setDrawerOpen] = useState(true)

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#0F1217' }}>
      {/* Header */}
      <div className="px-5 pt-2 pb-2 flex items-center justify-between z-10 relative">
        <div className="font-display text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
          GIS Claim Map
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1.5 rounded-xl font-mono text-[9px] transition-all"
            style={{ background: 'rgba(0,200,83,0.1)', color: '#00C853', border: '1px solid rgba(0,200,83,0.3)', fontFamily: "'JetBrains Mono', monospace" }}>
            HEATMAP
          </button>
          <button className="px-3 py-1.5 rounded-xl font-mono text-[9px]"
            style={{ background: '#181C24', color: '#8B929E', border: '1px solid #1E2330', fontFamily: "'JetBrains Mono', monospace" }}>
            LAYERS
          </button>
        </div>
      </div>

      {/* Map area */}
      <div className="flex-1 relative overflow-hidden">
        <svg width="100%" height="100%" viewBox="0 0 390 560" preserveAspectRatio="xMidYMid slice" style={{ background: '#0d1a0f' }}>
          {/* Terrain base */}
          <defs>
            <radialGradient id="heat1" cx="50%" cy="45%" r="35%">
              <stop offset="0%" stopColor="rgba(212,175,55,0.12)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
            <radialGradient id="sat" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0d1a0f" />
              <stop offset="100%" stopColor="#0a1208" />
            </radialGradient>
          </defs>

          {/* Terrain patches */}
          <rect width="390" height="560" fill="url(#sat)" />
          <ellipse cx="160" cy="220" rx="120" ry="90" fill="rgba(40,60,30,0.4)" />
          <ellipse cx="260" cy="300" rx="90" ry="70" fill="rgba(30,50,25,0.35)" />
          <ellipse cx="100" cy="350" rx="70" ry="50" fill="rgba(20,35,20,0.3)" />

          {/* Contour lines */}
          {[0,1,2,3,4].map((i) => (
            <ellipse
              key={i}
              cx="195" cy="250"
              rx={60 + i * 22} ry={45 + i * 16}
              fill="none"
              stroke="rgba(0,200,83,0.07)"
              strokeWidth="1"
            />
          ))}
          {[0,1,2,3].map((i) => (
            <ellipse
              key={i}
              cx="120" cy="360"
              rx={30 + i * 18} ry={22 + i * 12}
              fill="none"
              stroke="rgba(0,200,83,0.05)"
              strokeWidth="0.5"
            />
          ))}

          {/* River */}
          <path d="M60 120 Q130 180 160 240 Q190 300 230 380 Q260 430 310 480" stroke="rgba(0,100,180,0.3)" strokeWidth="8" fill="none" strokeLinecap="round" />
          <path d="M60 120 Q130 180 160 240 Q190 300 230 380 Q260 430 310 480" stroke="rgba(0,150,220,0.15)" strokeWidth="4" fill="none" strokeLinecap="round" />

          {/* Claim polygon */}
          <polygon
            points="110,140 280,130 310,290 270,360 130,350 90,230"
            fill="rgba(212,175,55,0.04)"
            stroke="rgba(212,175,55,0.3)"
            strokeWidth="1.5"
            strokeDasharray="8 4"
          />
          <text x="195" y="160" fill="rgba(212,175,55,0.5)" fontSize="9" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">CLAIM ZONE A-7</text>

          {/* Grid */}
          {[65,130,195,260,325].map((x) => (
            <line key={x} x1={x} y1="0" x2={x} y2="560" stroke="rgba(0,229,255,0.04)" strokeWidth="0.5" />
          ))}
          {[80,160,240,320,400,480].map((y) => (
            <line key={y} x1="0" y1={y} x2="390" y2={y} stroke="rgba(0,229,255,0.04)" strokeWidth="0.5" />
          ))}

          {/* Heatmap overlay */}
          <circle cx="195" cy="220" r="80" fill="url(#heat1)" />

          {/* Cluster indicator */}
          <circle cx="190" cy="230" r="22" fill="rgba(212,175,55,0.08)" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
          <text x="190" y="234" fill="#D4AF37" fontSize="10" fontFamily="'Space Grotesk', sans-serif" textAnchor="middle" fontWeight="600">6</text>

          {/* Pins */}
          {pins.map((pin) => (
            <g key={pin.id} onClick={() => { setSelected(pin); setDrawerOpen(true) }} style={{ cursor: 'pointer' }}>
              <circle cx={pin.x} cy={pin.y} r="16" fill={`${pin.color}15`} stroke={`${pin.color}40`} strokeWidth="1" />
              <circle
                cx={pin.x} cy={pin.y} r="8"
                fill={selected?.id === pin.id ? pin.color : `${pin.color}60`}
                stroke={pin.color}
                strokeWidth={selected?.id === pin.id ? 2 : 1}
              />
              <text x={pin.x} y={pin.y + 4} fill={selected?.id === pin.id ? '#0F1217' : pin.color} fontSize="8" fontFamily="'JetBrains Mono', monospace" textAnchor="middle" fontWeight="700">
                {pin.id}
              </text>
            </g>
          ))}

          {/* Compass */}
          <g transform="translate(350, 50)">
            <circle cx="0" cy="0" r="18" fill="rgba(15,18,23,0.9)" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
            <polygon points="0,-13 -4,2 0,0 4,2" fill="#D4AF37" />
            <polygon points="0,13 -4,-2 0,0 4,-2" fill="#4B5563" />
            <text x="0" y="-16" fill="#D4AF37" fontSize="7" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">N</text>
          </g>

          {/* Scale bar */}
          <g transform="translate(20, 500)">
            <line x1="0" y1="0" x2="60" y2="0" stroke="rgba(248,250,252,0.4)" strokeWidth="1.5" />
            <line x1="0" y1="-3" x2="0" y2="3" stroke="rgba(248,250,252,0.4)" strokeWidth="1" />
            <line x1="60" y1="-3" x2="60" y2="3" stroke="rgba(248,250,252,0.4)" strokeWidth="1" />
            <text x="30" y="14" fill="rgba(248,250,252,0.4)" fontSize="8" fontFamily="'JetBrains Mono', monospace" textAnchor="middle">250m</text>
          </g>
        </svg>

        {/* Coord display */}
        <div
          className="absolute top-3 left-3 px-2 py-1.5 rounded-lg font-mono text-[8px]"
          style={{ background: 'rgba(15,18,23,0.85)', border: '1px solid rgba(0,229,255,0.15)', color: '#00E5FF', fontFamily: "'JetBrains Mono', monospace" }}
        >
          -12.9783°S · 028.6234°E
        </div>
      </div>

      {/* Bottom drawer */}
      {selected && drawerOpen && (
        <div
          className="absolute bottom-20 left-4 right-4 rounded-3xl p-4"
          style={{ background: '#181C24', border: '1px solid #1E2330', boxShadow: '0 -8px 32px rgba(0,0,0,0.5)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${selected.color}14`, border: `1px solid ${selected.color}30` }}>
                <div className="w-3 h-3 rounded-sm" style={{ background: selected.color }} />
              </div>
              <div>
                <div className="font-display font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>{selected.name}</div>
                <div className="font-mono text-[9px]" style={{ color: selected.color, fontFamily: "'JetBrains Mono', monospace" }}>{selected.conf}% MATCH</div>
              </div>
            </div>
            <button onClick={() => setDrawerOpen(false)} style={{ color: '#4B5563' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <div className="flex gap-2">
            <div className="flex-1 rounded-xl px-3 py-2" style={{ background: '#252B3A' }}>
              <div className="font-mono text-[8px] mb-0.5" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>BEARING</div>
              <div className="font-mono text-[10px]" style={{ color: '#F8FAFC', fontFamily: "'JetBrains Mono', monospace" }}>N 042° · 184m</div>
            </div>
            <div className="flex-1 rounded-xl px-3 py-2" style={{ background: '#252B3A' }}>
              <div className="font-mono text-[8px] mb-0.5" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>ELEVATION</div>
              <div className="font-mono text-[10px]" style={{ color: '#F8FAFC', fontFamily: "'JetBrains Mono', monospace" }}>1,247m ASL</div>
            </div>
            <div className="flex-1 rounded-xl px-3 py-2" style={{ background: '#252B3A' }}>
              <div className="font-mono text-[8px] mb-0.5" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>DATE</div>
              <div className="font-mono text-[10px]" style={{ color: '#F8FAFC', fontFamily: "'JetBrains Mono', monospace" }}>Aug 18</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
