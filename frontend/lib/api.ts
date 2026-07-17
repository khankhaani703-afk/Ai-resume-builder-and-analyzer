import axios from 'axios'
import { useAuthStore } from './store/authStore'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth endpoints
export const authAPI = {
  register: (data: { email: string; password: string; firstName: string; lastName: string }) =>
    apiClient.post('/auth/register', data),
  login: (data: { email: string; password: string }) => apiClient.post('/auth/login', data),
}

// Resume endpoints
export const resumeAPI = {
  upload: (formData: FormData) => apiClient.post('/resumes/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  }),
  getAll: () => apiClient.get('/resumes'),
  getById: (id: string) => apiClient.get(`/resumes/${id}`),
  delete: (id: string) => apiClient.delete(`/resumes/${id}`),
}

// Analysis endpoints
export const analysisAPI = {
  analyze: (resumeId: string) => apiClient.post('/analysis/analyze', { resumeId }),
  getATSScore: (resumeId: string, jobDescription: string) =>
    apiClient.post('/analysis/ats-score', { resumeId, jobDescription }),
  jobMatch: (resumeId: string, jobDescription: string) =>
    apiClient.post('/analysis/job-match', { resumeId, jobDescription }),
}

// Templates endpoints
export const templatesAPI = {
  getAll: () => apiClient.get('/templates'),
  getById: (id: string) => apiClient.get(`/templates/${id}`),
}

export default apiClient
