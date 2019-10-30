import { useState } from 'react'

export function useCustomErrorHandler() {
  const [error, setError] = useState(null)
  const handleError = (error) => {
    setError(error)
    const t = setTimeout(() => {
      setError(null)
      clearTimeout(t)
    }, 2000)
  }
  return [error, handleError]
}
