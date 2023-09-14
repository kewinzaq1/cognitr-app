import LoginScreen from '@/app/(auth)/index'
import TabScreen from '@/app/(tabs)/index'

import {renderRouter} from 'expo-router/testing-library'
import Tabs from '@/app/(tabs)/_layout'
import Auth from '@/app/(auth)/_layout'

export function renderApp() {
  renderRouter({
    '(auth)/_layout': Auth,
    '(auth)/index': LoginScreen,
    '(tabs)/_layout': Tabs,
    '(tabs)/index/': TabScreen,
  })
}
