import { useState } from 'react'

export function useCustomErrorHandler() {
  const [error, setError] = useState(null)
  const handleError = (error) => {
    setError(error)
    const interval = setInterval(() => {
      setError(null)
      clearInterval(interval)
    }, 2000)
  }
  return [error, handleError]
}
