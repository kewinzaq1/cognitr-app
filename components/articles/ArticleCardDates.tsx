import {Text, View} from '@/components/Themed'
import {Ionicons} from '@expo/vector-icons'
import {Articles} from '@/types'

const formatArticleDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US')
}

type Props = Pick<
  Articles['data'][number]['attributes'],
  'createdAt' | 'updatedAt'
>

export function ArticleCardDates({createdAt, updatedAt}: Props) {
  return (
    <View className="bg-transparent">
      <Text className="text-xs">
        <Ionicons name="create" />
        {formatArticleDate(createdAt)}
      </Text>
      {formatArticleDate(createdAt) !== formatArticleDate(updatedAt) && (
        <Text className="text-xs">
          <Ionicons name="save" />
          {new Date(updatedAt).toLocaleString('en-US')}
        </Text>
      )}
    </View>
  )
}
