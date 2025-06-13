import { baseUrl } from '@/utils/constants'
import axios from 'axios'

export const getCurrentUser = async () => {
  const { data } = await axios.get(`${baseUrl}/users/profile`, { withCredentials: true })
  console.log(data)

  return data
}
