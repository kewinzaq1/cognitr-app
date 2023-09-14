import {Text, TextProps} from '../Themed'

export function ArticleCardTitle({children, ...restProps}: TextProps) {
  return (
    <Text className="text-lg font-semibold  max-w-[75%]" {...restProps}>
      {children}
    </Text>
  )
}
