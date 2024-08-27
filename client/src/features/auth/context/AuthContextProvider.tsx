import { createContext, useState, useEffect } from "react"
import { User } from "../constants/types"
import { loginService, signupService, logoutService, userSessionService } from "../services/auth"
import { useLocation, useNavigate } from "react-router-dom"
import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

type AuthContextType = {
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isLoggedIn: boolean
  isLoadingUser: boolean
  user?: User
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>()
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const fetchUser = async () => {
      setIsLoadingUser(true)
      try {
        const user = await userSessionService()
        setUser(user)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoadingUser(false)
      }
    }

    fetchUser()
  }, [])

  async function signup(email: string, password: string) {
    const user = await signupService(email, password)
    setUser(user)
    navigate(location.state?.location ?? "/")
  }

  async function login(email: string, password: string) {
    const user = await loginService(email, password)
    setUser(user)
    navigate(location.state?.location ?? "/")
  }

  async function logout() {
    setIsLogoutModalOpen(true)
    try {
      await logoutService()
      setUser(undefined)
    } catch (error) {
      console.error(error)
    } finally {
      setIsLogoutModalOpen(false)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, signup, login, logout, isLoadingUser, isLoggedIn: user != null }}
    >
      {children}
      <Dialog open={isLogoutModalOpen} onOpenChange={setIsLogoutModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Logging Out</DialogTitle>
          </DialogHeader>
          <LoadingSpinner className='w-12 h-12' />
        </DialogContent>
      </Dialog>
    </AuthContext.Provider>
  )
}
