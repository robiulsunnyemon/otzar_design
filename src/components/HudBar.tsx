export default function HudBar({ pending = 3 }: { pending?: number }) {
  return (
    <div
      className="mx-4 mb-3 px-3 py-2 rounded-lg flex items-center justify-between animate-hud-flicker"
      style={{ background: '#181C24', border: '1px solid rgba(0,229,255,0.15)' }}
    >
      <div className="flex items-center gap-1">
        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00C853' }} />
        <span className="font-mono text-[9px]" style={{ color: '#00C853', fontFamily: "'JetBrains Mono', monospace" }}>
          SAT ×12 ±2.8m
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="font-mono text-[9px]" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>
          {pending} STAGED
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="font-mono text-[9px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
          OFFLINE
        </span>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#E65100' }} />
      </div>
    </div>
  )
}
