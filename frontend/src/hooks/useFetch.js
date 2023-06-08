import { useState, useEffect } from 'react'

export default function useFetch(url) {
  const [response, setResponse] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(url)
        const data = await res.json()
        
        // Filter out data that don't have genres property
        const newData = data.filter(game => game.genres ? game : null)
        setResponse(newData)
      } catch (err) {
        setError(`${err} Could not fetch data`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { response, error, isLoading }
}