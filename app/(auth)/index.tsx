import {Text, View} from '@/components/Themed'
import {ControlledInput} from '@/components/form/ControlledInput'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {loginSchema} from '@/utils/login/login.schema'
import {Button} from '@/components'
import {useAuthStore} from '@/stores/auth.store'
import {Redirect, useRouter} from 'expo-router'

export default function LoginScreen() {
  const login = useAuthStore(s => s.login)
  const router = useRouter()
  const user = useAuthStore(s => s.user)

  const {control, handleSubmit} = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const onSubmit = handleSubmit(async values => {
    const user = await login(values)
    if (!user) {
      return
    }
    router.push('/(tabs)/')
  })

  if (user) {
    return <Redirect href="/(tabs)/" />
  }

  return (
    <View className="p-4 bg-transparent">
      <View className="bg-transparent">
        <Text className="text-3xl font-semibold pb-2">
          Welcome in <Text className="text-blue-600">Cognitr</Text>
        </Text>
        <Text className="pb-6">Login to your account</Text>
      </View>
      <View className="w-full mb-4 bg-transparent">
        <Text className="font-semibold mb-2">Username:</Text>
        <ControlledInput
          id="username"
          control={control}
          name="username"
          placeholder="Input your username"
        />
      </View>
      <View className="w-full bg-transparent">
        <Text className="font-semibold mb-2">Password:</Text>
        <ControlledInput
          id="password"
          secureTextEntry
          control={control}
          name="password"
          placeholder="Input your password"
        />
      </View>
      <Button
        wrapperProps={{className: 'mt-4'}}
        title="Login"
        onPress={onSubmit}
      />
    </View>
  )
}
