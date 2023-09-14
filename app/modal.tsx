import {Text, View} from '@/components/Themed'
import {Button} from '@/components/Button'
import {useArticlesStore, useAuthStore} from '@/stores'

export default function ModalScreen() {
  const logout = useAuthStore(c => c.logout)
  const user = useAuthStore(c => c.user)
  const resetArticle = useArticlesStore(s => s.reset)

  const handleLogout = async () => {
    logout()
    resetArticle()
  }

  return (
    <View className="p-4">
      <Text className="text-lg py-4">
        Your are logged as
        <Text className="font-semibold text-blue-600">
          {` ${user?.username}`}{' '}
          <Text className="text-white text-xs">({user?.email})</Text>
        </Text>
      </Text>
      <Button title="Logout" onPress={handleLogout} />
    </View>
  )
}
