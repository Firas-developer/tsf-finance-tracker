import api from './authService'

export const aiService = {
  async getAdvice(query) {
    const response = await api.post('/ai/assistant', { query })
    return response.data
  }
}