import { useEffect, useState } from 'react'
import type { ScreenProps } from '../types'

const stream = [
  'Initializing CNN Model v4.2...',
  'Extracting color histogram...',
  'Analyzing crystal luster → Vitreous',
  'Measuring cleavage angles → 75° perfect',
  'Detecting surface reflectance...',
  'Cross-referencing 12,847 mineral records...',
  'Calculating Mohs probability range: 3.5–4',
  'Carbonate group confirmed → High probability',
  'Checking copper ion spectral signature...',
  'Confidence threshold reached: 86.4%',
]

export default function ProcessingScreen({ navigate }: ScreenProps) {
  const [lines, setLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < stream.length) {
        setLines((l) => [...l, stream[i]])
        setProgress(Math.round(((i + 1) / stream.length) * 100))
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => navigate('result'), 600)
      }
    }, 280)
    return () => clearInterval(interval)
  }, [navigate])

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ background: '#0F1217' }}>
      {/* Central animation */}
      <div className="relative w-48 h-48 mb-6 flex items-center justify-center">
        {/* Outer rotating ring */}
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 192 192" fill="none">
          <circle cx="96" cy="96" r="90" stroke="rgba(0,229,255,0.1)" strokeWidth="1" />
          <circle cx="96" cy="96" r="90" stroke="rgba(0,229,255,0.4)" strokeWidth="1.5"
            strokeDasharray="30 450" strokeLinecap="round" />
        </svg>

        {/* Inner reverse ring */}
        <svg className="absolute inset-6 animate-spin-rev" viewBox="0 0 144 144" fill="none">
          <circle cx="72" cy="72" r="66" stroke="rgba(212,175,55,0.2)" strokeWidth="1" strokeDasharray="8 12" />
        </svg>

        {/* Scan line */}
        <div className="absolute inset-12 overflow-hidden rounded-full">
          <div
            className="w-full h-0.5 animate-scan-line"
            style={{ background: 'linear-gradient(90deg, transparent, #00E5FF, transparent)', boxShadow: '0 0 8px rgba(0,229,255,0.6)' }}
          />
        </div>

        {/* Center mineral silhouette */}
        <div className="absolute inset-12 flex items-center justify-center">
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <polygon points="24,4 44,14 44,34 24,44 4,34 4,14" fill="rgba(0,200,83,0.1)" stroke="rgba(0,200,83,0.4)" strokeWidth="1" />
            <polygon points="24,12 36,18 36,30 24,36 12,30 12,18" fill="rgba(0,200,83,0.15)" stroke="rgba(0,200,83,0.3)" strokeWidth="0.5" />
            <line x1="24" y1="4" x2="24" y2="44" stroke="rgba(0,200,83,0.2)" strokeWidth="0.5" />
            <line x1="4" y1="14" x2="44" y2="34" stroke="rgba(0,200,83,0.2)" strokeWidth="0.5" />
            <line x1="44" y1="14" x2="4" y2="34" stroke="rgba(0,200,83,0.2)" strokeWidth="0.5" />
          </svg>
        </div>
      </div>

      {/* Label */}
      <div className="font-display text-sm font-semibold mb-2" style={{ fontFamily: "'Space Grotesk', sans-serif", color: '#F8FAFC' }}>
        Neural Analysis in Progress
      </div>
      <div className="font-mono text-[10px] mb-6" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
        ON-DEVICE INFERENCE · OFFLINE MODE
      </div>

      {/* Progress bar */}
      <div className="w-56 mb-6">
        <div className="flex justify-between mb-1">
          <span className="font-mono text-[9px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>INFERENCE</span>
          <span className="font-mono text-[9px]" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>{progress}%</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: '#1E2330' }}>
          <div
            className="h-full rounded-full transition-all duration-300"
            style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #C58B2B, #D4AF37, #00E5FF)' }}
          />
        </div>
      </div>

      {/* Text stream */}
      <div
        className="w-72 rounded-2xl p-4 overflow-hidden"
        style={{ background: '#181C24', border: '1px solid #1E2330', maxHeight: 200, overflowY: 'hidden' }}
      >
        <div className="font-mono text-[9px] mb-2 flex items-center gap-1.5" style={{ color: '#00E5FF', fontFamily: "'JetBrains Mono', monospace" }}>
          <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#00C853' }} />
          INFERENCE ENGINE OUTPUT
        </div>
        <div className="flex flex-col gap-1 no-scrollbar">
          {lines.map((line, i) => (
            <div
              key={i}
              className="font-mono text-[9px] animate-fade-in"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: i === lines.length - 1 ? '#D4AF37' : '#4B5563',
              }}
            >
              {'>'} {line}
            </div>
          ))}
          <span className="animate-blink font-mono text-[9px]" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>_</span>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex gap-2 mt-6">
        {['Capture', 'Analyze', 'Identify', 'Log'].map((s, i) => (
          <div key={s} className="flex items-center gap-1">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center font-mono text-[8px]"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: i <= 1 ? '#D4AF37' : '#1E2330',
                color: i <= 1 ? '#0F1217' : '#4B5563',
              }}
            >
              {i < 1 ? '✓' : i === 1 ? '●' : i + 1}
            </div>
            {i < 3 && <div className="w-6 h-px" style={{ background: i < 1 ? '#D4AF37' : '#1E2330' }} />}
          </div>
        ))}
      </div>
    </div>
  )
}
