import {z} from 'zod'
import {LoginResultSchema} from '@/utils/login/loginResult.schema'

export type LoginResult = z.infer<typeof LoginResultSchema>
