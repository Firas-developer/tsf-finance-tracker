import { useState, useEffect } from 'react'
import { budgetService } from '../services/budgetService'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Plus, X, Edit2, Trash2, PieChart, AlertCircle, CheckCircle, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import { formatCurrency } from '../utils/currency'

const BUDGET_CATEGORIES = [
  { value: 'food', label: 'Food' },
  { value: 'transport', label: 'Transport' },
  { value: 'housing', label: 'Housing' },
  { value: 'utilities', label: 'Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'healthcare', label: 'Healthcare' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'education', label: 'Education' },
  { value: 'other_expense', label: 'Other' }
]

const Budgets = () => {
  const [budgets, setBudgets] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingBudget, setEditingBudget] = useState(null)
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()

  useEffect(() => {
    fetchBudgets()
  }, [])

  const fetchBudgets = async () => {
    try {
      const data = await budgetService.getAll()
      setBudgets(data)
    } catch (error) {
      toast.error('Failed to load budgets')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      const budgetData = {
        ...data,
        amount: parseFloat(data.amount),
        start_date: new Date(data.start_date).toISOString(),
        end_date: new Date(data.end_date).toISOString()
      }

      if (editingBudget) {
        await budgetService.update(editingBudget.id, budgetData)
        toast.success('Budget updated successfully')
      } else {
        await budgetService.create(budgetData)
        toast.success('Budget created successfully')
      }

      setShowModal(false)
      setEditingBudget(null)
      reset()
      fetchBudgets()
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save budget')
    }
  }

  const handleEdit = (budget) => {
    setEditingBudget(budget)
    setValue('category', budget.category)
    setValue('amount', budget.amount)
    setValue('period', budget.period)
    setValue('start_date', new Date(budget.start_date).toISOString().split('T')[0])
    setValue('end_date', new Date(budget.end_date).toISOString().split('T')[0])
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      try {
        await budgetService.delete(id)
        toast.success('Budget deleted successfully')
        fetchBudgets()
      } catch (error) {
        toast.error('Failed to delete budget')
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingBudget(null)
    reset()
  }

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return 'text-red-600 bg-red-100'
    if (percentage >= 70) return 'text-yellow-600 bg-yellow-100'
    return 'text-green-600 bg-green-100'
  }

  const getProgressColor = (percentage) => {
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
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
      </div>
      
      <div className="relative z-10">
        <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-4 md:py-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 md:mb-8 animate-fade-in gap-4">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-cyan-400" />
                <h2 className="text-2xl md:text-3xl font-bold text-white">Budget Planning</h2>
              </div>
              <p className="text-gray-300 text-sm md:text-lg">Set and track your spending limits</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 font-semibold text-sm md:text-base whitespace-nowrap"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Create Budget
            </button>
          </div>

          {/* Budgets Grid */}
          {budgets.length === 0 ? (
            <div className="glass rounded-2xl text-center py-16 animate-scale-in">
              <div className="bg-purple-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <PieChart className="h-10 w-10 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No budgets yet</h3>
              <p className="text-gray-300 mb-6">Create your first budget to start tracking your spending</p>
              <button
                onClick={() => setShowModal(true)}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 font-semibold"
              >
                <Plus className="h-5 w-5 mr-2" />
                Create Budget
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {budgets.map((budget, index) => (
                <div key={budget.id} className="glass rounded-2xl p-6 card-hover animate-scale-in" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="bg-purple-500/20 p-2 rounded-lg">
                        <PieChart className="h-5 w-5 text-purple-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white capitalize">
                          {budget.category.replace('_', ' ')}
                        </h3>
                        <p className="text-xs text-gray-400 capitalize">{budget.period}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(budget)}
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(budget.id)}
                        className="text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Budget</span>
                      <span className="font-semibold text-white">{formatCurrency(budget.amount)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Spent</span>
                      <span className="font-semibold text-red-400">{formatCurrency(budget.spent)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-400">Remaining</span>
                      <span className="font-semibold text-green-400">{formatCurrency(budget.remaining)}</span>
                    </div>

                    {/* Progress Bar */}
                    <div className="pt-2">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-gray-400">Progress</span>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusColor(budget.percentage_used)}`}>
                          {budget.percentage_used.toFixed(0)}%
                        </span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all ${getProgressColor(budget.percentage_used)}`}
                          style={{ width: `${Math.min(budget.percentage_used, 100)}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Status Message */}
                    {budget.percentage_used >= 90 && (
                      <div className="flex items-center space-x-2 text-xs text-red-400 bg-red-500/20 p-2 rounded-lg">
                        <AlertCircle className="h-4 w-4" />
                        <span>Budget limit almost reached!</span>
                      </div>
                    )}
                    {budget.percentage_used < 70 && (
                      <div className="flex items-center space-x-2 text-xs text-green-400 bg-green-500/20 p-2 rounded-lg">
                        <CheckCircle className="h-4 w-4" />
                        <span>On track with your budget</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-400">
                    {new Date(budget.start_date).toLocaleDateString()} - {new Date(budget.end_date).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto animate-scale-in">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold gradient-text">
                  {editingBudget ? 'Edit Budget' : 'Create Budget'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 hover:scale-110 transition-all">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Select category</option>
                    {BUDGET_CATEGORIES.map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Budget Amount</label>
                  <input
                    {...register('amount', { 
                      required: 'Amount is required',
                      min: { value: 0.01, message: 'Amount must be greater than 0' }
                    })}
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                    placeholder="0.00"
                  />
                  {errors.amount && <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Period</label>
                  <select
                    {...register('period', { required: 'Period is required' })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  >
                    <option value="monthly">Monthly</option>
                    <option value="yearly">Yearly</option>
                  </select>
                  {errors.period && <p className="mt-1 text-sm text-red-600">{errors.period.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                  <input
                    {...register('start_date', { required: 'Start date is required' })}
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                  {errors.start_date && <p className="mt-1 text-sm text-red-600">{errors.start_date.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                  <input
                    {...register('end_date', { required: 'End date is required' })}
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                  {errors.end_date && <p className="mt-1 text-sm text-red-600">{errors.end_date.message}</p>}
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-medium"
                  >
                    {editingBudget ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Budgets