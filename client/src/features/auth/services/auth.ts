import { baseApi } from "@/services/baseApi"
import { User } from "../constants/types"
import { USER_ROUTES_ENDPOINTS } from "../constants/constants"

export const loginService = async (email: string, password: string) => {
  const body = { email, password }
  const result = await baseApi.post<User>(USER_ROUTES_ENDPOINTS.LOGIN, body)

  return result.data
}

export const signupService = async (email: string, password: string) => {
  const body = { email, password }
  const result = await baseApi.post<User>(USER_ROUTES_ENDPOINTS.SIGNUP, body)

  return result.data
}

export const logoutService = async () => {
  return await baseApi.delete(USER_ROUTES_ENDPOINTS.LOGOUT)
}

export const userSessionService = async () => {
  const result = await baseApi.get<User>(USER_ROUTES_ENDPOINTS.SESSION)

  return result.data ?? undefined
}
