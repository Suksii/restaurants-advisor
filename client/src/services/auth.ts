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

export const deactivate = async (id: number | string) => {
  const { data } = await api.patch(`/users/${id}/deactivate`)
  return data
}

export const reactivate = async (id: number | string) => {
  const { data } = await api.patch(`/users/${id}/activate`)
  return data
}

export const changePassword = async (
  id: number | string,
  currentPassword: string,
  newPassword: string,
) => {
  const { data } = await api.patch(`/users/${id}/changePassword`, {
    currentPassword,
    newPassword,
  })
  return data
}

export const getUsers = async () => {
  const { data } = await api.get('/users/')
  return data
}
