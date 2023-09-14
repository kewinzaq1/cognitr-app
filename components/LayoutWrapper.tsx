import {ReactNode} from 'react'
import {Platform, View} from 'react-native'

/**
 * A Component that limits the width of its children for better UX on the web.
 */
export function LayoutWrapper({children}: {children: ReactNode}) {
  if (Platform.OS === 'web') {
    return (
      <View className="flex-1 justify-center items-center w-full ">
        <View className="flex-1 w-full h-full max-w-xl">{children}</View>
      </View>
    )
  }

  return <>{children}</>
}
