import { useState, useEffect, useRef } from 'react'
import { aiService } from '../services/aiService'
import { transactionService } from '../services/transactionService'
import toast from 'react-hot-toast'
import { Send, Brain, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import { formatCurrency } from '../utils/currency'
import MessageFormatter from '../components/MessageFormatter'

const SUGGESTED_QUESTIONS = [
  "How can I save 20% of my salary?",
  "What's a good monthly budget breakdown?",
  "Should I invest or pay off debt first?",
  "How do I build an emergency fund?",
  "What are smart ways to reduce expenses?"
]

const AIAssistant = () => {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState(null)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    fetchStats()
    // Welcome message
    setMessages([{
      role: 'assistant',
      content: `Hey! I'm here to help you make smarter money decisions. Think of me as your personal finance buddy who actually knows what they're talking about 😊

I can help you figure out budgeting, saving, investing, cutting expenses, or planning for big goals. Just ask me anything about your finances and I'll give you straight, practical advice.

Fair warning though - I only do finance stuff. Ask me about the weather or sports and I'll politely redirect you back to money talk!

So, what's on your mind?`
    }])
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const fetchStats = async () => {
    try {
      const data = await transactionService.getStats()
      setStats(data)
    } catch (error) {
      console.error('Failed to load stats')
    }
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const response = await aiService.getAdvice(userMessage)
      
      // Add AI response
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.response 
      }])
    } catch (error) {
      toast.error('Failed to get AI response')
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleSuggestedQuestion = (question) => {
    setInput(question)
  }

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 relative overflow-hidden flex flex-col">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-500/20 rounded-full blur-3xl animate-float delay-300"></div>
        <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 rounded-full blur-3xl animate-float delay-500"></div>
      </div>

      <div className="relative z-10 flex flex-col h-full">
        <Header />

        {/* Main Content */}
        <main className="flex-1 max-w-5xl mx-auto w-full py-4 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="h-full flex flex-col">
            {/* Header - Compact */}
            <div className="mb-3 md:mb-4 animate-fade-in flex-shrink-0">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <div className="bg-gradient-to-r from-pink-500 to-purple-600 p-2 rounded-xl shadow-lg">
                    <Brain className="h-4 w-4 md:h-5 md:w-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg md:text-xl font-bold text-white">AI Financial Advisor</h2>
                    <p className="text-xs text-gray-400">Powered by Google Gemini</p>
                  </div>
                </div>

                {/* Financial Summary - Compact */}
                {stats && (
                  <div className="glass rounded-xl px-3 md:px-4 py-2 border border-white/20 w-full md:w-auto">
                    <div className="flex items-center justify-between md:space-x-4 text-xs">
                      <div>
                        <p className="text-gray-400">Balance</p>
                        <p className="font-bold text-white">{formatCurrency(stats.balance)}</p>
                      </div>
                      <div className="h-8 w-px bg-white/20"></div>
                      <div>
                        <p className="text-gray-400">Income</p>
                        <p className="font-bold text-green-400">{formatCurrency(stats.total_income)}</p>
                      </div>
                      <div className="h-8 w-px bg-white/20"></div>
                      <div>
                        <p className="text-gray-400">Expenses</p>
                        <p className="font-bold text-red-400">{formatCurrency(stats.total_expense)}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Messages - Full Height */}
            <div className="flex-1 glass rounded-2xl overflow-hidden flex flex-col animate-scale-in delay-300 min-h-0">
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-cyan-500 scrollbar-track-transparent">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                  >
                    <div className={`flex items-start space-x-3 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-lg ${
                        message.role === 'user' 
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600' 
                          : 'bg-gradient-to-r from-pink-500 to-purple-600'
                      }`}>
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div className={`rounded-2xl px-4 py-3 shadow-lg ${
                        message.role === 'user'
                          ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white'
                          : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                      }`}>
                        {message.role === 'user' ? (
                          <p className="text-sm leading-relaxed">{message.content}</p>
                        ) : (
                          <div className="text-sm">
                            <MessageFormatter content={message.content} />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                
                {loading && (
                  <div className="flex justify-start animate-fade-in">
                    <div className="flex items-start space-x-3 max-w-[80%]">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 flex items-center justify-center shadow-lg">
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-4 py-3 border border-white/20">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions */}
              {messages.length === 1 && (
                <div className="px-4 py-3 bg-white/5 border-t border-white/10 flex-shrink-0">
                  <p className="text-xs font-medium text-white mb-2 flex items-center">
                    <Sparkles className="h-3 w-3 mr-2 text-cyan-400" />
                    Suggested questions:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SUGGESTED_QUESTIONS.map((question, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestedQuestion(question)}
                        className="text-xs px-2 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-gray-300 rounded-lg hover:bg-white/20 hover:text-white hover:border-cyan-500 transition-all"
                      >
                        {question}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="p-3 border-t border-white/10 bg-white/5 flex-shrink-0">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything about your finances..."
                    className="flex-1 px-4 py-2.5 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-xl focus:outline-none focus:border-cyan-500 text-white placeholder-gray-400 text-sm"
                    disabled={loading}
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-xl hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 font-semibold"
                  >
                    <Send className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm">Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default AIAssistant