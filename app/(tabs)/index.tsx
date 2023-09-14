import * as React from 'react'
import {ActivityIndicator, FlatList} from 'react-native'
import {View, Text} from '@/components/Themed'
import {useArticlesStore} from '@/stores/articles.store'
import {
  ArticleCard,
  ArticleCardHeader,
  ArticleCardTitle,
  ArticleCardDates,
} from '@/components/articles'
import {useAuthStore} from '@/stores'
import {router} from 'expo-router'
import {AUTH_INIT_STATE} from '@/constants'

export default function TabOneScreen() {
  const articles = useArticlesStore(s => s.articles)
  const refresh = useArticlesStore(s => s.refresh)
  const getArticles = useArticlesStore(s => s.getArticles)
  const getNextPage = useArticlesStore(s => s.getNextPage)
  const isRefreshing = useArticlesStore(s => s.isRefreshing)
  const isLoading = useArticlesStore(s => s.isLoading)

  const displayingArticles = React.useMemo(() => {
    return articles?.map(item => item.data).flat()
  }, [articles])

  React.useEffect(() => {
    if (articles) {
      return
    }
    getArticles().then(result => {
      if (!result?.error) {
        return
      }
      if ('status' in result.error) {
        useAuthStore.setState({...AUTH_INIT_STATE})
        router.push('/(tabs)/')
      }
    })
  }, [articles, getArticles])

  return (
    <View className="flex-col p-4 flex-1 h-screen w-full">
      {displayingArticles && (
        <FlatList
          onRefresh={refresh}
          refreshing={isRefreshing}
          onEndReached={getNextPage}
          onEndReachedThreshold={0.2}
          className="w-full h-full"
          data={displayingArticles}
          keyExtractor={item => item.id.toString()}
          renderItem={({
            item: {
              attributes: {title, createdAt, description, updatedAt},
            },
          }) => (
            <ArticleCard>
              <ArticleCardHeader>
                <ArticleCardTitle>{title}</ArticleCardTitle>
                <ArticleCardDates createdAt={createdAt} updatedAt={updatedAt} />
              </ArticleCardHeader>
              <Text>{description}</Text>
            </ArticleCard>
          )}
        />
      )}
      {isLoading && <ActivityIndicator />}
    </View>
  )
}
