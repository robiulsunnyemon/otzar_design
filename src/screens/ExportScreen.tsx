import { useState } from 'react'
import type { ScreenProps } from '../types'

const formats = [
  {
    id: 'pdf',
    name: 'PDF Field Report',
    desc: 'Complete geological summary with photos, maps & analysis',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#E65100" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /><polyline points="10 9 9 9 8 9" />
      </svg>
    ),
    color: '#E65100',
    size: '2.4 MB',
  },
  {
    id: 'kml',
    name: 'KML / Shapefile',
    desc: 'ArcGIS & Google Earth compatible geospatial export',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00C853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
      </svg>
    ),
    color: '#00C853',
    size: '0.8 MB',
  },
  {
    id: 'csv',
    name: 'CSV Dataset',
    desc: 'Raw tabular data for Excel, QGIS & lab analysis',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M3 15h18M9 3v18" />
      </svg>
    ),
    color: '#00E5FF',
    size: '48 KB',
  },
  {
    id: 'json',
    name: 'GeoJSON Export',
    desc: 'Open-standard geospatial format for web & custom GIS',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
      </svg>
    ),
    color: '#D4AF37',
    size: '112 KB',
  },
]

export default function ExportScreen({ navigate: _navigate }: ScreenProps) {
  const [selected, setSelected] = useState<string[]>(['pdf', 'kml'])
  const [dateRange, setDateRange] = useState('7d')
  const [exporting, setExporting] = useState(false)

  const toggle = (id: string) => setSelected((s) => s.includes(id) ? s.filter((x) => x !== id) : [...s, id])

  const handleExport = () => {
    setExporting(true)
    setTimeout(() => setExporting(false), 2000)
  }

  return (
    <div className="absolute inset-0 flex flex-col no-scrollbar" style={{ background: '#0F1217', overflowY: 'auto' }}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3 flex items-center justify-between">
        <div className="font-display text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
          Export Hub
        </div>
        <div className="font-mono text-[9px]" style={{ color: '#00C853', fontFamily: "'JetBrains Mono', monospace" }}>
          6 SPECIMENS
        </div>
      </div>

      {/* Report preview card */}
      <div
        className="mx-4 mb-4 rounded-3xl p-5 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, #181C24, #1E2330)', border: '1px solid rgba(212,175,55,0.15)' }}
      >
        <div className="absolute animate-shimmer inset-0 rounded-3xl pointer-events-none" />
        <div className="font-mono text-[10px] mb-2" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.12em' }}>
          OTZAR FIELD REPORT
        </div>
        <div className="font-display text-base font-bold mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
          Zambia Copperbelt Survey
        </div>
        <div className="font-mono text-[9px] mb-4" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
          Dr. K. Osei · West Africa Survey Unit · Aug 2026
        </div>
        <div className="flex gap-4 text-center">
          {[
            { n: '6', l: 'Specimens' },
            { n: '4', l: 'Minerals' },
            { n: '3', l: 'Locations' },
            { n: '91%', l: 'Avg Conf.' },
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display font-bold text-base" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#D4AF37' }}>{s.n}</div>
              <div className="font-mono text-[8px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Date range */}
      <div className="mx-4 mb-4">
        <div className="font-mono text-[10px] mb-2" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          DATE RANGE
        </div>
        <div className="flex gap-2">
          {['24h', '7d', '30d', 'All'].map((r) => (
            <button
              key={r}
              onClick={() => setDateRange(r)}
              className="flex-1 py-2 rounded-xl font-mono text-[10px] transition-all"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: dateRange === r ? '#D4AF37' : '#181C24',
                color: dateRange === r ? '#0F1217' : '#8B929E',
                border: `1px solid ${dateRange === r ? '#D4AF37' : '#1E2330'}`,
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Format selection */}
      <div className="mx-4 mb-4">
        <div className="font-mono text-[10px] mb-3" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          EXPORT FORMATS
        </div>
        <div className="flex flex-col gap-2">
          {formats.map((f) => (
            <button
              key={f.id}
              onClick={() => toggle(f.id)}
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all"
              style={{
                background: selected.includes(f.id) ? `${f.color}08` : '#181C24',
                border: `1px solid ${selected.includes(f.id) ? `${f.color}30` : '#1E2330'}`,
              }}
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: `${f.color}12` }}
              >
                {f.icon}
              </div>
              <div className="flex-1">
                <div className="font-display font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
                  {f.name}
                </div>
                <div className="font-mono text-[9px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
                  {f.desc}
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <div
                  className="w-5 h-5 rounded flex items-center justify-center"
                  style={{
                    background: selected.includes(f.id) ? f.color : 'transparent',
                    border: `1.5px solid ${selected.includes(f.id) ? f.color : '#252B3A'}`,
                  }}
                >
                  {selected.includes(f.id) && (
                    <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6l3 3 5-5" stroke="#0F1217" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
                <span className="font-mono text-[8px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>{f.size}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Export button */}
      <div className="mx-4 mb-8">
        <button
          onClick={handleExport}
          disabled={selected.length === 0}
          className="w-full py-4 rounded-2xl font-display font-semibold text-base transition-all active:scale-95"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: selected.length === 0 ? '#181C24' : 'linear-gradient(135deg, #C58B2B, #D4AF37)',
            color: selected.length === 0 ? '#4B5563' : '#0F1217',
            boxShadow: selected.length > 0 ? '0 4px 20px rgba(212,175,55,0.25)' : 'none',
          }}
        >
          {exporting
            ? 'Generating Report...'
            : `Export ${selected.length} Format${selected.length !== 1 ? 's' : ''}`
          }
        </button>
      </div>
    </div>
  )
}
