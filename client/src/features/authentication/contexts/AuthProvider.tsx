import { ReactNode, createContext, useState } from 'react'
import { User } from '../constants/types'
import { signup as signupService } from '../services/authentication'
import { useNavigate } from 'react-router-dom'

type AuthProviderProps = {
  children: ReactNode
}

type AuthContext = {
  // login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  // logout: () => Promise<void>
  isLoggedIn: boolean
  isLoadingUser: boolean
  user?: User
}

export const Context = createContext<AuthContext | null>(null)

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>()
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

  const navigate = useNavigate()

  // TODO useEffect to load user

  const signup = (email: string, password: string) => {
    return signupService(email, password).then((user) => {
      setUser(user)
      // TODO to implement user permission handling
      navigate('/')
    })
  }

  // TODO login

  return (
    <Context.Provider value={{ user, isLoadingUser, signup, isLoggedIn: user !== null }}>
      {children}
    </Context.Provider>
  )
}
