import {ArticlesSchema} from './articles.schema'
import {safeFetch} from '../safeFetch'

type Params = {
  page: number
  pageSize?: number
  jwt: string
}

export function fetchArticles({jwt, page, pageSize}: Params) {
  const pageQueryParam = `pagination[page]=${page}`
  const pageSizeQueryParam = `pagination[pageSize]=${pageSize ?? 5}`
  const fetchURL = `/api/articles?${pageQueryParam}&${pageSizeQueryParam}`

  return safeFetch(
    fetchURL,
    {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    },
    {
      schema: ArticlesSchema,
    },
  )
}
