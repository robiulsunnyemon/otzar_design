import { useState, useEffect } from 'react'

interface Props {
  onUnlock: () => void
}

export default function AccessLockGate({ onUnlock }: Props) {
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [shaking, setShaking] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const CORRECT_PIN = '20429610'

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    if (pin.trim() === CORRECT_PIN) {
      sessionStorage.setItem('otzar_unlocked', 'true')
      onUnlock()
    } else {
      setError(true)
      setErrorMessage('Security Key Incorrect. Access Denied.')
      setShaking(true)
      setTimeout(() => setShaking(false), 500)
    }
  }

  const handleKeyPress = (num: string) => {
    setError(false)
    if (pin.length < 12) {
      setPin((prev) => prev + num)
    }
  }

  const handleBackspace = () => {
    setError(false)
    setPin((prev) => prev.slice(0, -1))
  }

  const handleClear = () => {
    setError(false)
    setPin('')
  }

  useEffect(() => {
    if (pin.length === CORRECT_PIN.length && pin === CORRECT_PIN) {
      sessionStorage.setItem('otzar_unlocked', 'true')
      onUnlock()
    }
  }, [pin, onUnlock])

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: '#090C10' }}>
      {/* Background Ambient Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.12) 0%, rgba(15,18,23,0.95) 70%)',
        }}
      />

      {/* Main Lock Card */}
      <div
        className={`relative w-full max-w-md p-8 rounded-3xl shadow-2xl flex flex-col items-center border transition-all ${
          shaking ? 'animate-bounce' : ''
        }`}
        style={{
          background: 'rgba(15,18,23,0.92)',
          backdropFilter: 'blur(20px)',
          borderColor: error ? '#FF3B30' : 'rgba(212,175,55,0.3)',
          boxShadow: error
            ? '0 0 40px rgba(255,59,48,0.3), 0 20px 50px rgba(0,0,0,0.8)'
            : '0 0 50px rgba(212,175,55,0.15), 0 20px 50px rgba(0,0,0,0.8)',
        }}
      >
        {/* Security Shield Icon */}
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.05))',
            border: '1px solid rgba(212,175,55,0.4)',
          }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        {/* Title */}
        <h2 className="font-display text-xl font-bold tracking-wide text-center mb-1" style={{ color: '#F8FAFC', fontFamily: "'Space Grotesk', sans-serif" }}>
          OTZAR PROTOCOL LOCK
        </h2>
        <p className="font-mono text-[11px] text-center mb-6" style={{ color: '#8B929E', fontFamily: "'JetBrains Mono', monospace" }}>
          Client Prototype Design Review Gate
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center">
          {/* Input Field */}
          <div className="relative w-full mb-4">
            <input
              type={showPassword ? 'text' : 'password'}
              value={pin}
              onChange={(e) => {
                setError(false)
                setPin(e.target.value)
              }}
              placeholder="Enter Security PIN"
              className="w-full px-4 py-3.5 rounded-xl font-mono text-center text-lg tracking-widest outline-none transition-all"
              style={{
                background: '#181C24',
                color: error ? '#FF3B30' : '#D4AF37',
                border: `1px solid ${error ? '#FF3B30' : 'rgba(212,175,55,0.3)'}`,
                fontFamily: "'JetBrains Mono', monospace",
              }}
              autoFocus
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono px-2 py-1 rounded"
              style={{ color: '#8B929E' }}
            >
              {showPassword ? 'HIDE' : 'SHOW'}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="font-mono text-xs font-semibold mb-4 text-center" style={{ color: '#FF3B30', fontFamily: "'JetBrains Mono', monospace" }}>
              ⚠️ {errorMessage}
            </div>
          )}

          {/* On-screen Numeric Keypad */}
          <div className="w-full grid grid-cols-3 gap-2 mb-6">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'CLR', '0', '⌫'].map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (key === 'CLR') handleClear()
                  else if (key === '⌫') handleBackspace()
                  else handleKeyPress(key)
                }}
                className="py-3 rounded-xl font-mono text-sm font-semibold transition-all active:scale-95 hover:bg-[#222836]"
                style={{
                  background: key === 'CLR' || key === '⌫' ? '#181C24' : '#141820',
                  color: key === 'CLR' ? '#FF9100' : key === '⌫' ? '#8B929E' : '#F8FAFC',
                  border: '1px solid #1E2330',
                  fontFamily: "'JetBrains Mono', monospace",
                }}
              >
                {key}
              </button>
            ))}
          </div>

          {/* Unlock Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-display text-sm font-bold tracking-wider transition-all active:scale-98 shadow-lg flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(135deg, #D4AF37, #AA820A)',
              color: '#0F1217',
              fontFamily: "'Space Grotesk', sans-serif",
              boxShadow: '0 4px 20px rgba(212,175,55,0.3)',
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 9.9-1" />
            </svg>
            UNLOCK PROTOTYPE VAULT
          </button>
        </form>

        {/* Footer Note */}
        <p className="mt-6 font-mono text-[9px] text-center" style={{ color: '#4B5563', fontFamily: "'JetBrains Mono', monospace" }}>
          AUTHORIZED PERSONNEL ONLY · PIN: 20429610
        </p>
      </div>
    </div>
  )
}
