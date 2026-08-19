export default function StatusBar() {
  return (
    <div
      className="w-full h-full flex items-center justify-between px-6 font-mono text-[10px]"
      style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}
    >
      <span style={{ color: '#D4AF37', fontWeight: 600 }}>9:41</span>
      <div className="flex items-center gap-2">
        <span style={{ color: '#00C853' }}>GPS ±2.8m</span>
        <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
          <rect x="0" y="6" width="2" height="4" fill="#D4AF37" rx="0.5" />
          <rect x="3" y="4" width="2" height="6" fill="#D4AF37" rx="0.5" />
          <rect x="6" y="2" width="2" height="8" fill="#D4AF37" rx="0.5" />
          <rect x="9" y="0" width="2" height="10" fill="#D4AF37" rx="0.5" />
          <rect x="12" y="0" width="2" height="10" fill="#1E2330" rx="0.5" />
        </svg>
        <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
          <rect x="0.5" y="0.5" width="15" height="9" rx="2" stroke="#8B929E" strokeWidth="1" />
          <rect x="16" y="3" width="1.5" height="4" rx="0.5" fill="#8B929E" />
          <rect x="2" y="2" width="10" height="6" rx="1" fill="#D4AF37" />
        </svg>
      </div>
    </div>
  )
}
