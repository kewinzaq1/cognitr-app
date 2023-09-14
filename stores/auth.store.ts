import {AuthStore, LoginParams} from '@/types'
import {getItemAsync, setItemAsync, deleteItemAsync} from 'expo-secure-store'
import {create} from 'zustand'
import {createJSONStorage, persist} from 'zustand/middleware'
import {Platform} from 'react-native'
import {router} from 'expo-router'
import {login} from '@/utils/login/login'
import {AUTH_INIT_STATE} from '@/constants'
import {Alert} from '@/utils'

export const useAuthStore = create(
  persist<AuthStore>(
    set => ({
      ...AUTH_INIT_STATE,
      login: async ({username, password}: LoginParams) => {
        set({isLoading: true})

        const {error, data} = await login({username, password})
        set({isLoading: false})

        if (error) {
          set({error: error.message})
          Alert.alert('Authentication error', error.message)
          return
        }

        if (!data) {
          return
        }

        set({...data})
        return data
      },
      logout() {
        set({...AUTH_INIT_STATE})
        router.push('/(tabs)/')
      },
    }),
    {
      name: 'auth',
      storage: createJSONStorage(() => {
        if (Platform.OS === 'web') {
          return sessionStorage
        }
        return {
          setItem: setItemAsync,
          getItem: getItemAsync,
          removeItem: deleteItemAsync,
        }
      }),
    },
  ),
)
