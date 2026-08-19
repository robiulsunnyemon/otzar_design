import { useState } from 'react'
import type { ScreenProps } from '../types'

export default function ScannerScreen({ navigate }: ScreenProps) {
  const [mode, setMode] = useState<'single' | 'burst'>('single')
  const [torch, setTorch] = useState(false)
  const [scanning, setScanning] = useState(false)

  const handleCapture = () => {
    setScanning(true)
    setTimeout(() => navigate('processing'), 1200)
  }

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#000' }}>
      {/* Camera viewport */}
      <div className="relative flex-1 overflow-hidden">
        {/* Simulated terrain/rock texture */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(160deg, #1a1408 0%, #0d1108 30%, #0a0d14 60%, #130d08 100%)',
          }}
        />
        {/* Rock texture SVG */}
        <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 390 600" preserveAspectRatio="xMidYMid slice">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="390" height="600" filter="url(#noise)" opacity="0.4" />
          <ellipse cx="195" cy="280" rx="80" ry="60" fill="rgba(180,140,80,0.08)" />
          <ellipse cx="195" cy="280" rx="40" ry="30" fill="rgba(0,200,83,0.06)" />
        </svg>

        {/* Scan line animation */}
        {scanning && (
          <div
            className="absolute left-0 right-0 h-px animate-scan-line z-20 pointer-events-none"
            style={{ background: 'linear-gradient(90deg, transparent, #D4AF37, #00E5FF, #D4AF37, transparent)', boxShadow: '0 0 12px rgba(212,175,55,0.8)' }}
          />
        )}

        {/* HUD overlays — top */}
        <div className="absolute top-0 left-0 right-0 flex justify-between px-4 pt-4 animate-hud-flicker">
          <div className="flex flex-col gap-1">
            <div className="font-mono text-[9px]" style={{ color: '#00E5FF', fontFamily: "'JetBrains Mono', monospace" }}>
              ELV  1,247m
            </div>
            <div className="font-mono text-[9px]" style={{ color: '#00E5FF', fontFamily: "'JetBrains Mono', monospace" }}>
              BRG  N 042°
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="font-mono text-[9px]" style={{ color: '#00E5FF', fontFamily: "'JetBrains Mono', monospace" }}>
              -12.9783°S
            </div>
            <div className="font-mono text-[9px]" style={{ color: '#00E5FF', fontFamily: "'JetBrains Mono', monospace" }}>
              028.6234°E
            </div>
          </div>
        </div>

        {/* Grid lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" viewBox="0 0 390 600">
          <line x1="130" y1="0" x2="130" y2="600" stroke="#00E5FF" strokeWidth="0.5" />
          <line x1="260" y1="0" x2="260" y2="600" stroke="#00E5FF" strokeWidth="0.5" />
          <line x1="0" y1="200" x2="390" y2="200" stroke="#00E5FF" strokeWidth="0.5" />
          <line x1="0" y1="400" x2="390" y2="400" stroke="#00E5FF" strokeWidth="0.5" />
        </svg>

        {/* Central reticle with mineral bounding box */}
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Outer scan frame */}
          <div className="relative w-64 h-56">
            <div className="reticle-corner reticle-corner-tl" style={{ width: 24, height: 24 }} />
            <div className="reticle-corner reticle-corner-tr" style={{ width: 24, height: 24 }} />
            <div className="reticle-corner reticle-corner-bl" style={{ width: 24, height: 24 }} />
            <div className="reticle-corner reticle-corner-br" style={{ width: 24, height: 24 }} />

            {/* Inner mineral detection box */}
            <div className="absolute"
              style={{ top: 40, left: 50, right: 60, bottom: 40, border: '1px dashed rgba(212,175,55,0.5)' }}
            >
              {/* Label */}
              <div
                className="absolute -top-4 left-0 font-mono text-[8px] px-1"
                style={{ color: '#D4AF37', background: 'rgba(212,175,55,0.1)', fontFamily: "'JetBrains Mono', monospace" }}
              >
                MINERAL DETECTED
              </div>
              {/* Center crosshair */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-6 h-px" style={{ background: 'rgba(212,175,55,0.6)' }} />
                <div className="absolute h-6 w-px" style={{ background: 'rgba(212,175,55,0.6)' }} />
                <div className="absolute w-2 h-2 rounded-full" style={{ background: 'rgba(212,175,55,0.3)', border: '1px solid #D4AF37' }} />
              </div>
            </div>

            {/* Center dot */}
            <div className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ background: '#D4AF37' }} />

            {/* Confidence preview */}
            <div
              className="absolute -bottom-6 left-0 right-0 flex justify-center"
            >
              <div className="font-mono text-[9px] px-2 py-0.5 rounded" style={{ color: '#00C853', background: 'rgba(0,200,83,0.1)', fontFamily: "'JetBrains Mono', monospace" }}>
                CARBONATES DETECTED · ANALYZING...
              </div>
            </div>
          </div>
        </div>

        {/* Scale guide */}
        <div
          className="absolute bottom-28 right-4 px-2 py-1.5 rounded-lg"
          style={{ background: 'rgba(15,18,23,0.8)', border: '1px solid rgba(212,175,55,0.2)' }}
        >
          <div className="font-mono text-[8px] mb-1" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
            SCALE REF
          </div>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 rounded-full" style={{ background: 'rgba(212,175,55,0.3)', border: '1px solid #D4AF37' }} />
            <span className="font-mono text-[8px]" style={{ color: '#D4AF37', fontFamily: "'JetBrains Mono', monospace" }}>25mm coin</span>
          </div>
        </div>

        {/* Torch toggle */}
        <button
          onClick={() => setTorch(!torch)}
          className="absolute bottom-28 left-4 w-11 h-11 rounded-full flex items-center justify-center transition-all"
          style={{
            background: torch ? 'rgba(212,175,55,0.2)' : 'rgba(15,18,23,0.8)',
            border: `1px solid ${torch ? '#D4AF37' : 'rgba(212,175,55,0.2)'}`,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={torch ? '#D4AF37' : '#8B929E'} stroke="none">
            <path d="M9 21h6l-3-7-3 7zM12 3a4 4 0 00-4 4c0 1.5.7 2.8 1.8 3.7L9 14h6l-.8-3.3A4 4 0 0016 7a4 4 0 00-4-4z" />
          </svg>
        </button>
      </div>

      {/* Bottom controls */}
      <div className="px-6 py-4" style={{ background: 'rgba(0,0,0,0.9)', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
        {/* Mode toggle */}
        <div className="flex items-center justify-center mb-4">
          <div className="flex rounded-xl p-0.5" style={{ background: '#181C24' }}>
            {(['single', 'burst'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className="px-5 py-2 rounded-lg font-mono text-[10px] font-semibold transition-all"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  background: mode === m ? '#D4AF37' : 'transparent',
                  color: mode === m ? '#0F1217' : '#8B929E',
                  letterSpacing: '0.08em',
                }}
              >
                {m === 'single' ? 'SINGLE SHOT' : 'BURST MODE'}
              </button>
            ))}
          </div>
        </div>

        {/* Capture + back */}
        <div className="flex items-center justify-between">
          <button
            onClick={() => navigate('dashboard')}
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: '#181C24', border: '1px solid #1E2330' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B929E" strokeWidth="2" strokeLinecap="round">
              <path d="M19 12H5M12 5l-7 7 7 7" />
            </svg>
          </button>

          {/* Shutter button */}
          <button
            onClick={handleCapture}
            disabled={scanning}
            className="w-20 h-20 rounded-full flex items-center justify-center transition-all active:scale-90"
            style={{
              background: scanning ? 'rgba(212,175,55,0.3)' : 'transparent',
              border: '3px solid #D4AF37',
              boxShadow: '0 0 20px rgba(212,175,55,0.3)',
            }}
          >
            <div
              className="w-14 h-14 rounded-full"
              style={{
                background: scanning ? 'rgba(212,175,55,0.2)' : '#D4AF37',
                transition: 'all 0.2s',
              }}
            />
          </button>

          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8B929E" strokeWidth="1.5" strokeLinecap="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
