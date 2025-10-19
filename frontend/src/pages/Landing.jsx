import { Link } from 'react-router-dom'
import { TrendingUp, PieChart, Brain, Shield, Zap, ArrowRight, Sparkles } from 'lucide-react'
import Logo from '../components/Logo'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-500/20 rounded-full blur-3xl animate-float delay-300"></div>
        <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 rounded-full blur-3xl animate-float delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="absolute top-0 w-full z-50 animate-slide-up">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo showText={true} textClassName="text-white" />
            <div className="flex items-center space-x-4 animate-fade-in delay-200">
              <Link
                to="/login"
                className="px-6 py-2 text-white hover:text-cyan-300 transition-all font-medium"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 font-medium"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-3 md:px-4 py-1.5 md:py-2 bg-cyan-500/20 backdrop-blur-sm border border-cyan-500/30 rounded-full mb-4 md:mb-6 animate-bounce-in text-xs md:text-sm">
              <Sparkles className="h-3 w-3 md:h-4 md:w-4 text-cyan-400" />
              <span className="text-cyan-300 font-medium">AI-Powered Financial Intelligence</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 md:mb-6 animate-fade-in leading-tight px-2">
              Master Your Finances with
              <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500 bg-clip-text text-transparent">
                Smart AI Insights
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-gray-200 mb-8 md:mb-10 max-w-3xl mx-auto animate-slide-up delay-200 leading-relaxed px-4">
              Track spending, set budgets, and get personalized financial advice from our AI assistant. 
              Built for software engineers who want to take control of their money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up delay-300">
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 flex items-center justify-center"
              >
                Start Free Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all border border-white/20"
              >
                Sign In
              </Link>
            </div>
          </div>

          {/* Floating Cards Animation */}
          <div className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
            <div className="glass rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:-translate-y-2 animate-scale-in card-hover group">
              <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <TrendingUp className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Track Everything</h3>
              <p className="text-gray-300">
                Monitor your income, expenses, and savings in real-time with beautiful visualizations.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:-translate-y-2 animate-scale-in delay-200 card-hover group">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <PieChart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Smart Budgets</h3>
              <p className="text-gray-300">
                Set monthly or yearly budget goals and get alerts when you're close to limits.
              </p>
            </div>

            <div className="glass rounded-2xl p-8 hover:bg-white/20 transition-all transform hover:-translate-y-2 animate-scale-in delay-400 card-hover group">
              <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-4 rounded-xl w-fit mb-4 group-hover:scale-110 transition-transform">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Assistant</h3>
              <p className="text-gray-300">
                Get personalized financial advice powered by Google Gemini AI technology.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8 bg-white/5 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-white text-center mb-16">
            Everything You Need to Succeed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Secure & Private</h3>
              <p className="text-gray-300">Your financial data is encrypted and protected with JWT authentication.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Lightning Fast</h3>
              <p className="text-gray-300">Built with modern tech stack for blazing fast performance.</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-orange-500 to-red-600 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">AI-Powered</h3>
              <p className="text-gray-300">Get smart recommendations using Google's Gemini AI.</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Take Control?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Join thousands of software engineers managing their finances smarter.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center px-10 py-5 bg-gradient-to-r from-pink-500 to-yellow-500 text-white rounded-xl font-bold text-xl hover:shadow-2xl transition-all transform hover:scale-105"
          >
            Get Started for Free
            <ArrowRight className="ml-3 h-6 w-6" />
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center text-gray-400">
          <p>&copy; 2024 FinanceTracker. Built with ❤️ for software engineers.</p>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out 0.3s both;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay-1 {
          animation: float 3s ease-in-out infinite 0.5s;
        }
        .animate-float-delay-2 {
          animation: float 3s ease-in-out infinite 1s;
        }
      `}</style>
    </div>
  )
}

export default Landing