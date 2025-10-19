import api from './authService'

export const budgetService = {
  async getAll() {
    const response = await api.get('/budgets')
    return response.data
  },

  async getById(id) {
    const response = await api.get(`/budgets/${id}`)
    return response.data
  },

  async create(data) {
    const response = await api.post('/budgets', data)
    return response.data
  },

  async update(id, data) {
    const response = await api.put(`/budgets/${id}`, data)
    return response.data
  },

  async delete(id) {
    await api.delete(`/budgets/${id}`)
  }
}