import { useState, useEffect } from 'react'
import { GameObject } from '../interface/GameObject'

export default function useFetch(url: string) {
  const [response, setResponse] = useState<GameObject[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(url)
        const data: GameObject[] = await res.json()

        // Filter out data that don't have genres property
        if (data.length > 10) {
          const newData: GameObject[] = data.filter(game => game.genres && game.genres.length > 0 ? game : null)
          setResponse(newData)
        } else setResponse(data)

      } 
      catch (err) {
        setError(`${err} Could not fetch data`)
      } 
      finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { response: response, error: error, isLoading: isLoading }
}