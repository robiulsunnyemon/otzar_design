import { useState } from 'react'
import type { ScreenProps } from '../types'

const tags = ['Vein #4', 'Outcrop', 'Riverbed', 'High-Grade', 'Near Surface', 'Oxide Zone']

const bars = [3, 7, 12, 8, 15, 10, 6, 14, 9, 11, 5, 8, 13, 7, 4, 16, 11, 8, 6, 9, 14, 10, 7, 12]

export default function LoggingScreen({ navigate }: ScreenProps) {
  const [selectedTags, setSelectedTags] = useState(['Vein #4', 'High-Grade'])
  const [notes, setNotes] = useState('')
  const [recording, setRecording] = useState(false)

  const toggleTag = (t: string) => {
    setSelectedTags((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t])
  }

  return (
    <div className="absolute inset-0 flex flex-col no-scrollbar" style={{ background: '#0F1217', overflowY: 'auto' }}>
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3">
        <button onClick={() => navigate('result')} style={{ color: '#8B929E' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <span className="font-mono text-[10px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          DISCOVERY LOG
        </span>
        <button style={{ color: '#D4AF37' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" /><path d="M17 21v-8H7v8M7 3v5h8" />
          </svg>
        </button>
      </div>

      {/* Photo gallery */}
      <div className="mx-4 mb-4">
        <div className="font-mono text-[10px] mb-2" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          SPECIMEN PHOTOS (3)
        </div>
        <div className="flex gap-2">
          {[
            { bg: 'linear-gradient(145deg, #1a4a2e, #0d2a1a)', label: 'Top view' },
            { bg: 'linear-gradient(145deg, #1e3a4a, #0d1e2a)', label: 'Fracture' },
            { bg: 'linear-gradient(145deg, #2e2a1a, #1a1808)', label: 'Texture' },
          ].map((ph) => (
            <div
              key={ph.label}
              className="flex-1 h-20 rounded-2xl relative overflow-hidden"
              style={{ background: ph.bg, border: '1px solid #1E2330' }}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 32 32" fill="none">
                  <polygon points="16,3 29,9.5 29,22.5 16,29 3,22.5 3,9.5" fill="rgba(0,200,83,0.3)" stroke="rgba(0,200,83,0.5)" strokeWidth="1" />
                  <polygon points="16,9 23,12.5 23,19.5 16,23 9,19.5 9,12.5" fill="rgba(0,200,83,0.4)" stroke="rgba(0,200,83,0.3)" strokeWidth="0.5" />
                </svg>
              </div>
              <div className="absolute bottom-1 left-2 font-mono text-[7px]" style={{ color: 'rgba(248,250,252,0.5)', fontFamily: "'JetBrains Mono', monospace" }}>
                {ph.label}
              </div>
            </div>
          ))}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: '#181C24', border: '1px dashed #252B3A' }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </div>
        </div>
      </div>

      {/* GPS metadata */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
        <div className="font-mono text-[10px] mb-3" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          AUTO-CAPTURED METADATA
        </div>
        <div className="grid grid-cols-2 gap-y-2 gap-x-4">
          {[
            { label: 'LAT', value: '-12.9783°S' },
            { label: 'LON', value: '028.6234°E' },
            { label: 'ALTITUDE', value: '1,247m ASL' },
            { label: 'GPS ERROR', value: '±2.8m' },
            { label: 'TIMESTAMP', value: '14:32:07 UTC' },
            { label: 'DATE', value: '18 Aug 2026' },
            { label: 'WEATHER', value: 'Partly Cloudy' },
            { label: 'TEMP', value: '31°C / 88°F' },
          ].map((item) => (
            <div key={item.label} className="flex items-baseline gap-2">
              <span className="font-mono text-[8px] w-16 flex-shrink-0" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>{item.label}</span>
              <span className="font-mono text-[9px]" style={{ color: '#F8FAFC', fontFamily: "'JetBrains Mono', monospace" }}>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Voice memo */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[10px]" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
            VOICE FIELD NOTE
          </span>
          <span className="font-mono text-[9px]" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
            {recording ? '00:04 REC' : '00:00'}
          </span>
        </div>

        {/* Waveform */}
        <div className="flex items-center gap-0.5 h-8 mb-3">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm origin-center"
              style={{
                height: recording ? `${h}px` : '3px',
                background: recording ? (i < 12 ? '#D4AF37' : '#252B3A') : '#252B3A',
                animation: recording ? `waveform ${0.3 + (i % 5) * 0.1}s ease-in-out infinite alternate` : 'none',
                transition: 'height 0.3s',
              }}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setRecording(!recording)}
            className="w-12 h-12 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: recording ? 'rgba(230,81,0,0.2)' : 'rgba(212,175,55,0.1)',
              border: `1px solid ${recording ? '#E65100' : 'rgba(212,175,55,0.3)'}`,
            }}
          >
            {recording
              ? <div className="w-4 h-4 rounded" style={{ background: '#E65100' }} />
              : <div className="w-4 h-4 rounded-full" style={{ background: '#D4AF37' }} />
            }
          </button>
          <div className="flex-1">
            <div className="font-mono text-[9px] mb-1" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
              TRANSCRIPTION
            </div>
            <div className="text-xs" style={{ color: recording ? '#F8FAFC' : '#4B5563' }}>
              {recording ? (
                <span>"Visible malachite azurite contact zone, strong effervescence with HCl, approx 15cm vein width..."<span className="animate-blink">|</span></span>
              ) : (
                "Tap to record voice note"
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Text note */}
      <div className="mx-4 mb-4">
        <div className="font-mono text-[10px] mb-2" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          FIELD NOTES
        </div>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Add field observations..."
          rows={3}
          className="w-full rounded-2xl px-4 py-3 text-sm resize-none outline-none"
          style={{
            background: '#181C24',
            border: '1px solid #1E2330',
            color: '#F8FAFC',
            fontFamily: "'Inter', sans-serif",
          }}
        />
      </div>

      {/* Tags */}
      <div className="mx-4 mb-4">
        <div className="font-mono text-[10px] mb-2" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.1em' }}>
          TAGS
        </div>
        <div className="flex flex-wrap gap-2">
          {tags.map((t) => (
            <button
              key={t}
              onClick={() => toggleTag(t)}
              className="px-3 py-1.5 rounded-xl font-mono text-[10px] transition-all"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: selectedTags.includes(t) ? 'rgba(212,175,55,0.15)' : '#181C24',
                color: selectedTags.includes(t) ? '#D4AF37' : '#8B929E',
                border: `1px solid ${selectedTags.includes(t) ? 'rgba(212,175,55,0.4)' : '#1E2330'}`,
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Save */}
      <div className="mx-4 mb-6">
        <button
          onClick={() => navigate('catalog')}
          className="w-full py-4 rounded-2xl font-display font-semibold text-base transition-all active:scale-95"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: 'linear-gradient(135deg, #C58B2B, #D4AF37)',
            color: '#0F1217',
            boxShadow: '0 4px 20px rgba(212,175,55,0.25)',
          }}
        >
          Save Discovery & Pin to Map
        </button>
      </div>
    </div>
  )
}
