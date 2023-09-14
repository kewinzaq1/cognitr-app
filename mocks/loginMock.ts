import {rest} from 'msw'
import {env} from '@/utils'

export const LOGIN_DATA = {
  user: {
    id: 1,
    username: 'Wojtek',
    email: 'wojtek@op.pl',
    provider: 'email',
    confirmed: true,
    blocked: false,
    createdAt: '',
    updatedAt: '',
  },
  jwt: 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTY5NDYxMjQwOSwiaWF0IjoxNjk0NjEyNDA5fQ.WSk3BfMCzxpjIelG8Bfqp8XD1DLeBmwF-9DtjlZxXQ4',
}

export const loginMock = rest.post(
  env.EXPO_PUBLIC_BASE_URL + '/api/auth/local',
  (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(LOGIN_DATA))
  },
)
