import { api } from '../api/index.ts'

export const getCurrentUser = async () => {
  const { data } = await api.get('/users/profile')

  return data
}
export const login = async (credentials: { username: string; password: string }) => {
  const { data } = await api.post('/users/login', credentials)

  return data
}
export const register = async (credentials: {
  username: string
  email: string
  password: string
}) => {
  const { data } = await api.post('/users/register', credentials)

  return data
}

export const logout = async () => {
  await api.post(`/users/logout`)
}
