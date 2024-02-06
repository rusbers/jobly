import { Context } from '@/features/authentication/contexts/AuthProvider'
import { useContext } from 'react'

export function useAuth() {
  const auth = useContext(Context)

  if (auth === null) {
    throw new Error('useAuth must be used within a AuthProvider')
  }

  return auth
}
