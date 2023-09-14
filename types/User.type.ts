import {z} from 'zod'
import {UserSchema} from '@/utils/user/user.schema'

export type User = z.infer<typeof UserSchema>
