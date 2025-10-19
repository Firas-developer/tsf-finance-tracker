import { TrendingUp } from 'lucide-react'

const Logo = ({ className = "h-8 w-8", showText = true, textClassName = "" }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl blur-sm group-hover:blur-md transition-all opacity-75"></div>
        <div className={`relative bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl p-2 shadow-lg transition-transform group-hover:scale-110 ${className}`}>
          {/* Finance Chart Icon */}
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-white">
            <path d="M3 21h18M4 18v-4M8 18v-8M12 18V8M16 18V4M20 18v-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4 14l4-4 4 4 8-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="20" cy="6" r="1.5" fill="currentColor"/>
          </svg>
        </div>
      </div>
      {showText && (
        <span className={`text-xl font-bold bg-gradient-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ${textClassName}`}>
          FinanceTracker
        </span>
      )}
    </div>
  )
}

export default Logo