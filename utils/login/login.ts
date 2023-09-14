import {LoginParams} from '@/types'
import {LoginResultSchema} from './loginResult.schema'
import {safeFetch} from '../safeFetch'

export function login({username, password}: LoginParams) {
  const loginUrl = '/api/auth/local'

  return safeFetch(
    loginUrl,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        identifier: username,
        password: password,
      }),
    },
    {schema: LoginResultSchema},
  )
}
