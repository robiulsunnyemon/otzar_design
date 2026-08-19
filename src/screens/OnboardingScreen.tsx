import { useState } from 'react'
import type { ScreenProps } from '../types'

const slides = [
  {
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" stroke="rgba(212,175,55,0.2)" strokeWidth="1" />
        <rect x="18" y="24" width="36" height="26" rx="3" fill="rgba(212,175,55,0.08)" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx="36" cy="37" r="8" fill="rgba(212,175,55,0.15)" stroke="#D4AF37" strokeWidth="1.5" />
        <circle cx="36" cy="37" r="3" fill="#D4AF37" />
        <rect x="33" y="24" width="6" height="5" rx="1" fill="#D4AF37" />
        <line x1="24" y1="37" x2="28" y2="37" stroke="rgba(212,175,55,0.6)" strokeWidth="1" />
        <line x1="44" y1="37" x2="48" y2="37" stroke="rgba(212,175,55,0.6)" strokeWidth="1" />
        <line x1="36" y1="29" x2="36" y2="31" stroke="rgba(212,175,55,0.6)" strokeWidth="1" />
        <line x1="36" y1="43" x2="36" y2="45" stroke="rgba(212,175,55,0.6)" strokeWidth="1" />
      </svg>
    ),
    tag: 'AI VISION CORE',
    title: 'Sub-Second Mineral Identification',
    desc: 'Point. Capture. Identify. Our on-device neural engine analyzes luster, cleavage, and crystal structure from multi-angle fracture scans — no network required.',
  },
  {
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" stroke="rgba(0,229,255,0.2)" strokeWidth="1" />
        <rect x="22" y="18" width="28" height="36" rx="4" fill="rgba(0,229,255,0.06)" stroke="#00E5FF" strokeWidth="1.5" />
        <rect x="26" y="24" width="20" height="3" rx="1" fill="rgba(0,229,255,0.4)" />
        <rect x="26" y="30" width="14" height="2" rx="1" fill="rgba(0,229,255,0.25)" />
        <rect x="26" y="35" width="17" height="2" rx="1" fill="rgba(0,229,255,0.25)" />
        <rect x="26" y="40" width="11" height="2" rx="1" fill="rgba(0,229,255,0.25)" />
        <circle cx="50" cy="50" r="10" fill="#0F1217" stroke="#00E5FF" strokeWidth="1.5" />
        <path d="M46 50l3 3 5-5" stroke="#00C853" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    tag: 'OFFLINE RESILIENCE',
    title: 'Zero-Network Field Logging',
    desc: 'Every scan, coordinate, and field note is encrypted locally and queued for smart sync when connectivity is restored. Work anywhere — Atacama, Pilbara, Copperbelt.',
  },
  {
    icon: (
      <svg width="72" height="72" viewBox="0 0 72 72" fill="none">
        <circle cx="36" cy="36" r="34" stroke="rgba(0,200,83,0.2)" strokeWidth="1" />
        <rect x="14" y="20" width="44" height="32" rx="3" fill="rgba(0,200,83,0.06)" stroke="#00C853" strokeWidth="1.5" />
        <ellipse cx="36" cy="36" rx="10" ry="6" fill="rgba(0,200,83,0.15)" stroke="rgba(0,200,83,0.5)" strokeWidth="1" />
        <circle cx="28" cy="30" r="2" fill="#D4AF37" />
        <circle cx="42" cy="38" r="2" fill="#D4AF37" />
        <circle cx="35" cy="33" r="1.5" fill="#00C853" />
        <path d="M14 36 Q36 24 58 36" stroke="rgba(0,200,83,0.3)" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M14 36 Q36 48 58 36" stroke="rgba(0,200,83,0.3)" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    ),
    tag: 'GIS VAULT',
    title: 'Private Encrypted Claim Mapping',
    desc: 'Plot every discovery on an AES-256 encrypted topographic GIS map. Define exploration polygon boundaries, generate KML exports, and protect your mineral intelligence.',
  },
]

export default function OnboardingScreen({ navigate }: ScreenProps) {
  const [current, setCurrent] = useState(0)

  const next = () => {
    if (current < slides.length - 1) setCurrent(current + 1)
    else navigate('pin')
  }

  const slide = slides[current]

  return (
    <div className="absolute inset-0 flex flex-col" style={{ background: '#0F1217' }}>
      {/* Skip */}
      <div className="flex justify-end px-6 pt-2 pb-4">
        <button
          onClick={() => navigate('pin')}
          className="font-mono text-[11px] font-medium"
          style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}
        >
          SKIP →
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center px-8" key={current} style={{ animation: 'fade-in 0.35s ease-out' }}>
        {/* Illustration */}
        <div className="flex items-center justify-center mb-8 relative">
          <div className="absolute w-48 h-48 rounded-full" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.04) 0%, transparent 70%)' }} />
          {slide.icon}
        </div>

        {/* Tag */}
        <div
          className="font-mono text-[10px] font-medium mb-3 px-3 py-1 rounded"
          style={{ color: '#D4AF37', background: 'rgba(212,175,55,0.1)', border: '1px solid rgba(212,175,55,0.2)', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em' }}
        >
          {slide.tag}
        </div>

        {/* Title */}
        <h2
          className="font-display text-center mb-4 leading-tight"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: '#F8FAFC' }}
        >
          {slide.title}
        </h2>

        {/* Description */}
        <p className="text-center text-sm leading-relaxed" style={{ color: '#8B929E', maxWidth: 280 }}>
          {slide.desc}
        </p>
      </div>

      {/* Dots */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="rounded-full transition-all"
            style={{
              width: i === current ? 20 : 6,
              height: 6,
              background: i === current ? '#D4AF37' : '#1E2330',
            }}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="px-6 pb-10">
        <button
          onClick={next}
          className="w-full py-4 rounded-2xl font-display font-semibold text-base transition-all active:scale-95"
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            background: 'linear-gradient(135deg, #C58B2B, #D4AF37)',
            color: '#0F1217',
            fontSize: 16,
            letterSpacing: '0.02em',
            boxShadow: '0 4px 20px rgba(212,175,55,0.25)',
          }}
        >
          {current < slides.length - 1 ? 'Continue' : 'Access Field System'}
        </button>
      </div>
    </div>
  )
}
