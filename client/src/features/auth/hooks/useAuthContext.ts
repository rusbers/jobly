import { useContext } from "react"
import { AuthContext } from "../context/AuthContextProvider"

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if (!context) throw new Error("AuthContext must be called from within the AuthContextProvider")

  return context
}
