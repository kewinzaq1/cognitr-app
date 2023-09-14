import {StrapiErrorSchema} from '@/utils/StrapiError.schema'
import {z} from 'zod'

export type StrapiError = z.infer<typeof StrapiErrorSchema>
