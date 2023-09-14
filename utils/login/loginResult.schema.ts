import {z} from 'zod'
import {UserSchema} from '../user/user.schema'

export const LoginResultSchema = z.object({
  user: UserSchema,
  jwt: z.string(),
})
