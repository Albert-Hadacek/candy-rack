import { useState, useEffect } from 'react'

export interface Data {
  offers: {
    currency: string
    offers: Offer[]
  }
}

export interface Offer {
  title: string
  short_description: string
  original_price: number
  discounted_price: number | null
  image: string
  id: string
  variants: null | string[]
}

const useFetchData = <D,>(url: string) => {
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<D | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const res = await fetch(url)
        const resJSON: D = await res.json()
        setData(resJSON)
      } catch (e) {
        setError('Something went wrong')
      }
      setIsLoading(false)
    }

    fetchData()
  }, [url])

  return { data, error, isLoading }
}

export default useFetchData
