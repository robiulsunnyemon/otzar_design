import { useState } from 'react'
import type { ScreenId } from './types'
import StatusBar from './components/StatusBar'
import BottomNav from './components/BottomNav'
import AccessLockGate from './components/AccessLockGate'
import SplashScreen from './screens/SplashScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import PinScreen from './screens/PinScreen'
import DashboardScreen from './screens/DashboardScreen'
import ScannerScreen from './screens/ScannerScreen'
import ProcessingScreen from './screens/ProcessingScreen'
import ResultScreen from './screens/ResultScreen'
import FieldTestScreen from './screens/FieldTestScreen'
import LoggingScreen from './screens/LoggingScreen'
import CatalogScreen from './screens/CatalogScreen'
import MapScreen from './screens/MapScreen'
import SyncScreen from './screens/SyncScreen'
import ExportScreen from './screens/ExportScreen'
import ProfileScreen from './screens/ProfileScreen'

const mainNav: ScreenId[] = ['dashboard', 'catalog', 'map', 'sync', 'profile']

const screenLabels: Record<ScreenId, string> = {
  splash: '01 Splash', onboarding: '02 Onboarding', pin: '03 Pin Access',
  dashboard: '04 Dashboard', scanner: '05 AI Scanner', processing: '06 Processing HUD',
  result: '07 ID Result', fieldtest: '08 Field Test', logging: '09 Discovery Log',
  catalog: '10 Vault', map: '11 GIS Map', sync: '12 Sync Engine',
  export: '13 Export Hub', profile: '14 Profile',
}

const allScreens: ScreenId[] = [
  'splash', 'onboarding', 'pin', 'dashboard', 'scanner', 'processing',
  'result', 'fieldtest', 'logging', 'catalog', 'map', 'sync', 'export', 'profile',
]

