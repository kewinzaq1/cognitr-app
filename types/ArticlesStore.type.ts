import {fetchArticles} from '@/utils'
import {Articles} from './Articles.type'

type FetchArticlesResult = Promise<
  Awaited<ReturnType<typeof fetchArticles>> | undefined
>

export type ArticlesStore = {
  articles: Articles[] | null
  error: unknown | null
  isLoading: boolean
  isRefreshing: boolean
  currentPage: number
  refresh: () => Promise<void>
  getArticles: () => FetchArticlesResult
  getNextPage: () => FetchArticlesResult
  reset: () => void
}
