import {View, ViewProps, useColorScheme} from 'react-native'

export function ArticleCard({children, ...restProps}: ViewProps) {
  const colorScheme = useColorScheme()

  return (
    <View
      className={`${
        colorScheme === 'dark' ? 'bg-slate-900' : 'bg-slate-100'
      } gap-1 w-full mb-4 p-4 shadow-md `}
      {...restProps}
    >
      {children}
    </View>
  )
}
