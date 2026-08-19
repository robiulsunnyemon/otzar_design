import type { ScreenProps } from '../types'
import HudBar from '../components/HudBar'

const recentScans = [
  { name: 'Malachite', formula: 'Cu₂CO₃(OH)₂', conf: 86, grade: 'Specimen', time: '14:32', color: '#00C853' },
  { name: 'Chalcopyrite', formula: 'CuFeS₂', conf: 91, grade: 'Ore', time: '12:08', color: '#D4AF37' },
  { name: 'Pyrite', formula: 'FeS₂', conf: 78, grade: 'Industrial', time: '09:45', color: '#FF9100' },
]

export default function DashboardScreen({ navigate }: ScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col no-scrollbar" style={{ background: '#0F1217', overflowY: 'auto' }}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3 flex items-center justify-between">
        <div>
          <div className="font-display text-[11px] font-medium mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#8B929E', letterSpacing: '0.1em' }}>
            COMMAND CENTER
          </div>
          <div className="font-display text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
            Good afternoon, Dr. Osei
          </div>
        </div>
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, #C58B2B, #D4AF37)', color: '#0F1217', fontFamily: "'Space Grotesk', sans-serif" }}
        >
          KO
        </div>
      </div>

      <HudBar pending={3} />

      {/* Sync banner */}
      <div
        className="mx-4 mb-4 px-4 py-3 rounded-xl flex items-center justify-between"
        style={{ background: 'rgba(230,81,0,0.1)', border: '1px solid rgba(230,81,0,0.3)' }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#E65100' }} />
          <span className="text-xs font-medium" style={{ color: '#FF9100' }}>
            3 Scans Staged for Cloud Sync
          </span>
        </div>
        <button
          onClick={() => navigate('sync')}
          className="font-mono text-[10px] font-semibold px-3 py-1 rounded-lg"
          style={{ color: '#0F1217', background: '#FF9100', fontFamily: "'JetBrains Mono', monospace" }}
        >
          SYNC NOW
        </button>
      </div>

      {/* Hero Scan Button */}
      <div className="mx-4 mb-4">
        <button
          onClick={() => navigate('scanner')}
          className="w-full py-6 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center gap-2 active:scale-98 transition-all animate-pulse-gold"
          style={{
            background: 'linear-gradient(145deg, #1E2330, #181C24)',
            border: '1px solid rgba(212,175,55,0.3)',
          }}
        >
          {/* Shimmer overlay */}
          <div className="absolute inset-0 animate-shimmer pointer-events-none rounded-3xl" />

          {/* Reticle */}
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full animate-pulse-ring" style={{ border: '1px solid rgba(212,175,55,0.4)' }} />
            <div className="absolute inset-3 rounded-full animate-pulse-ring" style={{ border: '1px solid rgba(212,175,55,0.3)', animationDelay: '0.5s' }} />
            <div className="reticle-corner reticle-corner-tl" style={{ top: 4, left: 4 }} />
            <div className="reticle-corner reticle-corner-tr" style={{ top: 4, right: 4 }} />
            <div className="reticle-corner reticle-corner-bl" style={{ bottom: 4, left: 4 }} />
            <div className="reticle-corner reticle-corner-br" style={{ bottom: 4, right: 4 }} />
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="3" />
              <path d="M12 2v4M12 18v4M2 12h4M18 12h4" />
            </svg>
          </div>

          <span className="font-display font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#D4AF37', letterSpacing: '0.05em' }}>
            INITIATE SCAN
          </span>
          <span className="font-mono text-[10px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
            AI MINERAL IDENTIFICATION · OFFLINE READY
          </span>
        </button>
      </div>

      {/* Stats row */}
      <div className="mx-4 mb-4 grid grid-cols-3 gap-2">
        {[
          { label: "Today's Finds", value: '7', unit: 'specimens', color: '#D4AF37' },
          { label: 'Est. Value', value: '$4.2K', unit: 'approx.', color: '#00C853' },
          { label: 'Pending AI', value: '3', unit: 'in queue', color: '#FF9100' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl px-3 py-4 flex flex-col gap-1"
            style={{ background: '#181C24', border: '1px solid #1E2330' }}
          >
            <span className="font-display text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: stat.color }}>
              {stat.value}
            </span>
            <span className="font-mono text-[9px] leading-tight" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
              {stat.label}
            </span>
            <span className="font-mono text-[8px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
              {stat.unit}
            </span>
          </div>
        ))}
      </div>

      {/* Recent scans */}
      <div className="mx-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px] font-semibold" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
            RECENT SPECIMENS
          </span>
          <button onClick={() => navigate('catalog')} className="font-mono text-[10px]" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>
            VIEW ALL →
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {recentScans.map((scan) => (
            <button
              key={scan.name}
              onClick={() => navigate('result')}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all active:scale-98"
              style={{ background: '#181C24', border: '1px solid #1E2330' }}
            >
              <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${scan.color}14` }}>
                <div className="w-3 h-3 rounded-sm" style={{ background: scan.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
                    {scan.name}
                  </span>
                  <span className="font-mono text-[9px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
                    {scan.formula}
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-mono text-[9px]" style={{ color: scan.color, fontFamily: "'JetBrains Mono', monospace" }}>
                    {scan.conf}% MATCH
                  </span>
                  <span className="font-mono text-[9px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
                    · {scan.grade}
                  </span>
                </div>
              </div>
              <span className="font-mono text-[9px] flex-shrink-0" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
                {scan.time}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mx-4 mb-24 grid grid-cols-2 gap-2">
        {[
          { label: 'GIS Map', icon: '🗺', screen: 'map' as const },
          { label: 'Field Log', icon: '📋', screen: 'logging' as const },
        ].map((a) => (
          <button
            key={a.label}
            onClick={() => navigate(a.screen)}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl transition-all active:scale-95"
            style={{ background: '#181C24', border: '1px solid #1E2330' }}
          >
            <span style={{ fontSize: 20 }}>{a.icon}</span>
            <span className="font-display font-medium text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
