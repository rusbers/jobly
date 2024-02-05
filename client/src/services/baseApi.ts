import axios from 'axios'
import { env } from '@/constants/config'

export const baseApi = axios.create({ baseURL: env.VITE_API_URL, withCredentials: true })
