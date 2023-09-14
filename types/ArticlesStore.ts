import {Articles} from './Articles.type'

export type ArticlesStore = {
  articles: Articles[] | null
  error: unknown | null
  isRefreshing: boolean
  currentPage: number
  refresh: () => Promise<void>
  getArticles: () => Promise<void>
  getNextPage: () => Promise<void>
  reset: () => void
}
