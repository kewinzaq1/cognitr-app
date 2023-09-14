import * as React from 'react'
import {FlatList} from 'react-native'
import {View, Text} from '@/components/Themed'
import {useArticlesStore} from '@/stores/articles.store'
import {
  ArticleCard,
  ArticleCardHeader,
  ArticleCardTitle,
  ArticleCardDates,
} from '@/components/articles'

export default function TabOneScreen() {
  const articles = useArticlesStore(s => s.articles)
  const refresh = useArticlesStore(s => s.refresh)
  const getArticles = useArticlesStore(s => s.getArticles)
  const getNextPage = useArticlesStore(s => s.getNextPage)
  const isRefreshing = useArticlesStore(s => s.isRefreshing)

  const displayingArticles = React.useMemo(() => {
    return articles?.map(item => item.data).flat()
  }, [articles])

  React.useEffect(() => {
    if (articles) {
      return
    }
    getArticles()
  }, [articles, getArticles])

  return (
    <View className="flex-col p-4 flex-1 h-screen w-full">
      {displayingArticles && (
        <FlatList
          onRefresh={refresh}
          refreshing={isRefreshing}
          onEndReached={getNextPage}
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
    </View>
  )
}
