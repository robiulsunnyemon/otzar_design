import { useState } from 'react'
import type { ScreenProps } from '../types'

const syncItems = [
  { id: 'SC-081', name: 'Malachite', loc: 'Vein #4', size: '4.2 MB', status: 'synced', time: '14:32' },
  { id: 'SC-080', name: 'Chalcopyrite', loc: 'Outcrop B', size: '3.8 MB', status: 'processing', time: '12:08' },
  { id: 'SC-079', name: 'Pyrite', loc: 'Riverbed', size: '5.1 MB', status: 'pending', time: '09:45' },
  { id: 'SC-078', name: 'Azurite', loc: 'Vein #4', size: '3.2 MB', status: 'pending', time: '09:12' },
  { id: 'SC-077', name: 'Hematite', loc: 'Cut #2', size: '4.6 MB', status: 'synced', time: 'Aug 17' },
  { id: 'SC-076', name: 'Quartz', loc: 'Vein #1', size: '2.9 MB', status: 'synced', time: 'Aug 17' },
]

const statusConfig = {
  synced: { color: '#00C853', bg: 'rgba(0,200,83,0.1)', label: 'SYNCED', dot: '#00C853' },
  processing: { color: '#00E5FF', bg: 'rgba(0,229,255,0.1)', label: 'AI PROCESSING', dot: '#00E5FF' },
  pending: { color: '#FF9100', bg: 'rgba(255,145,0,0.1)', label: 'AWAITING CONN.', dot: '#E65100' },
}

export default function SyncScreen({ navigate: _navigate }: ScreenProps) {
  const [cellular, setCellular] = useState(false)
  const [syncing, setSyncing] = useState(false)

  const pendingCount = syncItems.filter((s) => s.status === 'pending').length
  const totalSize = '9.3 MB'

  return (
    <div className="absolute inset-0 flex flex-col no-scrollbar" style={{ background: '#0F1217', overflowY: 'auto' }}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3 flex items-center justify-between">
        <div className="font-display text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
          Sync Engine
        </div>
        <div className="font-mono text-[9px] px-2 py-1 rounded-lg" style={{ color: '#E65100', background: 'rgba(230,81,0,0.1)', border: '1px solid rgba(230,81,0,0.25)', fontFamily: "'JetBrains Mono', monospace" }}>
          OFFLINE
        </div>
      </div>

      {/* Status summary */}
      <div className="mx-4 mb-4 grid grid-cols-3 gap-2">
        {[
          { label: 'PENDING', value: pendingCount.toString(), color: '#FF9100' },
          { label: 'QUEUED SIZE', value: totalSize, color: '#D4AF37' },
          { label: 'SYNCED TODAY', value: '4', color: '#00C853' },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl px-3 py-3 text-center" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
            <div className="font-display text-xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: s.color }}>{s.value}</div>
            <div className="font-mono text-[8px] mt-0.5" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="font-display text-sm font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
              Cellular Data Sync
            </div>
            <div className="font-mono text-[9px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
              Use mobile data when WiFi unavailable
            </div>
          </div>
          <button
            onClick={() => setCellular(!cellular)}
            className="w-12 h-6 rounded-full transition-all relative"
            style={{ background: cellular ? '#D4AF37' : '#252B3A' }}
          >
            <div
              className="absolute top-1 w-4 h-4 rounded-full transition-all"
              style={{ background: '#F8FAFC', left: cellular ? '28px' : '4px' }}
            />
          </button>
        </div>

        <button
          onClick={() => setSyncing(!syncing)}
          className="w-full py-3 rounded-xl font-display font-semibold text-sm transition-all active:scale-95"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: syncing ? 'rgba(212,175,55,0.1)' : 'linear-gradient(135deg, #C58B2B, #D4AF37)',
            color: syncing ? '#D4AF37' : '#0F1217',
            border: syncing ? '1px solid rgba(212,175,55,0.3)' : 'none',
          }}
        >
          {syncing ? 'Background Sync Active...' : 'Force Background Sync'}
        </button>
      </div>

      {/* Legend */}
      <div className="mx-4 mb-3 flex items-center gap-4">
        {Object.entries(statusConfig).map(([key, val]) => (
          <div key={key} className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full" style={{ background: val.dot }} />
            <span className="font-mono text-[8px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
              {val.label}
            </span>
          </div>
        ))}
      </div>

      {/* Sync table */}
      <div className="mx-4 mb-24">
        <div className="flex items-center justify-between px-1 mb-2">
          {['ID', 'MINERAL', 'SIZE', 'STATUS'].map((h) => (
            <span key={h} className="font-mono text-[8px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace", width: h === 'MINERAL' ? 100 : h === 'STATUS' ? 90 : 60 }}>
              {h}
            </span>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {syncItems.map((item) => {
            const cfg = statusConfig[item.status as keyof typeof statusConfig]
            return (
              <div
                key={item.id}
                className="flex items-center gap-2 px-3 py-3 rounded-2xl"
                style={{ background: '#181C24', border: '1px solid #1E2330' }}
              >
                <span className="font-mono text-[9px] flex-shrink-0" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace", width: 48 }}>
                  {item.id}
                </span>
                <div style={{ width: 90, flexShrink: 0 }}>
                  <div className="font-display font-semibold text-xs" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>{item.name}</div>
                  <div className="font-mono text-[8px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>{item.loc}</div>
                </div>
                <span className="font-mono text-[9px] flex-shrink-0" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", width: 44 }}>
                  {item.size}
                </span>
                <div className="flex-1 flex justify-end">
                  <div
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg"
                    style={{ background: cfg.bg, border: `1px solid ${cfg.color}30` }}
                  >
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{
                        background: cfg.dot,
                        animation: item.status === 'processing' ? 'blink 1s step-end infinite' : 'none',
                      }}
                    />
                    <span className="font-mono text-[7px]" style={{ color: cfg.color, fontFamily: "'JetBrains Mono', monospace" }}>
                      {cfg.label}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
