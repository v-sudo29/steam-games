import { useState, useEffect } from 'react'
import { GameObject } from '../interface/GameObject'

export default function useFetch(url: string, fetchType: string = '') {
  const [response, setResponse] = useState<GameObject[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(url)
        const data: GameObject[] = await res.json()

        setResponse(data)
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