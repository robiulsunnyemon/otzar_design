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
      {/* Official Crystal Logo Mark */}
      <div className="relative w-36 h-36 mb-6 flex items-center justify-center">
        <div className="absolute inset-0 animate-pulse-ring rounded-full" style={{ border: '1px solid rgba(212,175,55,0.3)' }} />
        <div className="absolute inset-3 animate-pulse-ring rounded-full" style={{ border: '1px solid rgba(212,175,55,0.2)', animationDelay: '0.5s' }} />

        {/* Outer tech ring */}
        <svg className="absolute inset-0 w-full h-full animate-spin-slow" viewBox="0 0 128 128" fill="none">
          <circle cx="64" cy="64" r="60" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
          {[0,45,90,135,180,225,270,315].map((deg) => (
            <line
              key={deg}
              x1="64" y1="4"
              x2="64" y2="12"
              stroke="rgba(212,175,55,0.5)"
              strokeWidth="1.5"
              transform={`rotate(${deg} 64 64)`}
            />
          ))}
        </svg>

        {/* Client's Official Logo Image */}
        <img
          src="/logo.png"
          alt="OTZAR APP Official Logo"
          className="w-24 h-24 object-contain relative z-10 drop-shadow-[0_0_25px_rgba(212,175,55,0.5)] animate-crystal"
        />
      </div>

      {/* Wordmark */}
      <div className="font-display mb-1" style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, color: '#D4AF37', letterSpacing: '0.15em' }}>
        OTZAR APP
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
