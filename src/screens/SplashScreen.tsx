import { useEffect, useState } from 'react'
import type { ScreenProps } from '../types'

const steps = [
  'Initializing Neural Engine...',
  'Calibrating GPS Receiver...',
  'Loading Mineral Database...',
  'Engaging Offline Vault...',
  'System Ready.',
]

export default function SplashScreen({ navigate }: ScreenProps) {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => Math.min(s + 1, steps.length - 1))
      setProgress((p) => Math.min(p + 22, 100))
    }, 500)
    const timer = setTimeout(() => navigate('onboarding'), 3200)
    return () => { clearInterval(interval); clearTimeout(timer) }
  }, [navigate])

  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ background: 'radial-gradient(ellipse at center, #181C24 0%, #0F1217 70%)' }}
    >
      {/* Crystal logo mark */}
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
        <div className="absolute inset-0 animate-pulse-ring rounded-full" style={{ border: '1px solid rgba(212,175,55,0.3)' }} />
        <div className="absolute inset-4 animate-pulse-ring rounded-full" style={{ border: '1px solid rgba(212,175,55,0.2)', animationDelay: '0.5s' }} />

        {/* Outer ring */}
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" stroke="rgba(212,175,55,0.15)" strokeWidth="1" />
          {[0,45,90,135,180,225,270,315].map((deg) => (
            <line
              key={deg}
              x1="64" y1="4"
              x2="64" y2="12"
              stroke="rgba(212,175,55,0.4)"
              strokeWidth="1.5"
              transform={`rotate(${deg} 64 64)`}
            />
          ))}
        </svg>

        {/* Inner ring */}
        <svg className="absolute inset-6 animate-spin-rev" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="36" stroke="rgba(0,229,255,0.2)" strokeWidth="1" strokeDasharray="4 6" />
        </svg>

        {/* Crystal hexagon */}
        <svg className="animate-crystal" width="48" height="52" viewBox="0 0 48 52" fill="none">
          <polygon
            points="24,1 47,13.5 47,38.5 24,51 1,38.5 1,13.5"
            fill="rgba(212,175,55,0.08)"
            stroke="#D4AF37"
            strokeWidth="1.5"
          />
          <polygon
            points="24,11 37,18.5 37,33.5 24,41 11,33.5 11,18.5"
            fill="rgba(212,175,55,0.12)"
            stroke="rgba(212,175,55,0.5)"
            strokeWidth="1"
          />
          <line x1="24" y1="1" x2="24" y2="51" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />
          <line x1="1" y1="13.5" x2="47" y2="38.5" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />
          <line x1="47" y1="13.5" x2="1" y2="38.5" stroke="rgba(212,175,55,0.15)" strokeWidth="0.5" />
        </svg>
      </div>

      {/* Wordmark */}
      <div className="font-display mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 36, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em' }}>
        OTZAR
      </div>
      <div className="font-mono text-[10px] mb-10" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.3em' }}>
        GEOLOGICAL INTELLIGENCE SYSTEM
      </div>

      {/* Status text */}
      <div className="mb-4 h-4 font-mono text-[11px]" style={{ color: '#00E5FF', fontFamily: "'JetBrains Mono', monospace" }}>
        {steps[step]}<span className="animate-blink">_</span>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-0.5 rounded-full overflow-hidden" style={{ background: '#1E2330' }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #C58B2B, #D4AF37)' }}
        />
      </div>

      {/* Version */}
      <div className="absolute bottom-8 font-mono text-[9px]" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
        v2.4.1 · BUILD 2024.08 · OFFLINE READY
      </div>
    </div>
  )
}