export default function App() {
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('otzar_unlocked') === 'true')
  const [screen, setScreen] = useState<ScreenId>('splash')
  const [navOpen, setNavOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'simulator' | 'grid'>('grid')

  if (!unlocked) {
    return <AccessLockGate onUnlock={() => setUnlocked(true)} />
  }

  const navigate = (s: ScreenId) => { setScreen(s); setNavOpen(false) }
  const showStatusBar = !['splash', 'scanner', 'processing'].includes(screen)
  const showBottomNav = mainNav.includes(screen)

  const renderScreen = (s: ScreenId) => {
    switch (s) {
      case 'splash': return <SplashScreen navigate={navigate} />
      case 'onboarding': return <OnboardingScreen navigate={navigate} />
      case 'pin': return <PinScreen navigate={navigate} />
      case 'dashboard': return <DashboardScreen navigate={navigate} />
      case 'scanner': return <ScannerScreen navigate={navigate} />
      case 'processing': return <ProcessingScreen navigate={navigate} />
      case 'result': return <ResultScreen navigate={navigate} />
      case 'fieldtest': return <FieldTestScreen navigate={navigate} />
      case 'logging': return <LoggingScreen navigate={navigate} />
      case 'catalog': return <CatalogScreen navigate={navigate} />
      case 'map': return <MapScreen navigate={navigate} />
      case 'sync': return <SyncScreen navigate={navigate} />
      case 'export': return <ExportScreen navigate={navigate} />
      case 'profile': return <ProfileScreen navigate={navigate} />
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center p-4 md:p-8"
      style={{ background: '#0A0D12' }}
    >
      {/* View Mode & Screen Selection Header */}
      <div className="w-full max-w-[390px] md:max-w-4xl mb-6 flex flex-wrap items-center justify-between gap-3">
        {/* View Mode Toggle */}
        <div className="flex rounded-xl p-1" style={{ background: '#181C24', border: '1px solid rgba(212,175,55,0.2)' }}>
          <button
            onClick={() => setViewMode('simulator')}
            className="px-4 py-1.5 rounded-lg font-mono text-[10px] font-semibold transition-all"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: viewMode === 'simulator' ? '#D4AF37' : 'transparent',
              color: viewMode === 'simulator' ? '#0F1217' : '#8B929E',
            }}
          >
            📱 SIMULATOR MODE
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className="px-4 py-1.5 rounded-lg font-mono text-[10px] font-semibold transition-all"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: viewMode === 'grid' ? '#D4AF37' : 'transparent',
              color: viewMode === 'grid' ? '#0F1217' : '#8B929E',
            }}
          >
            🎛️ ALL SCREENS GRID (SHOWCASE)
          </button>
        </div>

        {/* Lock Gate Action Button */}
        <button
          onClick={() => {
            sessionStorage.removeItem('otzar_unlocked')
            setUnlocked(false)
          }}
          className="px-3 py-2 rounded-xl font-mono text-[10px] font-semibold transition-all hover:bg-[#FF3B30] hover:text-white flex items-center gap-1.5"
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            background: '#181C24',
            color: '#8B929E',
            border: '1px solid rgba(212,175,55,0.2)',
          }}
        >
          <span>🔒</span> LOCK VAULT
        </button>

        {/* Screen selector for Simulator Mode */}
        {viewMode === 'simulator' && (
          <div className="relative flex-1 max-w-[200px]">
            <button
              onClick={() => setNavOpen(!navOpen)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl font-mono text-[10px] transition-all"
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                background: '#181C24',
                color: '#D4AF37',
                border: '1px solid rgba(212,175,55,0.2)',
              }}
            >
              <span>{screenLabels[screen]}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={navOpen ? 'M18 15l-6-6-6 6' : 'M6 9l6 6 6-6'} />
              </svg>
            </button>

            {navOpen && (
              <div
                className="absolute top-12 left-0 right-0 rounded-2xl overflow-hidden z-50 grid grid-cols-1 gap-px shadow-2xl"
                style={{ background: '#1E2330', border: '1px solid rgba(212,175,55,0.15)', maxHeight: '300px', overflowY: 'auto' }}
              >
                {allScreens.map((s) => (
                  <button
                    key={s}
                    onClick={() => navigate(s)}
                    className="px-3 py-2 text-left font-mono text-[9px] transition-all hover:bg-opacity-80"
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      background: s === screen ? 'rgba(212,175,55,0.12)' : '#181C24',
                      color: s === screen ? '#D4AF37' : '#8B929E',
                    }}
                  >
                    {screenLabels[s]}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mode 1: Simulator Mode */}
      {viewMode === 'simulator' ? (
        <div
          className="relative overflow-hidden w-full max-w-[390px] flex flex-col"
          style={{
            height: screen === 'dashboard' ? 'min(1000px, calc(100vh - 140px))' : screen === 'profile' ? 'min(1300px, calc(100vh - 140px))' : 'min(844px, calc(100vh - 140px))',
            borderRadius: 44,
            background: '#0F1217',
            border: '1px solid #1E2330',
            boxShadow: '0 0 0 1px rgba(212,175,55,0.08), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(212,175,55,0.05)',
          }}
        >
          {/* Top 50px Safe Area (Notch & Status Bar ONLY) */}
          <div className="relative w-full h-[50px] flex-shrink-0 z-30 bg-[#0F1217]">
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
              style={{ width: 110, height: 28, background: '#000', borderRadius: '0 0 16px 16px' }}
            />
            {showStatusBar && <StatusBar />}
          </div>

          {/* Screen Content Viewport (Starts Strictly BELOW 50px) */}
          <div className="relative w-full flex-1 overflow-hidden" style={{ borderRadius: '0 0 44px 44px' }}>
            <div className="h-full relative overflow-y-auto no-scrollbar">
              {renderScreen(screen)}
            </div>
            {showBottomNav && <BottomNav current={screen} navigate={navigate} />}
          </div>
        </div>
      ) : (
        /* Mode 2: All Screens Grid Showcase Mode (Single Page, 2 Screens Per Row) */
        <div className="w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 py-4 justify-items-center items-start">
          {allScreens.map((s) => {
            const hasStatusBar = !['splash', 'scanner', 'processing'].includes(s)
            const hasBottomNav = mainNav.includes(s)
            const screenHeight = s === 'dashboard' ? 'h-[1000px]' : s === 'profile' ? 'h-[1300px]' : 'h-[844px]'
            return (
              <div key={s} className="flex flex-col items-center">
                {/* Screen Header Label */}
                <div
                  className="mb-2 px-3 py-1.5 rounded-lg font-mono text-[10px] font-bold tracking-wider"
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    background: '#181C24',
                    color: '#D4AF37',
                    border: '1px solid rgba(212,175,55,0.2)',
                  }}
                >
                  {screenLabels[s]}
                </div>

                {/* Individual Screen Canvas Frame */}
                <div
                  className={`relative overflow-hidden w-[390px] ${screenHeight} rounded-[40px] shadow-2xl transition-all hover:scale-[1.01] flex flex-col`}
                  style={{
                    background: '#0F1217',
                    border: '1px solid #1E2330',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(212,175,55,0.05)',
                  }}
                >
                  {/* Top 50px Safe Area (Notch & Status Bar ONLY) */}
                  <div className="relative w-full h-[50px] flex-shrink-0 z-30 bg-[#0F1217]">
                    <div
                      className="absolute top-0 left-1/2 -translate-x-1/2 z-40 pointer-events-none"
                      style={{ width: 110, height: 28, background: '#000', borderRadius: '0 0 16px 16px' }}
                    />
                    {hasStatusBar && <StatusBar />}
                  </div>

                  {/* Screen Content Viewport (Starts Strictly BELOW 50px) */}
                  <div className="relative w-full flex-1 overflow-hidden" style={{ borderRadius: '0 0 40px 40px' }}>
                    <div className="h-full relative overflow-y-auto no-scrollbar">
                      {renderScreen(s)}
                    </div>
                    {hasBottomNav && <BottomNav current={s} navigate={navigate} />}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Tagline below */}
      <div className="mt-8 font-mono text-[9px] text-center" style={{ color: '#252B3A', fontFamily: "'JetBrains Mono', monospace", letterSpacing: '0.15em' }}>
        OTZAR · A POCKET GEOLOGIST FOR THE MODERN MINER · v2.4.1
      </div>
    </div>
  )
}
