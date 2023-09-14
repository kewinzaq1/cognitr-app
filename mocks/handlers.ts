import {env} from '@/utils'
import {rest} from 'msw'

export const handlers = [
  rest.post(env.EXPO_PUBLIC_BASE_URL + '/api/auth/local', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        id: 1,
        username: 'Wojtek',
        email: 'wojtek@op.pl',
        provider: 'email',
        confirmed: true,
        blocked: false,
        createdAt: '',
        updatedAt: '',
      }),
    )
  }),
]
