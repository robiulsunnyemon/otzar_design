export default function StatusBar() {
  return (
    <div
      className="w-full h-full flex items-center justify-between px-7 text-[12px] font-semibold select-none z-30"
      style={{ color: '#F8FAFC', fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Inter', sans-serif" }}
    >
      {/* Left: Time */}
      <div className="flex items-center tracking-tight font-medium text-[13px] text-[#F8FAFC]">
        9:41
      </div>

      {/* Center: Dynamic Island / Camera Cutout */}
      <div
        className="w-24 h-5 rounded-full bg-black flex items-center justify-end px-2"
        style={{
          boxShadow: '0 0 0 1px rgba(255,255,255,0.06)',
        }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-[#181C24] border border-[#2A303C]" />
      </div>

      {/* Right: Cellular Signal, WiFi & Battery Charge Icons */}
      <div className="flex items-center gap-1.5 text-[#F8FAFC]">
        {/* Cellular Signal Bars */}
        <svg width="17" height="11" viewBox="0 0 17 11" fill="none" className="inline-block">
          <rect x="0.5" y="7.5" width="2.5" height="3.5" rx="0.5" fill="#F8FAFC" />
          <rect x="4.5" y="5.5" width="2.5" height="5.5" rx="0.5" fill="#F8FAFC" />
          <rect x="8.5" y="3" width="2.5" height="8" rx="0.5" fill="#F8FAFC" />
          <rect x="12.5" y="0.5" width="2.5" height="10.5" rx="0.5" fill="#F8FAFC" />
        </svg>

        {/* WiFi Icon */}
        <svg width="15" height="11" viewBox="0 0 16 12" fill="none" className="inline-block">
          <path
            d="M8 11.5a1.2 1.2 0 100-2.4 1.2 1.2 0 000 2.4zM4.5 7.5C5.5 6.5 6.7 6 8 6s2.5.5 3.5 1.5M1.8 4.7C3.5 3 5.6 2.1 8 2.1s4.5.9 6.2 2.6M0 2.8C2.2.6 5-.5 8-.5s5.8 1.1 8 3.3"
            stroke="#F8FAFC"
            strokeWidth="1.3"
            strokeLinecap="round"
          />
        </svg>

        {/* Battery Icon with Charge Level */}
        <div className="flex items-center ml-0.5">
          <div
            className="w-[22px] h-[11.5px] rounded-[3.5px] p-[1.5px] flex items-center"
            style={{ border: '1.2px solid rgba(248, 250, 252, 0.6)' }}
          >
            <div className="h-full w-[80%] rounded-[2px] bg-[#00C853]" />
          </div>
          <div
            className="w-[1.2px] h-[4px] rounded-r-[1px] ml-[1px]"
            style={{ background: 'rgba(248, 250, 252, 0.5)' }}
          />
        </div>
      </div>
    </div>
  )
}
