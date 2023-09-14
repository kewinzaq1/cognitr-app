import {z} from 'zod'

const AttributesSchema = z.object({
  title: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
})

const DataSchema = z.object({
  id: z.number(),
  attributes: AttributesSchema,
})

const PaginationSchema = z.object({
  page: z.number(),
  pageSize: z.number(),
  pageCount: z.number(),
  total: z.number(),
})

const MetaSchema = z.object({
  pagination: PaginationSchema,
})

export const ArticlesSchema = z.object({
  data: z.array(DataSchema),
  meta: MetaSchema,
})
