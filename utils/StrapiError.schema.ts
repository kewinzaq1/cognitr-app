import {z} from 'zod'

const StrapiErrorDetails = z.object({
  status: z.number(),
  name: z.string(),
  message: z.string(),
})

export const StrapiErrorSchema = z.object({
  error: StrapiErrorDetails,
})
