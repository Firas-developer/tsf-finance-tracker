import api from './authService'

export const transactionService = {
  async getAll(filters = {}) {
    const params = new URLSearchParams()
    if (filters.type) params.append('type', filters.type)
    if (filters.start_date) params.append('start_date', filters.start_date)
    if (filters.end_date) params.append('end_date', filters.end_date)
    
    const response = await api.get(`/transactions?${params}`)
    return response.data
  },

  async getStats(filters = {}) {
    const params = new URLSearchParams()
    if (filters.start_date) params.append('start_date', filters.start_date)
    if (filters.end_date) params.append('end_date', filters.end_date)
    
    const response = await api.get(`/transactions/stats?${params}`)
    return response.data
  },

  async getById(id) {
    const response = await api.get(`/transactions/${id}`)
    return response.data
  },

  async create(data) {
    const response = await api.post('/transactions', data)
    return response.data
  },

  async update(id, data) {
    const response = await api.put(`/transactions/${id}`, data)
    return response.data
  },

  async delete(id) {
    await api.delete(`/transactions/${id}`)
  }
}