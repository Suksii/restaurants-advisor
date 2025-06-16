import { baseUrl } from '../utils/constants'
import axios from 'axios'

export const api = axios.create({
  baseURL: baseUrl,
  withCredentials: true,
})
