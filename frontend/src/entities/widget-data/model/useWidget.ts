'use client'

import { useEffect, useState  } from 'react'
import { ApiData } from '@/shared/config'
import getRawDiscordData from '../api/getRawDiscordData'

export const useWidget = ( ) => {
  const [user, setUser] = useState<Record<string, any> | null>(null)
  const [status, setStatus] = useState<string>('offline')


  const { API_URL } = ApiData
  

  useEffect(() => {
    let isMounted = true

    const fetchUser : () => Promise<void> = async () => {
      try {
        const data = await getRawDiscordData() as {
          status?: string
          avatar?: string
          globalName?: string
          username?: string
        }

        if (!isMounted) return

        setUser(data)
        setStatus(data?.status || 'offline')
      } catch (error) {
        console.error(
          'Failed to fetch discord user:',
          error
        )

        if (isMounted) {
          setStatus('offline')
        }
      }
    }

    fetchUser()

    const interval = setInterval(fetchUser, 10000)

    return () => {
      isMounted = false
      clearInterval(interval)
    }
  }, [API_URL])

  return {
    user , 
    status
  }
}