import {create} from 'zustand'
import {ArticlesStore} from '@/types/ArticlesStore'
import {fetchArticles} from '@/utils/articles/fetchArticles'
import {useAuthStore} from './auth.store'
import Toast from 'react-native-root-toast'
import {Alert} from '@/utils/Alert'
import {ARTICLES_INIT_STATE} from '@/constants'

export const useArticlesStore = create<ArticlesStore>((set, get) => ({
  ...ARTICLES_INIT_STATE,
  async refresh() {
    const jwt = useAuthStore.getState().jwt
    if (!jwt) {
      return
    }

    set({error: null, isRefreshing: true})
    set({isRefreshing: true})

    const result = await fetchArticles({jwt, page: 1})
    if (result.error || !result.data) {
      set({error: result.error})
      Alert.alert('Cannot fetch articles!', result.error)
      set({isRefreshing: false})
      return
    }

    set({articles: [result.data]})

    Toast.show('Refreshed!', {
      backgroundColor: 'black',
      textColor: 'white',
      opacity: 1,
    })
    set({isRefreshing: false})
  },
  async getArticles() {
    set({error: null})
    const jwt = useAuthStore.getState().jwt

    if (!jwt) {
      return
    }

    const result = await fetchArticles({jwt, page: get().currentPage})
    if (result.error) {
      set({error: result.error})
      Alert.alert('Cannot fetch articles!', result.error)
      return
    }
    if (!result.data) {
      return
    }

    const currentArticles = get().articles
    const updatedArticles = currentArticles
      ? [...currentArticles, result.data]
      : [result.data]

    set({articles: updatedArticles})
  },
  async getNextPage() {
    const {currentPage, articles} = get()
    if (!articles) {
      return
    }
    const lastArticleData = articles[articles?.length - 1]
    const {pageCount} = lastArticleData.meta.pagination

    if (currentPage === pageCount) {
      return
    }

    set({currentPage: currentPage + 1})
    return this.getArticles()
  },
  reset() {
    set({...ARTICLES_INIT_STATE})
  },
}))
