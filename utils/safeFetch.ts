import {Alert} from 'react-native'
import {env} from './envs'
import {StrapiErrorSchema} from './StrapiError.schema'
import {ZodRawShape, z} from 'zod'
import {router} from 'expo-router'
import {useAuthStore} from '@/stores'
import {AUTH_INIT_STATE} from '@/constants'

type SafeFetchOptions<T extends ZodRawShape> = {
  schema: z.ZodObject<T>
  baseUrl?: string
}

export async function safeFetch<T extends ZodRawShape>(
  url: string,
  init: RequestInit | undefined,
  options: SafeFetchOptions<T>,
) {
  const baseUrl = options.baseUrl ?? env.EXPO_PUBLIC_BASE_URL

  const response = await fetch(`${baseUrl}${url}`, init)
  if (!response.ok) {
    const result = await response.json()
    const parsed = StrapiErrorSchema.safeParse(result)
    if (!parsed.success) {
      return {
        error: 'Received unknown error! Please try again!', // or parsed.error.message, but i just think that current option is more user friendly
        data: null,
      }
    }

    if (parsed.data.error.status === 401) {
      Alert.alert(parsed.data.error.message)
      useAuthStore.setState({...AUTH_INIT_STATE})
      router.push('/(tabs)/')
    }

    return {
      error: parsed.data.error.message,
      data: null,
    }
  }

  const data = await response.json()

  const parsed = options.schema.safeParse(data)
  if (!parsed.success) {
    return {
      error: 'Received unknown data! Please try again!', // or parsed.error.message, but i just think that current option is more user friendly
      data: null,
    }
  }

  return {
    error: null,
    data: parsed.data,
  }
}
