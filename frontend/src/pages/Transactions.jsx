import { useState, useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { transactionService } from '../services/transactionService'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Plus, X, Edit2, Trash2, TrendingUp, TrendingDown, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import { formatCurrency } from '../utils/currency'

const TRANSACTION_CATEGORIES = {
  income: [
    { value: 'salary', label: 'Salary' },
    { value: 'freelance', label: 'Freelance' },
    { value: 'investment', label: 'Investment' },
    { value: 'other_income', label: 'Other Income' }
  ],
  expense: [
    { value: 'food', label: 'Food' },
    { value: 'transport', label: 'Transport' },
    { value: 'housing', label: 'Housing' },
    { value: 'utilities', label: 'Utilities' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'education', label: 'Education' },
    { value: 'other_expense', label: 'Other Expense' }
  ]
}

const Transactions = () => {
  const [searchParams] = useSearchParams()
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingTransaction, setEditingTransaction] = useState(null)
  const [selectedType, setSelectedType] = useState('expense')
  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm()

  const transactionType = watch('type', 'expense')

  useEffect(() => {
    fetchTransactions()
    if (searchParams.get('action') === 'add') {
      setShowModal(true)
    }
  }, [])

  useEffect(() => {
    setSelectedType(transactionType)
  }, [transactionType])

  const fetchTransactions = async () => {
    try {
      const data = await transactionService.getAll()
      setTransactions(data)
    } catch (error) {
      toast.error('Failed to load transactions')
    } finally {
      setLoading(false)
    }
  }

  const onSubmit = async (data) => {
    try {
      const transactionData = {
        ...data,
        amount: parseFloat(data.amount),
        date: new Date(data.date).toISOString()
      }

      if (editingTransaction) {
        await transactionService.update(editingTransaction.id, transactionData)
        toast.success('Transaction updated successfully')
      } else {
        await transactionService.create(transactionData)
        toast.success('Transaction added successfully')
      }

      setShowModal(false)
      setEditingTransaction(null)
      reset()
      fetchTransactions()
    } catch (error) {
      toast.error(error.response?.data?.detail || 'Failed to save transaction')
    }
  }

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction)
    setValue('type', transaction.type)
    setValue('category', transaction.category)
    setValue('amount', transaction.amount)
    setValue('description', transaction.description)
    setValue('date', new Date(transaction.date).toISOString().split('T')[0])
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await transactionService.delete(id)
        toast.success('Transaction deleted successfully')
        fetchTransactions()
      } catch (error) {
        toast.error('Failed to delete transaction')
      }
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingTransaction(null)
    reset()
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
                <h2 className="text-2xl md:text-3xl font-bold text-white">Transactions</h2>
              </div>
              <p className="text-gray-300 text-sm md:text-lg">Manage your income and expenses</p>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 font-semibold text-sm md:text-base whitespace-nowrap"
            >
              <Plus className="h-4 w-4 md:h-5 md:w-5 mr-2" />
              Add Transaction
            </button>
          </div>

          {/* Transactions List */}
          <div className="glass rounded-xl md:rounded-2xl animate-scale-in overflow-hidden">
            {transactions.length === 0 ? (
              <div className="text-center py-12 md:py-16 px-4">
                <div className="bg-cyan-500/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-10 w-10 text-cyan-400" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">No transactions yet</h3>
                <p className="text-gray-300 mb-6">Start tracking your finances by adding your first transaction</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-2xl hover:shadow-cyan-500/50 transition-all transform hover:scale-105 font-semibold"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Transaction
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-white/10">
                  <thead className="bg-white/5 hidden md:table-header-group">
                    <tr>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Date</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Type</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Category</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider hidden lg:table-cell">Description</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">Amount</th>
                      <th className="px-4 md:px-6 py-3 md:py-4 text-right text-xs font-bold text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {transactions.map((transaction, index) => (
                      <tr key={transaction.id} className="hover:bg-white/5 transition-all animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                          {new Date(transaction.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                            transaction.type === 'income' 
                              ? 'bg-green-500/20 text-green-400' 
                              : 'bg-red-500/20 text-red-400'
                          }`}>
                            {transaction.type === 'income' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                            {transaction.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-white capitalize font-medium">
                          {transaction.category.replace('_', ' ')}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-300">
                          {transaction.description || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">
                          <span className={transaction.type === 'income' ? 'text-green-400' : 'text-red-400'}>
                            {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() => handleEdit(transaction)}
                            className="text-cyan-400 hover:text-cyan-300 hover:scale-110 transition-all mr-4"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(transaction.id)}
                            className="text-red-400 hover:text-red-300 hover:scale-110 transition-all"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
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
                  {editingTransaction ? 'Edit Transaction' : 'Add Transaction'}
                </h3>
                <button onClick={closeModal} className="text-gray-400 hover:text-gray-600 hover:scale-110 transition-all">
                  <X className="h-6 w-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                  <select
                    {...register('type', { required: 'Type is required' })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  >
                    <option value="expense">Expense</option>
                    <option value="income">Income</option>
                  </select>
                  {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <select
                    {...register('category', { required: 'Category is required' })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  >
                    <option value="">Select category</option>
                    {TRANSACTION_CATEGORIES[selectedType].map((cat) => (
                      <option key={cat.value} value={cat.value}>{cat.label}</option>
                    ))}
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount</label>
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
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Date</label>
                  <input
                    {...register('date', { required: 'Date is required' })}
                    type="date"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                  />
                  {errors.date && <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Description (Optional)</label>
                  <textarea
                    {...register('description')}
                    rows="3"
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
                    placeholder="Add a note..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl hover:shadow-xl hover:shadow-cyan-500/50 transition-all font-semibold transform hover:scale-105"
                  >
                    {editingTransaction ? 'Update' : 'Add'}
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

export default Transactions