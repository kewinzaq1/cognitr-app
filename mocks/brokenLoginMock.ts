import {rest} from 'msw'
import {env} from '@/utils'

export const brokenLoginMock = rest.post(
  env.EXPO_PUBLIC_BASE_URL + '/api/auth/local',
  (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 123,
        name: 'Andrzej',
        lastName: 'Kowalski',
        age: 24,
      }),
    )
  },
)
