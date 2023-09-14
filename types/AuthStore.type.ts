import {LoginParams} from './LoginParams.type'
import {LoginResult} from './LoginResult.type'
import {User} from './User.type'

export type AuthStore = {
  user: User | null
  login: (params: LoginParams) => Promise<LoginResult | undefined>
  error: string | null
  jwt: string | null
  logout: () => void
  isLoading: boolean
}
