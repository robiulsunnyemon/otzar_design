import { useState } from 'react'
import type { ScreenProps } from '../types'

const specimens = [
  { name: 'Malachite', formula: 'Cu₂CO₃(OH)₂', conf: 96, grade: 'Specimen', date: 'Aug 18', color: '#00C853', synced: true, loc: 'Vein #4' },
  { name: 'Chalcopyrite', formula: 'CuFeS₂', conf: 91, grade: 'Ore', date: 'Aug 18', color: '#D4AF37', synced: true, loc: 'Outcrop B' },
  { name: 'Pyrite', formula: 'FeS₂', conf: 78, grade: 'Industrial', date: 'Aug 18', color: '#FF9100', synced: false, loc: 'Riverbed' },
  { name: 'Hematite', formula: 'Fe₂O₃', conf: 88, grade: 'Ore', date: 'Aug 17', color: '#E65100', synced: true, loc: 'Cut #2' },
  { name: 'Quartz', formula: 'SiO₂', conf: 99, grade: 'Industrial', date: 'Aug 17', color: '#00E5FF', synced: true, loc: 'Vein #1' },
  { name: 'Azurite', formula: 'Cu₃(CO₃)₂(OH)₂', conf: 82, grade: 'Specimen', date: 'Aug 16', color: '#6366f1', synced: false, loc: 'Vein #4' },
]

export default function CatalogScreen({ navigate }: ScreenProps) {
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card')
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')

  const filters = ['All', 'Synced', 'Pending', 'Specimen', 'Ore']

  const filtered = specimens.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.formula.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' ? true :
      filter === 'Synced' ? s.synced :
      filter === 'Pending' ? !s.synced :
      filter === s.grade
    return matchSearch && matchFilter
  })

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#0F1217' }}>
      {/* Header */}
      <div className="px-5 pt-2 pb-3 flex items-center justify-between">
        <div className="font-display text-lg font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
          Discovery Vault
        </div>
        <div className="flex gap-1">
          {(['card', 'list'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setViewMode(m)}
              className="w-9 h-9 rounded-xl flex items-center justify-center transition-all"
              style={{ background: viewMode === m ? 'rgba(212,175,55,0.15)' : '#181C24', border: `1px solid ${viewMode === m ? 'rgba(212,175,55,0.3)' : '#1E2330'}` }}
            >
              {m === 'card'
                ? <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="0" y="0" width="6" height="6" rx="1" fill={viewMode === 'card' ? '#D4AF37' : '#8B929E'} /><rect x="10" y="0" width="6" height="6" rx="1" fill={viewMode === 'card' ? '#D4AF37' : '#8B929E'} /><rect x="0" y="10" width="6" height="6" rx="1" fill={viewMode === 'card' ? '#D4AF37' : '#8B929E'} /><rect x="10" y="10" width="6" height="6" rx="1" fill={viewMode === 'card' ? '#D4AF37' : '#8B929E'} /></svg>
                : <svg width="14" height="14" viewBox="0 0 16 16" fill="none"><rect x="0" y="1" width="16" height="2" rx="1" fill={viewMode === 'list' ? '#D4AF37' : '#8B929E'} /><rect x="0" y="7" width="16" height="2" rx="1" fill={viewMode === 'list' ? '#D4AF37' : '#8B929E'} /><rect x="0" y="13" width="16" height="2" rx="1" fill={viewMode === 'list' ? '#D4AF37' : '#8B929E'} /></svg>
              }
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="mx-4 mb-3">
        <div className="relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round">
            <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search minerals, formulas..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-3 rounded-2xl text-sm outline-none"
            style={{ background: '#181C24', border: '1px solid #1E2330', color: '#F8FAFC', fontFamily: "'Inter', sans-serif" }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 px-4 mb-4 overflow-x-auto no-scrollbar pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className="px-4 py-1.5 rounded-xl font-mono text-[10px] flex-shrink-0 transition-all"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: filter === f ? '#D4AF37' : '#181C24',
              color: filter === f ? '#0F1217' : '#8B929E',
              border: `1px solid ${filter === f ? '#D4AF37' : '#1E2330'}`,
            }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Specimen count */}
      <div className="px-4 mb-3 flex items-center justify-between">
        <span className="font-mono text-[9px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
          {filtered.length} SPECIMENS FOUND
        </span>
        <span className="font-mono text-[9px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
          SORTED: DATE DESC
        </span>
      </div>

      {/* Specimens */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 pb-24">
        {viewMode === 'card' ? (
          <div className="grid grid-cols-2 gap-3">
            {filtered.map((s) => (
              <button
                key={s.name}
                onClick={() => navigate('result')}
                className="rounded-2xl p-4 text-left transition-all active:scale-95"
                style={{ background: '#181C24', border: '1px solid #1E2330' }}
              >
                {/* Color strip */}
                <div className="w-full h-12 rounded-xl mb-3 flex items-center justify-center" style={{ background: `${s.color}12`, border: `1px solid ${s.color}30` }}>
                  <svg width="24" height="28" viewBox="0 0 24 28" fill="none">
                    <polygon points="12,1 23,7 23,21 12,27 1,21 1,7" fill={`${s.color}20`} stroke={s.color} strokeWidth="1.5" />
                    <polygon points="12,7 18,10.5 18,17.5 12,21 6,17.5 6,10.5" fill={`${s.color}30`} stroke={`${s.color}50`} strokeWidth="1" />
                  </svg>
                </div>
                <div className="font-display font-semibold text-sm mb-0.5" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
                  {s.name}
                </div>
                <div className="font-mono text-[8px] mb-2" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
                  {s.formula}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px]" style={{ color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>
                    {s.conf}%
                  </span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.synced ? '#00C853' : '#E65100' }} />
                </div>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {filtered.map((s) => (
              <button
                key={s.name}
                onClick={() => navigate('result')}
                className="flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all active:scale-98"
                style={{ background: '#181C24', border: '1px solid #1E2330' }}
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: `${s.color}14` }}>
                  <div className="w-3 h-3 rounded-sm" style={{ background: s.color }} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-semibold text-sm" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>{s.name}</span>
                    <span className="font-mono text-[8px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>{s.formula}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="font-mono text-[9px]" style={{ color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>{s.conf}%</span>
                    <span className="font-mono text-[8px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>· {s.loc} · {s.date}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="font-mono text-[8px] px-1.5 py-0.5 rounded" style={{ color: '#8B929E', background: '#252B3A', fontFamily: "'JetBrains Mono', monospace" }}>{s.grade}</span>
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: s.synced ? '#00C853' : '#E65100' }} />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
