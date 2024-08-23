import { useEffect, useState } from "react"
import { ERROR_DURATION } from "../constants/constants"

export function useIsAuthError() {
  const [isAuthError, setIsAuthError] = useState(false)

  useEffect(() => {
    if (isAuthError) {
      const timeoutId = setTimeout(() => {
        setIsAuthError(false)
      }, ERROR_DURATION)

      return () => clearTimeout(timeoutId)
    }
  }, [isAuthError])

  return [isAuthError, setIsAuthError] as const
}
