import type { ScreenId } from '../types'

interface Props {
  current: ScreenId
  navigate: (s: ScreenId) => void
}

const items: { id: ScreenId; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'Home', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { id: 'catalog', label: 'Vault', icon: 'M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10' },
  { id: 'map', label: 'GIS Map', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' },
  { id: 'sync', label: 'Sync', icon: 'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15' },
  { id: 'profile', label: 'Profile', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

export default function BottomNav({ current, navigate }: Props) {
  return (
    <div
      className="absolute bottom-0 left-0 right-0 z-30 flex items-center justify-around px-2 pt-2 pb-4"
      style={{ background: 'linear-gradient(to top, #0F1217 85%, transparent)', borderTop: '1px solid rgba(30,35,48,0.8)' }}
    >
      {items.map((item) => {
        const active = item.id === current
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.id)}
            className="flex flex-col items-center gap-0.5 py-1 px-3 transition-all"
            style={{ minWidth: 52 }}
          >
            <svg
              width="22" height="22" viewBox="0 0 24 24" fill="none"
              stroke={active ? '#D4AF37' : '#4B5563'}
              strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
            >
              <path d={item.icon} />
            </svg>
            <span
              className="font-mono text-[9px] font-medium"
              style={{ color: active ? '#D4AF37' : '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}
            >
              {item.label}
            </span>
            {active && (
              <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: '#D4AF37' }} />
            )}
          </button>
        )
      })}
    </div>
  )
}
