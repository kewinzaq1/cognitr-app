import {Tabs} from 'expo-router'
import {useColorScheme} from 'react-native'

import Colors from '@/constants/Colors'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
      tabBar={() => null}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Login',
        }}
      />
    </Tabs>
  )
}
