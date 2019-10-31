import { useState } from 'react'

let errorTimerId

export function useCustomErrorHandler() {
  const [error, setError] = useState(null)
  const handleError = (error) => {
    setError(error)
    // console.log('errorTimerId', errorTimerId)
    if (errorTimerId) {
      clearTimeout(errorTimerId)
    }
    errorTimerId = setTimeout(() => {
      setError(null)
    }, 2000)
  }
  return [error, handleError]
}
