import {z} from 'zod'
import {ArticlesSchema} from '@/utils/articles/articles.schema'

export type Articles = z.infer<typeof ArticlesSchema>
