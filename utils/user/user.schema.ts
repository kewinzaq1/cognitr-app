import {z} from 'zod'

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  email: z.string(),
  provider: z.string(),
  confirmed: z.boolean(),
  blocked: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})
