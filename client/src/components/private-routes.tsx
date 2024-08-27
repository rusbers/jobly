import { useAuthContext } from "@/features/auth"
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { LoadingSpinner } from "./ui/LoadingSpinner"

export function PrivateRoutes() {
  const { isLoggedIn, isLoadingUser } = useAuthContext()
  const location = useLocation()

  if (isLoadingUser) return <LoadingSpinner className='size-24' />

  if (!isLoggedIn) return <Navigate to='/auth/login' replace state={{ location }} />

  return <Outlet />
}
