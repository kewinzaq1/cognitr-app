import * as React from 'react'
import {Link, Redirect, Tabs} from 'expo-router'
import {Pressable, useColorScheme} from 'react-native'

import Colors from '@/constants/Colors'
import {useAuthStore} from '@/stores/auth.store'
import {Ionicons} from '@expo/vector-icons'
import {TabBarIcon} from '@/components'

export default function TabLayout() {
  const colorScheme = useColorScheme()
  const user = useAuthStore(s => s.user)

  if (!user) {
    return <Redirect href="/(auth)/" />
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Articles',
          tabBarIcon: ({color}) => <TabBarIcon name="feed" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({pressed}) => (
                  <Ionicons
                    name="settings"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{marginRight: 15, opacity: pressed ? 0.5 : 1}}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
    </Tabs>
  )
}
