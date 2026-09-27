import { ApiData } from '@/shared/config'
const {API_URL , USER_ID} = ApiData

export default async function getRawDiscordData<T>() {
  const url = `${API_URL}/users/${USER_ID}`
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error('Failed to fetch data')
  }

  return response.json() as T
}