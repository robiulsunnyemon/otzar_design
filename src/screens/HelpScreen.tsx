import { useState } from 'react'
import type { ScreenProps } from '../types'

export default function HelpScreen({ navigate }: ScreenProps) {
  const [activeTab, setActiveTab] = useState<'ai' | 'live' | 'faq'>('ai')
  const [messages, setMessages] = useState<Array<{ role: 'ai' | 'user'; text: string; time: string }>>([
    {
      role: 'ai',
      text: 'Hello Dr. Osei! I am your OTZAR APP AI Field Geologist Assistant. How can I help with your mineral scans, cleavage tests, or claim zones today?',
      time: '14:40',
    },
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLiveConnected, setIsLiveConnected] = useState(false)
  const [connectingLive, setConnectingLive] = useState(false)

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || inputMessage
    if (!text.trim()) return

    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    const newMessages = [...messages, { role: 'user' as const, text, time: now }]
    setMessages(newMessages)
    setInputMessage('')

    // Generate smart AI response
    setTimeout(() => {
      let reply = "I've analyzed your geological query. Based on your current GPS coordinates in the Copperbelt zone, ensure you perform a 10% HCl acid test and streak test to confirm copper carbonates."
      const lower = text.toLowerCase()
      if (lower.includes('mohs') || lower.includes('hardness')) {
        reply = 'Mohs Scale Guide: Malachite is 3.5-4.0 (scratched by copper penny), Pyrite is 6.0-6.5 (scratches glass), and Quartz is 7.0. Always test on an unweathered fracture surface.'
      } else if (lower.includes('offline') || lower.includes('sync')) {
        reply = 'OTZAR APP stores all scans locally with AES-256 encryption. Once satellite/cellular connectivity is detected, your 3 staged specimens will automatically upload to the ArcGIS cloud.'
      } else if (lower.includes('chalcopyrite') || lower.includes('pyrite')) {
        reply = 'Distinguishing Pyrite vs Chalcopyrite: Chalcopyrite has a greenish-black streak and Mohs 3.5-4.0 (softer), while Pyrite has a brownish-black streak and Mohs 6.0-6.5 (much harder).'
      }

      setMessages((prev) => [
        ...prev,
        {
          role: 'ai',
          text: reply,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ])
    }, 600)
  }

  const handleConnectLive = () => {
    setConnectingLive(true)
    setTimeout(() => {
      setConnectingLive(false)
      setIsLiveConnected(true)
    }, 1600)
  }

  return (
    <div className="absolute inset-0 flex flex-col no-scrollbar pt-6" style={{ background: '#0F1217', overflowY: 'auto' }}>
      {/* Tabs */}
      <div className="flex mx-4 mt-1 rounded-2xl p-1 gap-1" style={{ background: '#181C24', border: '1px solid #1E2330' }}>
        {[
          { id: 'ai' as const, label: '🤖 AI Assistant', color: '#D4AF37' },
          { id: 'live' as const, label: '👨‍💼 Live Agent', color: '#00E5FF' },
          { id: 'faq' as const, label: '📚 Guides', color: '#00C853' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="flex-1 py-2 rounded-xl font-mono text-[10px] font-bold transition-all text-center"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              background: activeTab === tab.id ? tab.color : 'transparent',
              color: activeTab === tab.id ? '#0F1217' : '#8B929E',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 flex flex-col px-4 pt-3 pb-24">
        {/* Tab 1: AI Assistant */}
        {activeTab === 'ai' && (
          <div className="flex-1 flex flex-col">
            {/* Quick Prompts */}
            <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-2 mb-2">
              {[
                'Mohs hardness test?',
                'Pyrite vs Chalcopyrite',
                'Offline sync guide',
              ].map((chip) => (
                <button
                  key={chip}
                  onClick={() => handleSendMessage(chip)}
                  className="px-2.5 py-1 rounded-full font-mono text-[8px] flex-shrink-0 transition-all hover:border-[#D4AF37]"
                  style={{
                    background: '#181C24',
                    color: '#D4AF37',
                    border: '1px solid rgba(212,175,55,0.25)',
                    fontFamily: "'JetBrains Mono', monospace",
                  }}
                >
                  ⚡ {chip}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-2.5 min-h-[360px] max-h-[460px] p-3 rounded-2xl mb-3" style={{ background: '#141820', border: '1px solid #1E2330' }}>
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className="max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed"
                    style={{
                      background: m.role === 'user' ? 'linear-gradient(135deg, #C58B2B, #D4AF37)' : '#181C24',
                      color: m.role === 'user' ? '#0F1217' : '#F8FAFC',
                      border: m.role === 'user' ? 'none' : '1px solid #1E2330',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {m.text}
                  </div>
                  <span className="font-mono text-[8px] mt-0.5 px-1" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
                    {m.role === 'ai' ? 'OTZAR AI' : 'You'} · {m.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask geological questions..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-3.5 py-2.5 rounded-xl text-xs outline-none"
                style={{
                  background: '#181C24',
                  border: '1px solid #1E2330',
                  color: '#F8FAFC',
                  fontFamily: "'Inter', sans-serif",
                }}
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl font-display text-xs font-bold transition-all active:scale-95"
                style={{
                  background: 'linear-gradient(135deg, #D4AF37, #AA820A)',
                  color: '#0F1217',
                  fontFamily: "'Space Grotesk', sans-serif",
                }}
              >
                Send
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Live Support Agent */}
        {activeTab === 'live' && (
          <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
            {!isLiveConnected ? (
              <div className="flex flex-col items-center w-full">
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center mb-3"
                  style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)' }}
                >
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="font-display text-sm font-bold mb-1" style={{ color: '#F8FAFC', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Connect with Live Geological Desk
                </h3>
                <p className="font-mono text-[10px] mb-4 leading-relaxed" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
                  Instant connection with senior exploration geologists via satellite link.
                </p>

                <div className="w-full bg-[#181C24] border border-[#1E2330] rounded-2xl p-3 mb-4 text-left">
                  <div className="flex items-center justify-between font-mono text-[9px] mb-1">
                    <span style={{ color: '#8B929E' }}>SUPPORT DESK STATUS</span>
                    <span style={{ color: '#00C853' }}>● ONLINE (3 AGENTS)</span>
                  </div>
                  <div className="flex items-center justify-between font-mono text-[9px]">
                    <span style={{ color: '#8B929E' }}>AVG RESPONSE TIME</span>
                    <span style={{ color: '#D4AF37' }}>&lt; 45 SECONDS</span>
                  </div>
                </div>

                <button
                  onClick={handleConnectLive}
                  disabled={connectingLive}
                  className="w-full py-3.5 rounded-2xl font-display font-semibold text-sm transition-all active:scale-95 flex items-center justify-center gap-2"
                  style={{
                    background: 'linear-gradient(135deg, #00E5FF, #0099B8)',
                    color: '#0F1217',
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: '0 4px 20px rgba(0,229,255,0.3)',
                  }}
                >
                  {connectingLive ? 'Establishing Link...' : 'Start Live Support Session'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center w-full">
                <div className="w-14 h-14 rounded-full bg-[#00C853]/20 border border-[#00C853] flex items-center justify-center mb-2 animate-pulse">
                  <span className="text-xl">👨‍💼</span>
                </div>
                <div className="font-mono text-[9px] text-[#00C853] font-bold mb-0.5">LIVE AGENT CONNECTED</div>
                <div className="font-display text-sm font-bold text-white mb-0.5">Marcus Vance (Senior Geologist)</div>
                <div className="font-mono text-[8px] text-[#8B929E] mb-3">Session ID: #OTZ-84920 · AES-256 Encrypted</div>
                <p className="text-xs text-[#F8FAFC] bg-[#181C24] p-3 rounded-xl border border-[#1E2330] mb-4 text-left">
                  "Hello Dr. Osei! I'm reviewing your latest Malachite fracture telemetry now. Let me know if you need confirmation on ore grading."
                </p>
                <button
                  onClick={() => setIsLiveConnected(false)}
                  className="w-full py-2.5 rounded-xl font-mono text-xs font-semibold bg-[#FF3B30]/10 text-[#FF3B30] border border-[#FF3B30]/30"
                >
                  End Live Session
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: FAQ */}
        {activeTab === 'faq' && (
          <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-2.5">
            {[
              {
                q: 'How does OTZAR APP identify minerals offline?',
                a: 'OTZAR APP runs an embedded quantized CNN model directly on-device, extracting luster and cleavage without requiring internet connectivity.',
              },
              {
                q: 'How to perform field hardness tests?',
                a: 'Use your Mohs kit against fingernail (2.5), penny (3.5), knife blade (5.5), and quartz (7.0). Enter values in the Field Test screen.',
              },
              {
                q: 'What claim export formats are supported?',
                a: 'Full PDF Geological Reports, KML/Shapefiles for ArcGIS & Google Earth, and tabular CSV datasets for laboratory spectrometry.',
              },
              {
                q: 'How do staged offline scans sync?',
                a: 'Go to Sync Engine and tap "Force Background Sync" when Wi-Fi or satellite data becomes available.',
              },
            ].map((faq, i) => (
              <div key={i} className="p-3 rounded-2xl bg-[#181C24] border border-[#1E2330]">
                <div className="font-display font-bold text-xs text-[#D4AF37] mb-1">{faq.q}</div>
                <div className="text-[11px] text-[#8B929E] leading-relaxed">{faq.a}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
