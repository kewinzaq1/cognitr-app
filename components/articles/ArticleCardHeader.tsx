import {View, ViewProps} from 'react-native'

export function ArticleCardHeader({children, ...restProps}: ViewProps) {
  return (
    <View
      className="flex items-start justify-between flex-row bg-transparent"
      {...restProps}
    >
      {children}
    </View>
  )
}
