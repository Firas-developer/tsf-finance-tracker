import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { transactionService } from '../services/transactionService'
import { TrendingUp, TrendingDown, Wallet, Plus, Receipt, PieChart, Brain, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'
import Header from '../components/Header'
import { formatCurrency } from '../utils/currency'

const Dashboard = () => {
  const [stats, setStats] = useState(null)
  const [recentTransactions, setRecentTransactions] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsData, transactionsData] = await Promise.all([
        transactionService.getStats(),
        transactionService.getAll()
      ])
      setStats(statsData)
      setRecentTransactions(transactionsData.slice(0, 5))
    } catch (error) {
      toast.error('Failed to load dashboard data')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-cyan-500/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-blue-500/20 rounded-full blur-3xl animate-float delay-300"></div>
        <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-500/10 rounded-full blur-3xl animate-float delay-500"></div>
      </div>
      
      <div className="relative z-10">
        <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-4 md:py-6 px-4 sm:px-6 lg:px-8">
        <div className="py-4 md:py-6">
          {/* Welcome Section */}
          <div className="mb-6 md:mb-8 animate-fade-in">
            <div className="flex items-center space-x-2 mb-2 md:mb-3">
              <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
              <h2 className="text-2xl md:text-3xl font-bold text-white">
                Welcome back!
              </h2>
            </div>
            <p className="text-gray-300 text-base md:text-lg">
              Here's your financial overview for today
            </p>
          </div>
            
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-2xl shadow-lg text-white card-hover animate-scale-in relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <TrendingUp className="h-5 w-5 opacity-80 group-hover:scale-110 transition-transform" />
                </div>
                <h3 className="text-sm font-medium opacity-90 mb-1">Total Balance</h3>
                <p className="text-4xl font-bold">{formatCurrency(stats?.balance || 0)}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-6 rounded-2xl shadow-lg text-white card-hover animate-scale-in delay-100 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-sm font-medium opacity-90 mb-1">Total Income</h3>
                <p className="text-4xl font-bold">{formatCurrency(stats?.total_income || 0)}</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-6 rounded-2xl shadow-lg text-white card-hover animate-scale-in delay-200 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                    <TrendingDown className="h-6 w-6" />
                  </div>
                </div>
                <h3 className="text-sm font-medium opacity-90 mb-1">Total Expenses</h3>
                <p className="text-4xl font-bold">{formatCurrency(stats?.total_expense || 0)}</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
            <Link to="/transactions?action=add" className="glass p-5 rounded-xl hover:bg-white/20 transition-all group animate-slide-in-left card-hover">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                  <Plus className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-white">Add Transaction</span>
              </div>
            </Link>
            
            <Link to="/transactions" className="glass p-5 rounded-xl hover:bg-white/20 transition-all group animate-slide-in-left delay-100 card-hover">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                  <Receipt className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-white">Transactions</span>
              </div>
            </Link>
            
            <Link to="/budgets" className="glass p-5 rounded-xl hover:bg-white/20 transition-all group animate-slide-in-left delay-200 card-hover">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-xl group-hover:scale-110 transition-transform shadow-lg">
                  <PieChart className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-white">Budgets</span>
              </div>
            </Link>
            
            <Link to="/ai-assistant" className="bg-gradient-to-r from-pink-500 to-purple-600 p-5 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-pink-500/50 transition-all group animate-slide-in-left delay-300 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
              <div className="relative flex items-center space-x-3">
                <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm group-hover:scale-110 transition-transform">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-white">AI Assistant</span>
              </div>
            </Link>
          </div>

          {/* Recent Transactions */}
          <div className="glass rounded-2xl p-6 animate-scale-in delay-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Recent Transactions</h3>
              <Link to="/transactions" className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
                View All →
              </Link>
            </div>
            
            {recentTransactions.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Receipt className="h-8 w-8 text-cyan-400" />
                </div>
                <p className="text-gray-300 mb-4">No transactions yet</p>
                <Link to="/transactions?action=add" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Your First Transaction
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 bg-white/10 backdrop-blur-sm rounded-lg hover:bg-white/20 transition-all border border-white/10">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-500/20' : 'bg-red-500/20'}`}>
                        {transaction.type === 'income' ? (
                          <TrendingUp className={`h-5 w-5 text-green-400`} />
                        ) : (
                          <TrendingDown className={`h-5 w-5 text-red-400`} />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-white">{transaction.description || transaction.category}</p>
                        <p className="text-sm text-gray-400">{new Date(transaction.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <span className={`font-bold ${transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
    </div>
  )
}

export default Dashboard