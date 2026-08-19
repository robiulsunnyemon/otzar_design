import { useState } from 'react'
import type { ScreenProps } from '../types'

export default function ProfileScreen({ navigate }: ScreenProps) {
  const [sunlight, setSunlight] = useState(false)
  const [voice, setVoice] = useState(true)
  const [autoSync, setAutoSync] = useState(false)

  const storageUsed = 62

  const settings = [
    {
      group: 'DEVICE',
      items: [
        { label: 'Sensor Calibration', desc: 'GPS, camera, accelerometer', nav: true, icon: '⚡' },
        { label: 'Offline Map Downloads', desc: 'Zambia Copperbelt · 847 MB', nav: true, icon: '🗺' },
        { label: 'Neural Model Update', desc: 'v4.2.1 · Current', nav: true, icon: '🧠' },
      ],
    },
    {
      group: 'FIELD',
      items: [
        { label: 'Sunlight High-Contrast Mode', desc: 'Monochrome HUD for harsh daylight', toggle: sunlight, onToggle: () => setSunlight(!sunlight), icon: '☀' },
        { label: 'Voice Field Logging', desc: 'Hands-free geological dictation', toggle: voice, onToggle: () => setVoice(!voice), icon: '🎙' },
        { label: 'Auto Background Sync', desc: 'Sync when WiFi detected', toggle: autoSync, onToggle: () => setAutoSync(!autoSync), icon: '🔄' },
      ],
    },
    {
      group: 'ENTERPRISE',
      items: [
        { label: 'Team Sync', desc: 'West Africa Survey Unit · 8 members', nav: true, icon: '👥' },
        { label: 'Export Permissions', desc: 'Team lead access granted', nav: true, icon: '🔐' },
        { label: 'API Integration', desc: 'ArcGIS Enterprise · Connected', nav: true, icon: '🔗' },
      ],
    },
  ]

  return (
    <div className="absolute inset-0 flex flex-col no-scrollbar" style={{ background: '#0F1217', overflowY: 'auto' }}>
      {/* Profile header */}
      <div
        className="mx-4 mt-2 mb-4 rounded-3xl p-5"
        style={{ background: 'linear-gradient(145deg, #181C24, #1E2330)', border: '1px solid rgba(212,175,55,0.15)' }}
      >
        <div className="flex items-center gap-4 mb-4">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center font-display font-bold text-2xl flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #C58B2B, #D4AF37)', color: '#0F1217', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            KO
          </div>
          <div>
            <div className="font-display font-bold text-base" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
              Dr. K. Osei
            </div>
            <div className="font-mono text-[10px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
              Lead Exploration Geologist
            </div>
            <div className="font-mono text-[9px]" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>
              Barrick Mining Corp
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          {[
            { label: 'SCANS', value: '247' },
            { label: 'MINERALS', value: '31' },
            { label: 'TEAM', value: '8' },
          ].map((s) => (
            <div key={s.label} className="flex-1 text-center rounded-xl py-2" style={{ background: 'rgba(15,18,23,0.5)' }}>
              <div className="font-display font-bold text-lg" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#D4AF37' }}>{s.value}</div>
              <div className="font-mono text-[8px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Storage gauge */}
      <div className="mx-4 mb-4 rounded-2xl px-4 py-4" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px]" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
            LOCAL STORAGE
          </span>
          <span className="font-mono text-[9px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
            3.2 GB / 5.0 GB
          </span>
        </div>
        <div className="h-2 rounded-full overflow-hidden" style={{ background: '#252B3A' }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${storageUsed}%`,
              background: 'linear-gradient(90deg, #C58B2B, #D4AF37)',
            }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="font-mono text-[8px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
            {storageUsed}% used
          </span>
          <span className="font-mono text-[8px]" style={{ color: '#00C853', fontFamily: "'JetBrains Mono', monospace" }}>
            128 SCANS BUFFERED
          </span>
        </div>
      </div>

      {/* Settings groups */}
      {settings.map((group) => (
        <div key={group.group} className="mx-4 mb-4">
          <div className="font-mono text-[9px] mb-2 px-1" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}>
            {group.group}
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid #1E2330' }}>
            {group.items.map((item, i) => (
              <div
                key={item.label}
                className="flex items-center gap-3 px-4 py-3"
                style={{
                  background: '#181C24',
                  borderBottom: i < group.items.length - 1 ? '1px solid #1E2330' : 'none',
                }}
              >
                <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
                <div className="flex-1">
                  <div className="font-display text-sm font-medium" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
                    {item.label}
                  </div>
                  <div className="font-mono text-[9px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
                    {item.desc}
                  </div>
                </div>
                {'toggle' in item && item.onToggle ? (
                  <button
                    onClick={item.onToggle}
                    className="w-10 h-5 rounded-full transition-all relative flex-shrink-0"
                    style={{ background: item.toggle ? '#D4AF37' : '#252B3A' }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full transition-all"
                      style={{ background: '#F8FAFC', left: item.toggle ? '22px' : '2px' }}
                    />
                  </button>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Sign out */}
      <div className="mx-4 mb-2">
        <button
          className="w-full py-3.5 rounded-2xl font-display font-semibold text-sm transition-all active:scale-95"
          style={{ fontFamily: "'Space Grotesk', sans-serif", background: 'rgba(230,81,0,0.08)', color: '#E65100', border: '1px solid rgba(230,81,0,0.2)' }}
          onClick={() => navigate('pin')}
        >
          Lock Field Session
        </button>
      </div>

      {/* App info */}
      <div className="mx-4 mb-24 text-center">
        <div className="font-mono text-[8px]" style={{ color: '#252B3A', fontFamily: "'JetBrains Mono', monospace" }}>
          OTZAR v2.4.1 · BUILD 2026.08 · NEURAL ENGINE v4.2 · AES-256 ENCRYPTED
        </div>
      </div>
    </div>
  )
}
