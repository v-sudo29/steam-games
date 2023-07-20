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
        if (data.length > 10) {
          const newData = data.filter(game => game.genres.length > 0 ? game : null)
          setResponse(newData)
        } else setResponse(data)

      } catch (err) {
        setError(`${err} Could not fetch data`)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { response: response, error: error, isLoading: isLoading }
}