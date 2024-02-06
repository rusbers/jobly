import { ReactNode, createContext, useState } from 'react'
import { User } from '../constants/types'
import {
  signup as signupService,
  login as loginService,
  logout as logoutService,
} from '../services/authentication'
import { useLocation, useNavigate } from 'react-router-dom'
import { LogoutDialog } from '../components/LogoutDialog'

type AuthProviderProps = {
  children: ReactNode
}

type AuthContext = {
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoggedIn: boolean
  isLoadingUser: boolean
  user?: User
}

export const Context = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()

  // TODO useEffect to load user

  const signup = (email: string, password: string) => {
    return signupService(email, password).then((user) => {
      setUser(user)
      navigate(location.state?.location ?? '/')
    })
  }

  const login = (email: string, password: string) => {
    return loginService(email, password).then((user) => {
      setUser(user)
      navigate(location.state?.location ?? '/')
    })
  }

  const logout = () => {
    setIsLogoutModalOpen(true)
    return logoutService()
      .then(() => {
        setUser(undefined)
      })
      .finally(() => {
        setIsLogoutModalOpen(false)
      })
  }

  return (
    <Context.Provider
      value={{ user, isLoadingUser, signup, login, logout, isLoggedIn: user !== null }}
    >
      {children}
      <LogoutDialog isOpen={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen} />
    </Context.Provider>
  )
}
