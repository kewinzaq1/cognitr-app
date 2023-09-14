import {ReactNode} from 'react'
import {View, Pressable, Text, ViewProps, PressableProps} from 'react-native'

type CustomButtonProps =
  | {
      children: ReactNode
    }
  | {title: string}

export type ButtonProps = CustomButtonProps & {
  wrapperProps?: ViewProps
} & Omit<PressableProps, 'children'>

export function Button({wrapperProps, ...props}: ButtonProps) {
  return (
    <View className="bg-transparent overflow-hidden" {...wrapperProps}>
      <Pressable
        className="bg-blue-600 text-slate-400 px-6 py-4 rounded-sm active:bg-blue-800 active:scale-[.99] transition"
        android_ripple={{color: ' rgb(96 165 250)'}}
        {...props}
      >
        {'title' in props ? (
          <Text
            className="font-semibold w-full text-white text-center"
            role="button"
          >
            {props.title}
          </Text>
        ) : null}
        {'children' in props ? props.children : null}
      </Pressable>
    </View>
  )
}
