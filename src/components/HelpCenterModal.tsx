import { useState } from 'react'

interface Props {
  isOpen: boolean
  onClose: () => void
}

export default function HelpCenterModal({ isOpen, onClose }: Props) {
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

  if (!isOpen) return null

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
    }, 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}>
      <div
        className="w-full max-w-lg rounded-3xl overflow-hidden flex flex-col shadow-2xl border"
        style={{
          background: '#0F1217',
          borderColor: 'rgba(212,175,55,0.3)',
          maxHeight: '90vh',
          height: '620px',
        }}
      >
        {/* Modal Header */}
        <div className="px-5 py-4 flex items-center justify-between border-b" style={{ borderColor: '#1E2330', background: '#181C24' }}>
          <div className="flex items-center gap-2.5">
            <img src="/logo.png" alt="OTZAR APP Logo" className="w-6 h-6 object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
            <div>
              <div className="font-display font-bold text-sm" style={{ color: '#F8FAFC', fontFamily: "'Space Grotesk', sans-serif" }}>
                OTZAR APP Help & Support Center
              </div>
              <div className="font-mono text-[9px]" style={{ color: '#00C853', fontFamily: "'JetBrains Mono', monospace" }}>
                ● 24/7 AI GEOLOGIST & LIVE AGENTS READY
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-[#252B3A]"
            style={{ color: '#8B929E' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b" style={{ borderColor: '#1E2330', background: '#141820' }}>
          <button
            onClick={() => setActiveTab('ai')}
            className="flex-1 py-3 font-mono text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: activeTab === 'ai' ? '#D4AF37' : '#8B929E',
              borderBottom: activeTab === 'ai' ? '2px solid #D4AF37' : '2px solid transparent',
              background: activeTab === 'ai' ? 'rgba(212,175,55,0.06)' : 'transparent',
            }}
          >
            <span>🤖</span> AI GEOLOGICAL ASSISTANT
          </button>
          <button
            onClick={() => setActiveTab('live')}
            className="flex-1 py-3 font-mono text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: activeTab === 'live' ? '#00E5FF' : '#8B929E',
              borderBottom: activeTab === 'live' ? '2px solid #00E5FF' : '2px solid transparent',
              background: activeTab === 'live' ? 'rgba(0,229,255,0.06)' : 'transparent',
            }}
          >
            <span>👨‍💼</span> LIVE SUPPORT AGENT
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className="flex-1 py-3 font-mono text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: activeTab === 'faq' ? '#00C853' : '#8B929E',
              borderBottom: activeTab === 'faq' ? '2px solid #00C853' : '2px solid transparent',
              background: activeTab === 'faq' ? 'rgba(0,200,83,0.06)' : 'transparent',
            }}
          >
            <span>📚</span> FIELD GUIDES
          </button>
        </div>

        {/* Tab 1: AI Assistant */}
        {activeTab === 'ai' && (
          <div className="flex-1 flex flex-col p-4 overflow-hidden">
            {/* Quick Prompt Chips */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-2">
              {[
                'How to test Mohs hardness?',
                'Pyrite vs Chalcopyrite distinction',
                'How does offline sync work?',
                'Calibrate optical camera',
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
            <div className="flex-1 overflow-y-auto no-scrollbar flex flex-col gap-3 pr-1">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className="max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed"
                    style={{
                      background: m.role === 'user' ? 'linear-gradient(135deg, #C58B2B, #D4AF37)' : '#181C24',
                      color: m.role === 'user' ? '#0F1217' : '#F8FAFC',
                      border: m.role === 'user' ? 'none' : '1px solid #1E2330',
                      fontFamily: "'Inter', sans-serif",
                    }}
                  >
                    {m.text}
                  </div>
                  <span className="font-mono text-[8px] mt-1 px-1" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
                    {m.role === 'ai' ? 'OTZAR AI' : 'You'} · {m.time}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSendMessage()
              }}
              className="mt-3 flex gap-2"
            >
              <input
                type="text"
                placeholder="Ask the AI Geologist any question..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl text-xs outline-none"
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
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            {!isLiveConnected ? (
              <div className="flex flex-col items-center max-w-sm">
                <div
                  className="w-16 h-16 rounded-3xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.3)' }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#00E5FF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <h3 className="font-display text-base font-bold mb-1" style={{ color: '#F8FAFC', fontFamily: "'Space Grotesk', sans-serif" }}>
                  Connect with a Live Geologist / Support Rep
                </h3>
                <p className="font-mono text-xs mb-6 leading-relaxed" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
                  Instant connection with our senior geological exploration desk via satellite data relay or audio link.
                </p>

                <div className="w-full bg-[#181C24] border border-[#1E2330] rounded-2xl p-3 mb-6 text-left">
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
                  {connectingLive ? 'Establishing Satellite Link...' : 'Start Live Support Session'}
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center max-w-sm">
                <div className="w-16 h-16 rounded-full bg-[#00C853]/20 border border-[#00C853] flex items-center justify-center mb-3 animate-pulse">
                  <span className="text-2xl">👨‍💼</span>
                </div>
                <div className="font-mono text-[10px] text-[#00C853] font-bold mb-1">LIVE AGENT CONNECTED</div>
                <div className="font-display text-base font-bold text-white mb-1">Marcus Vance (Senior Geologist)</div>
                <div className="font-mono text-[9px] text-[#8B929E] mb-6">Session ID: #OTZ-84920 · Encryption: AES-256</div>
                <p className="text-xs text-[#F8FAFC] bg-[#181C24] p-3 rounded-xl border border-[#1E2330] mb-6">
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

        {/* Tab 3: FAQ & Field Guides */}
        {activeTab === 'faq' && (
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-3">
            {[
              {
                q: 'How does OTZAR APP identify minerals offline?',
                a: 'OTZAR APP runs an embedded quantized Convolutional Neural Network (CNN) directly on your device CPU/NPU, extracting luster, cleavage, and RGB histograms without requiring any internet connection.',
              },
              {
                q: 'How to perform an accurate field hardness test?',
                a: 'Use your standard Mohs kit. Test against fingernail (2.5), copper coin (3.5), knife blade (5.5), and quartz (7.0). Enter the result in the Field Test screen to refine match confidence.',
              },
              {
                q: 'What formats can I export my claim data to?',
                a: 'You can export complete PDF Geological Reports, KML/Shapefiles for ArcGIS & Google Earth, and tabular CSV datasets for laboratory spectrometry.',
              },
              {
                q: 'How do I sync staged findings when back at camp?',
                a: 'Navigate to the Sync Engine tab and tap "Force Background Sync" once connected to Wi-Fi or satellite cellular data.',
              },
            ].map((faq, i) => (
              <div key={i} className="p-3.5 rounded-2xl bg-[#181C24] border border-[#1E2330]">
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
